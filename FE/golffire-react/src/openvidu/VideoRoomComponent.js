import axios from 'axios';
import { OpenVidu } from 'openvidu-browser';
import { Splide, SplideSlide } from "@splidejs/react-splide";
import React, { Component } from 'react';
import DialogExtensionComponent from './dialog-extension/DialogExtension';
import StreamComponent from './stream/StreamComponent';
import OpenViduLayout from './layout/openvidu-layout';
import UserModel from './models/user-model';
import ToolbarComponent from './toolbar/ToolbarComponent';

import { ImShare2, ImExit } from "react-icons/im";
import "@splidejs/react-splide/css";
import './VideoRoomComponent.css';
import ChatComponent from './chat/ChatComponent';
// import Button from "@mui/material/Button";
// import Skeleton from "@mui/material/Skeleton";

// 유저 생성
var localUser = new UserModel();

// 애플리케이션 서버 URL
const APPLICATION_SERVER_URL = process.env.REACT_APP_SERVER_URL;

// 기타 함수
const CopyUrl = () => {
	const url = window.location.href;
	navigator.clipboard.writeText(url).then(() => {
		alert("URL이 복사되었습니다")
	});
};

class VideoRoomComponent extends Component {
	constructor(props) {
		console.log("1. VideoRoomComponent");
		console.log("props:", props);

		super(props);

		this.remotes = [];
		this.hasBeenUpdated = false;
		this.layout = new OpenViduLayout();
		this.localUserAccessAllowed = false;

		let sessionName = 'session' + this.props.study.id;
		let userName = this.props.studyUser.memberNickname;

		this.state = {
			mySessionId: sessionName,
			myUserName: userName,
			session: undefined,
			localUser: undefined,
			mainStreamManager: undefined,
			subscribers: [],
			entered: false,
			currentVideoDevice: undefined,
			chatDisplay: 'block',
			selectedSlideIndex: -1
		};

		this.joinSession = this.joinSession.bind(this);
		this.leaveSession = this.leaveSession.bind(this);
		this.onbeforeunload = this.onbeforeunload.bind(this);
		this.updateLayout = this.updateLayout.bind(this);
		this.camStatusChanged = this.camStatusChanged.bind(this);
		this.micStatusChanged = this.micStatusChanged.bind(this);
		this.nicknameChanged = this.nicknameChanged.bind(this);
		this.toggleFullscreen = this.toggleFullscreen.bind(this);
		this.switchCamera = this.switchCamera.bind(this);
		this.screenShare = this.screenShare.bind(this);
		this.stopScreenShare = this.stopScreenShare.bind(this);
		this.closeDialogExtension = this.closeDialogExtension.bind(this);
		this.toggleChat = this.toggleChat.bind(this);
		this.checkNotification = this.checkNotification.bind(this);
		this.checkSize = this.checkSize.bind(this);
		this.enteredChanged = this.enteredChanged.bind(this);
	}

	
	componentDidMount() {
		const openViduLayoutOptions = {
			maxRatio: 3 / 2, // The narrowest ratio that will be used (default 2x3)
			minRatio: 9 / 16, // The widest ratio that will be used (default 16x9)
			fixedRatio: false, // If this is true then the aspect ratio of the video is maintained and minRatio and maxRatio are ignored (default false)
			bigClass: 'OV_big', // The class to add to elements that should be sized bigger
			bigPercentage: 0.8, // The maximum percentage of space the big ones should take up
			bigFixedRatio: false, // fixedRatio for the big ones
			bigMaxRatio: 3 / 2, // The narrowest ratio to use for the big elements (default 2x3)
			bigMinRatio: 9 / 16, // The widest ratio to use for the big elements (default 16x9)
			bigFirst: true, // Whether to place the big one in the top left (true) or bottom right
			animate: true, // Whether you want to animate the transitions
		};

		this.layout.initLayoutContainer(
			document.getElementById('layout'), 
			openViduLayoutOptions
		);
		
		window.addEventListener('beforeunload', this.onbeforeunload);
		window.addEventListener('resize', this.updateLayout);
		window.addEventListener('resize', this.checkSize);
		this.joinSession();
	}

	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.onbeforeunload);
		window.removeEventListener('resize', this.updateLayout);
		window.removeEventListener('resize', this.checkSize);
		this.leaveSession();
	}

	onbeforeunload(event) {
		this.leaveSession();
	}

	joinSession() {
		console.log("2. Join");
		this.OV = new OpenVidu();

		this.setState(
			{
				session: this.OV.initSession(),
			},
			async () => {
				this.subscribeToStreamCreated();
				await this.connectToSession();
			},
		);
	}

	async connectToSession() {
		if (this.props.token !== undefined) {
			console.log('3-1. 받은 토큰: ', this.props.token);
			this.connect(this.props.token);
		} else {
			try {
				console.log("3-2. 토큰 받기 시도");
				var token = await this.getToken();

				this.connect(token);
			} catch (error) {
				console.error(
					'There was an error getting the token:', 
					error.code, 
					error.message
				);
				if(this.props.error){
					this.props.error({ 
						error: error.error, 
						message: error.message, // 여기서 오류나면 메세지가 아니라 메스개 
						code: error.code, 
						status: error.status 
					});
				}
				alert('There was an error getting the token:', error.message);
			}
		}
	}

	connect(token) {
		this.state.session
			.connect(token,	{ clientData: this.state.myUserName })
			.then(() => {
				this.connectWebCam();
			})
			.catch((error) => {
				if(this.props.error){
					this.props.error({ 
						error: error.error, 
						messgae: error.message, 
						code: error.code, 
						status: error.status 
					});
				}
				alert('There was an error connecting to the session:', error.message);
				console.log(
					'There was an error connecting to the session:', 
					error.code, 
					error.message
				);
			});
	}

	async connectWebCam() {
		await this.OV.getUserMedia({ 
			audioSource: undefined, 
			videoSource: undefined 
		});
		var devices = await this.OV.getDevices();
		var videoDevices = devices.filter(device => device.kind === 'videoinput');

		let publisher = this.OV.initPublisher(undefined, {
			audioSource: undefined,
			videoSource: videoDevices[0].deviceId,
			publishAudio: localUser.isAudioActive(),
			publishVideo: localUser.isVideoActive(),
			resolution: '640x480',
			frameRate: 30,
			insertMode: 'APPEND',
		});

		if (this.state.session.capabilities.publish) {
			publisher.on('4. 접근 허용' , () => {
				this.state.session.publish(publisher).then(() => {
					this.updateSubscribers();
					this.localUserAccessAllowed = true;
					if (this.props.joinSession) {
						this.props.joinSession();
					}
				});
			});
		}

		localUser.setNickname(this.state.myUserName);
		localUser.setConnectionId(this.state.session.connection.connectionId);
		localUser.setScreenShareActive(false);
		localUser.setStreamManager(publisher);
		this.subscribeToUserChanged();
		this.subscribeToStreamDestroyed();
		this.sendSignalUserChanged({ 
			isScreenShareActive: localUser.isScreenShareActive(), 
		});

		this.setState(
			{ currentVideoDevice: videoDevices[0], localUser: localUser }, 
			() => {
				this.state.localUser.getStreamManager().on('streamPlaying', (e) => {
					this.updateLayout();
					publisher.videos[0].video.parentElement.classList.remove(
						'custom-class'
					);
				});
			}
		);
	}

	updateSubscribers() {
		var subscribers = this.remotes;
		this.setState(
			{
				subscribers: subscribers,
			},
			() => {
				if (this.state.localUser) {
					this.sendSignalUserChanged({
						isAudioActive: this.state.localUser.isAudioActive(),
						isVideoActive: this.state.localUser.isVideoActive(),
						nickname: this.state.localUser.getNickname(),
						isScreenShareActive: this.state.localUser.isScreenShareActive(),
					});
				}
				this.updateLayout();
			},
		);
	}

	leaveSession() {
		console.log("5. leave Session 시도");
		const mySession = this.state.session;

		if (mySession) {
			mySession.disconnect();
		}

		// Empty all properties...
		this.OV = null;
		this.setState({
			session: undefined,
			subscribers: [],
			mySessionId: undefined, 
			myUserName: undefined,
			localUser: undefined,
		});
		if (this.props.leaveSession) {
			this.props.leaveSession();
		}
	}

	camStatusChanged() {
		localUser.setVideoActive(!localUser.isVideoActive());
		localUser.getStreamManager().publishVideo(localUser.isVideoActive());
		this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
		this.setState({ localUser: localUser });
	}

	micStatusChanged() {
		localUser.setAudioActive(!localUser.isAudioActive());
		localUser.getStreamManager().publishAudio(localUser.isAudioActive());
		this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
		this.setState({ localUser: localUser });
	}

	nicknameChanged(nickname) {
		let localUser = this.state.localUser;
		localUser.setNickname(nickname);
		this.setState({ localUser: localUser });
		this.sendSignalUserChanged({ 
			nickname: this.state.localUser.getNickname(), 
		});
	}

	deleteSubscriber(stream) {
		const remoteUsers = this.state.subscribers;
		const userStream = remoteUsers.filter(
			(user) => user.getStreamManager().stream === stream
		)[0];
		let index = remoteUsers.indexOf(userStream, 0);
		if (index > -1) {
			remoteUsers.splice(index, 1);
			this.setState({
				subscribers: remoteUsers,
			});
		}
	}

	subscribeToStreamCreated() {
		this.state.session.on('streamCreated', (event) => {
			const subscriber = this.state.session.subscribe(event.stream, undefined);
			// var subscribers = this.state.subscribers;
			subscriber.on('streamPlaying', (e) => {
				this.checkSomeoneShareScreen();
				subscriber.videos[0].video.parentElement.classList.remove('custom-class');
			});

			const newUser = new UserModel();
			newUser.setStreamManager(subscriber);
			newUser.setConnectionId(event.stream.connection.connectionId);
			newUser.setType('remote');

			const nickname = event.stream.connection.data.split('%')[0];
			newUser.setNickname(JSON.parse(nickname).clientData);
			this.remotes.push(newUser);
			if(this.localUserAccessAllowed) {
				this.updateSubscribers();
			}
		});
	}

	subscribeToStreamDestroyed() {
		// On every Stream destroyed...
		this.state.session.on('streamDestroyed', (event) => {
			// Remove the stream from 'subscribers' array
			this.deleteSubscriber(event.stream);
			setTimeout(() => {
				this.checkSomeoneShareScreen();
			}, 20);
			event.preventDefault();
			this.updateLayout();
		});
	}

	subscribeToUserChanged() {
		this.state.session.on('signal:userChanged', (event) => {
			let remoteUsers = this.state.subscribers;

			remoteUsers.forEach((user) => {
				if (user.getConnectionId() === event.from.connectionId) {
					const data = JSON.parse(event.data);
					console.log('6. 이벤트 REMOTE: ', event.data);

					if (data.isAudioActive !== undefined) {
						user.setAudioActive(data.isAudioActive);
					}
					if (data.isVideoActive !== undefined) {
						user.setVideoActive(data.isVideoActive);
					}
					if (data.nickname !== undefined) {
						user.setNickname(data.nickname);
					}
					if (data.isScreenShareActive !== undefined) {
						user.setScreenShareActive(data.isScreenShareActive);
					}
				}
			});
			this.setState(
				{
					subscribers: remoteUsers,
				},
				() => this.checkSomeoneShareScreen(),
			);
		});
	}

	// updateLayout() {
	// 	setTimeout(() => {
	// 		this.layout.updateLayout();
	// 	}, 20);
	// }

	updateLayout() {
    	console.log('7. timeout 실행 전:', this.layout); // 확인용 로그

    	setTimeout(() => {
        	console.log('7-1. timeout 내부:', this.layout); // 확인용 로그

			if (this.layout === null) {
				console.error('this.layout is null inside setTimeout. Cannot call updateLayout().');
				return;
			}

			try {
				this.layout.updateLayout();
			} catch (error) {
				console.error('An error occurred inside setTimeout:', error);
			}

       		console.log('7-2. timeout 실행 후:', this.layout); // 확인용 로그
    	}, 20);
	}

	sendSignalUserChanged(data) {
		const signalOptions = {
			data: JSON.stringify(data),
			type: 'userChanged',
		};

		this.state.session.signal(signalOptions);
	}

	toggleFullscreen() {
		const document = window.document;
		const fs = document.getElementById('container');
		if (
			!document.fullscreenElement &&
			!document.mozFullScreenElement &&
			!document.webkitFullscreenElement &&
			!document.msFullscreenElement
		) {
			if (fs.requestFullscreen) {
				fs.requestFullscreen();
			} else if (fs.msRequestFullscreen) {
				fs.msRequestFullscreen();
			} else if (fs.mozRequestFullScreen) {
				fs.mozRequestFullScreen();
			} else if (fs.webkitRequestFullscreen) {
				fs.webkitRequestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			} else if (document.msExitFullscreen) {
				document.msExitFullscreen();
			} else if (document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
			} else if (document.webkitExitFullscreen) {
				document.webkitExitFullscreen();
			}
		}
	}

	async switchCamera() {
		try{
			const devices = await this.OV.getDevices()
			var videoDevices = devices.filter(
				device => device.kind === 'videoinput'
			);

			if(videoDevices && videoDevices.length > 1) {
				var newVideoDevice = videoDevices.filter(
					device => device.deviceId !== this.state.currentVideoDevice.deviceId
				);

				if (newVideoDevice.length > 0) {
					// Creating a new publisher with specific videoSource
					// In mobile devices the default and first camera is the front one
					var newPublisher = this.OV.initPublisher(undefined, {
						audioSource: undefined,
						videoSource: newVideoDevice[0].deviceId,
						publishAudio: localUser.isAudioActive(),
						publishVideo: localUser.isVideoActive(),
						mirror: true
					});

					//newPublisher.once("accessAllowed", () => {
					await this.state.session.unpublish(this.state.localUser.getStreamManager());
					await this.state.session.publish(newPublisher)
					this.state.localUser.setStreamManager(newPublisher);
					this.setState({
						currentVideoDevice: newVideoDevice,
						localUser: localUser,
					});
				}
			}
		} catch (e) {
			console.error(e);
		}
	}

	screenShare() {
		const videoSource = 
			navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';
		const publisher = this.OV.initPublisher(
			undefined,
			{
				videoSource: videoSource,
				publishAudio: localUser.isAudioActive(),
				publishVideo: localUser.isVideoActive(),
				mirror: false,
			},
			(error) => {
				if (error && error.name === 'SCREEN_EXTENSION_NOT_INSTALLED') {
					this.setState({ showExtensionDialog: true });
				} else if (error && error.name === 'SCREEN_SHARING_NOT_SUPPORTED') {
					alert('Your browser does not support screen sharing');
				} else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
					alert('You need to enable screen sharing extension');
				} else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
					alert('You need to choose a window or application to share');
				}
			},
		);

		publisher.once('accessAllowed', () => {
			this.state.session.unpublish(localUser.getStreamManager());
			localUser.setStreamManager(publisher);
			this.state.session.publish(localUser.getStreamManager()).then(() => {
				localUser.setScreenShareActive(true);
				this.setState({ localUser: localUser }, () => {
					this.sendSignalUserChanged({ 
						isScreenShareActive: localUser.isScreenShareActive(), 
					});
				});
			});
		});
		publisher.on('streamPlaying', () => {
			this.updateLayout();
			publisher.videos[0].video.parentElement.classList.remove('custom-class');
		});
	}

	closeDialogExtension() {
		this.setState({ showExtensionDialog: false });
	}

	stopScreenShare() {
		this.state.session.unpublish(localUser.getStreamManager());
		this.connectWebCam();
	}

	checkSomeoneShareScreen() {
		let isScreenShared;
		// return true if at least one passes the test
		isScreenShared = 
			this.state.subscribers.some((user) => user.isScreenShareActive()) || 
			localUser.isScreenShareActive();
		const openviduLayoutOptions = {
			maxRatio: 3 / 2,
			minRatio: 9 / 16,
			fixedRatio: isScreenShared,
			bigClass: 'OV_big',
			bigPercentage: 0.8,
			bigFixedRatio: false,
			bigMaxRatio: 3 / 2,
			bigMinRatio: 9 / 16,
			bigFirst: true,
			animate: true,
		};
		this.layout.setLayoutOptions(openviduLayoutOptions);
		this.updateLayout();
	}

	toggleChat(property) {
		let display = property;

		if (display === undefined) {
			display = this.state.chatDisplay === 'none' ? 'block' : 'none';
		}
		if (display === 'block') {
			this.setState({ chatDisplay: display, messageReceived: false });
		} else {
			console.log('chat', display);
			this.setState({ chatDisplay: display });
		}
		// this.updateLayout();
	}

	checkNotification(event) {
		this.setState({
			messageReceived: this.state.chatDisplay === 'none',
		});
	}
	// checkSize() {
	// 	if (document.getElementById('layout').offsetWidth <= 700 && !this.hasBeenUpdated) {
	// 		this.toggleChat('none');
	// 		this.hasBeenUpdated = true;
	// 	}
	// 	if (document.getElementById('layout').offsetWidth > 700 && this.hasBeenUpdated) {
	// 		this.hasBeenUpdated = false;
	// 	}
	// }
	async enteredChanged() {
		console.log("9. 스터디룸 입장");
		console.log(this.props);

		this.remotes = [];

		let sessionName = 'session' + this.props.study.id;
		let userName = this.props.studyUser.memberNickname;

		this.setState({
			mySessionId: sessionName,
			myUserName: userName,
			subscribers: [],
			entered: true,
		});
		
		await this.leaveSession();
		await this.joinSession();
  }

	handleSlideClick = (index) => {
		if (this.state.selectedSlideIndex === index) {
      this.setState({ selectedSlideIndex: -1 }); // 이미 선택된 슬라이드를 다시 클릭하면 선택 취소
    } else {
      this.setState({ selectedSlideIndex: index });
    }
	};

	render() {
		const mySessionId = this.state.mySessionId;
		const localUser = this.state.localUser;
		const isEntered = this.state.entered;
		const { type, study, studyUser, leaveRoom } = this.props;
		var chatDisplay = { display: this.state.chatDisplay };

		return (
			<div className="container" id="container">

				<DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} />
				<div className={`enterbox-head ${type === 'LEARNING' ? 'learning-bg' : 'coaching-bg'}`}>
					{/* <div className="roomtype">
						<span className="typename">코칭</span>
					</div>
					{ mySessionId } */}
					<div className="roomtype">
						<span className="typename">{type === 'LEARNING' ? '러닝' : '코칭'}</span>
					</div>
					{ study.title }
					<div className="copy-url" onClick={CopyUrl}>
						<ImShare2/>
					</div>
					<div className="go-back" onClick={leaveRoom}>
						<ImExit/>
					</div>
				</div>

				{localUser !== undefined && 
					localUser.getStreamManager() !== undefined && 
						(isEntered ? (
							<div className="roombox-container">
								<div className="roombox-body">
									<div className="grid-room room1">
										<div className="me">
											<StreamComponent
												user={localUser}
												handleNickname={this.nicknameChanged}
												isMe={true}
											/>
										</div>
										<div className="toolbar-box">
											<ToolbarComponent
												sessionId={mySessionId}
												user={localUser}
												showNotification={this.state.messageReceived}
												camStatusChanged={this.camStatusChanged}
												micStatusChanged={this.micStatusChanged}
												screenShare={this.screenShare}
												stopScreenShare={this.stopScreenShare}
											/>	
										</div>
									</div>
									{localUser !== undefined &&
										localUser.getStreamManager() !== undefined && (
											<div className="grid-room room2">
												<div className="box-splide">
													<Splide
														style={{
															display: "flex",
															justifyContent: "center",
															alignItems: "center",
														}}
														options={{
															type: 'slide',
															rewind: true, // 무한 루프 활성화
															perPage: 3,
															arrows: true,
															autoplay: false, // 자동 슬라이드 비활성화
															gap: '3px', // 슬라이드 사이 간격 없음
															focus: 'center',
															pagination: false,
														}}
													>
														{this.state.subscribers.map((sub, i) => (
															<SplideSlide 
																key={i} 
																className="other"
																onClick={() => this.handleSlideClick(i)}
															>
																<StreamComponent 
																	user={sub}
																	streamId={sub.streamManager.stream.streaId}
																	isMe={false}
																/>
															</SplideSlide>
														))}
													</Splide>
												</div>
												<div className="box-mainrtc">
													{this.state.selectedSlideIndex !== -1 && (
														<StreamComponent
															user={this.state.subscribers[this.state.selectedSlideIndex]}
															streamId={this.state.subscribers[this.state.selectedSlideIndex].streamManager.stream.streaId}
															isMe={false}
														/>
													)}
												</div>
											</div>
										)}
										<div className="grid-room room3">
											<div className="OT_root OT_publisher custom-class" style={chatDisplay}>
												<ChatComponent
													user={localUser}
													chatDisplay={this.state.chatDisplay}
													close={this.toggleChat}
													messageReceived={this.checkNotification}
												/>
											</div>	
										</div>
								</div>
							</div>
						) : (
							<div className="div">
								<div className="enterbox-body">
									<div className="check-box">
										<div className="check-me">
											<StreamComponent user={localUser} isMe={"check"} />
										</div>
										<div className="enter">
											<button className="enter-button" onClick={this.enteredChanged}>
												입장하기
											</button>
											<div className="toolbar-enterbox">
												<ToolbarComponent
													sessionId={mySessionId}
													user={localUser}
													showNotification={this.state.messageReceived}
													camStatusChanged={this.camStatusChanged}
													micStatusChanged={this.micStatusChanged}
													screenShare={this.screenShare}
													stopScreenShare={this.stopScreenShare}
												/>	
											</div>
										</div>
									</div>
								</div>
							</div>
						))}
			</div>
		);
	}

	/**
	 * --------------------------------------------
	 * GETTING A TOKEN FROM YOUR APPLICATION SERVER
	 * --------------------------------------------
	 * The methods below request the creation of a Session and a Token to
	 * your application server. This keeps your OpenVidu deployment secure.
	 *
	 * In this sample code, there is no user control at all. Anybody could
	 * access your application server endpoints! In a real production
	 * environment, your application server must identify the user to allow
	 * access to the endpoints.
	 *
	 * Visit https://docs.openvidu.io/en/stable/application-server to learn
	 * more about the integration of OpenVidu in your application server.
	 */
	async getToken() {
		console.log("before createsession");
		console.log(this.state);

		const sessionId = await this.createSession(this.state.mySessionId);
		console.log("ing createsession")
		return await this.createToken(sessionId);
	}

	async createSession(sessionId) {
		console.log("createSession 들어옴");
		console.log(sessionId);

		const response = await axios.post(
			APPLICATION_SERVER_URL + '/api/sessions', 
			{ customSessionId: sessionId }, 
			{
				headers: { 'Content-Type': 'application/json', },
			}
		);
		return response.data; // The sessionId to getToken(), response 안되면 axait axiosAPi.post로 바꿔보기
	}

	async createToken(sessionId) {
		const response = await axios.post(
			APPLICATION_SERVER_URL + '/api/sessions/' + sessionId + '/connections', 
			{}, 
			{
				headers: { 'Content-Type': 'application/json', },
			}
		);
		return response.data; // The token, response 안되면 axait axiosAPi.post로 바꿔보기
	}
}
export default VideoRoomComponent;
