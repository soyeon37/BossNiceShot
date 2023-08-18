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
import { error } from 'jquery';

import pandaswing from '../assets/source/imgs/panda_swing.png'
import tigerswing from '../assets/source/imgs/tiger_swing.png'

// 유저 생성
var localUser = new UserModel();

// 애플리케이션 서버 URL
const OPENVIDU_SERVER_URL = process.env.REACT_APP_SERVER_URL;
const OPENVIDU_SERVER_SECRET = 'ssafy';

// 기타 함수
const CopyUrl = () => {
	const url = window.location.href;

	navigator.clipboard.writeText(url).then(() => {
		alert("URL이 복사되었습니다")
	});
};

class VideoRoomComponent extends Component {
	constructor(props) {
		console.log("VideoRoomComponent 들어옴");
		console.log(props);

		super(props);
		this.hasBeenUpdated = false;
		this.layout = new OpenViduLayout();

		// 세션 이름을 담은 변수
		let sessionName = 'session' + this.props.study.id;
		// 유저 이름
		let userName = this.props.studyUser.memberNickname;

		this.remotes = [];
		this.localUserAccessAllowed = false;

		/*
			상태값
			- mySessionId: 접속 중인 세션 이름
			- myUserName: 내 이름
			- session: 세션 정보
			- localUser: 내 정보
			- subscribers: 같이 접속한 사람들
			- chatDisplay: 채팅창 on 여부,
			- currentVideoDevice: 현재 비디오 출력 장치
		*/
		this.state = {
			mySessionId: sessionName,
			myUserName: userName,
			session: undefined,
			localUser: undefined,
			subscribers: [],
			entered: false,
			chatDisplay: 'block',
			currentVideoDevice: undefined,
			selectedSlideIndex: -1,
			isEntered: false,
		};

		/*
		  메서드 바인딩 과정
		*/
		// 세션 접속
		this.joinSession = this.joinSession.bind(this);
		// 세션 접속 해제
		this.leaveSession = this.leaveSession.bind(this);
		// selfLeaveSession: 일반 사용자가 혼자 세션 나갔을 때
		this.selfLeaveSession = this.selfLeaveSession.bind(this);
		// 접속 종료 전에 일어나는 일들을 처리하는 함수
		this.onbeforeunload = this.onbeforeunload.bind(this);
		// 레이아웃 업데이트
		this.updateLayout = this.updateLayout.bind(this);
		// 캠 상태 변경
		this.camStatusChanged = this.camStatusChanged.bind(this);
		// 마이크 상태 변경
		this.micStatusChanged = this.micStatusChanged.bind(this);
		// 전체 화면 처리
		this.toggleFullscreen = this.toggleFullscreen.bind(this);
		// 화면 공유
		this.screenShare = this.screenShare.bind(this);
		// 화면 공유 중지
		this.stopScreenShare = this.stopScreenShare.bind(this);
		// 익스텐션 설치 알림창 닫을 때 작동하는 함수
		this.closeDialogExtension = this.closeDialogExtension.bind(this);
		// 채팅 토글 버튼 함수
		this.toggleChat = this.toggleChat.bind(this);
		// 알림 확인 함수
		this.checkNotification = this.checkNotification.bind(this);
		// 대기실에서 스터디룸으로 이동하는 함수
		this.entereRoom = this.entereRoom.bind(this);
	}

	// 컴포넌트가 마운트 되었을 때 작동하는 리액트 컴포넌트 생명 주기 함수
	componentDidMount() {
		// 화면 레이아웃 설정
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

		// 초기 화면 설정
		this.layout.initLayoutContainer(
			document.getElementById('layout'),
			openViduLayoutOptions
		);

		// 화면 크기 변경 및 종료시 발생하는 이벤트 핸들러 추가
		window.addEventListener('beforeunload', this.onbeforeunload);
		window.addEventListener('resize', this.updateLayout);

		// 세션에 조인
		this.joinSession();
	}

	// 컴포넌트가 언마운트 됐을 때 작성하는 리액트 컴포넌트 생명 주기 함수
	componentWillUnmount() {
		window.removeEventListener('beforeunload', this.onbeforeunload);
		window.removeEventListener('resize', this.updateLayout);
		this.leaveSession();
	}

	// 페이지를 떠나기 직전에 작동하는 함수
	onbeforeunload(event) {
		this.leaveSession();
	}

	// 세션에 접속할 때 작동하는 함수
	joinSession() {
		console.log("<< joinSession >>");
		this.OV = new OpenVidu();

		/*
			첫번째 인자: 상태값 설정
			두번째 인자: 콜백함수
		*/
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

	// 세션 연결을 위한 토큰을 받아 연결 처리
	connectToSession() {
		console.log("<< connectToSession >>");

		if (this.props.token !== undefined) {
			console.log('connectToSession - 받은 토큰: ', this.props.token);
			this.connect(this.props.token);
		} else {
			console.log("connectToSession - 토큰 받기 시도");
			this.getToken()
				.then((token) => {
					console.log("token:", token);

					this.connect(token);
				})
				.catch ((error) => {
					if(this.props.error){
						this.props.error({
							error: error.error,
							message: error.message, // 여기서 오류나면 메세지가 아니라 메스개
							code: error.code,
							status: error.status
						});
					}

					console.error(
						'There was an error getting the token:',
						error.code,
						error.message
					);

					alert('There was an error getting the token:', error.message);
				});
		}
	}

	// 토큰을 매개변수로 받아 실제 세션에 접소갛게 해주는 함수
	connect(token) {
		console.log("<< connect >>");
		console.log("token:", token);

		// 유저끼리 데이터 교환
		this.state.session
			.connect(token, {
				clientData: this.state.myUserName
			})
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

	// 웹 캠을 연결하는 함수
	async connectWebCam() {
		await this.OV.getUserMedia({
			audioSource: undefined,
			videoSource: undefined
		});

		// 현재 연결된 디바이스 받기
		var devices = await this.OV.getDevices();
		// 연결된 디바이스 중에 비디오 디바이스 필터링
		var videoDevices = devices.filter(device => device.kind === 'videoinput');

		// publisher 초기 설정(본인)
		let publisher = this.OV.initPublisher(undefined, {
			audioSource: undefined,
			videoSource: videoDevices[0].deviceId,
			publishAudio: localUser.isAudioActive(),
			publishVideo: localUser.isVideoActive(),
			resolution: '640x480',
			frameRate: 30,
			insertMode: 'APPEND',
		});

		// 접근 허용 시 설정 변경
		if (this.state.session.capabilities.publish) {
			publisher.on('accessAllowed' , () => {
				this.state.session.publish(publisher).then(() => {
					this.updateSubscribers();
					this.localUserAccessAllowed = true;
					if (this.props.joinSession) {
						this.props.joinSession();
					}
				});
			});
		}

		// 로컬 유저(본인)의 정보 및 환경설정
		localUser.setNickname(this.state.myUserName);
		localUser.setConnectionId(this.state.session.connection.connectionId);
		localUser.setScreenShareActive(false);
		localUser.setStreamManager(publisher);

		// 이벤트 등록
		if (this.props.study.memberId !== this.props.studyUser.memberId) {
			this.subscribeToSessionClosed();
		}
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

	// 자신의 정보를 받고 있는 유저들의 정보 업데이트
	updateSubscribers() {
		const subscribers = this.remotes;
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

		console.log("updateSubscribers - subscribers:", subscribers);
	}

	// 코치가 아닌 일반 유저가 나간 경우
	selfLeaveSession() {
		console.log("<< selfLeaveSession >>");

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

		if (this.props.leaveRoom) {
			this.props.leaveRoom();
		}
	}

	// 세션을 빠져나가는 함수
	async leaveSession() {
		console.log("<< leaveSession >>");

		const mySession = this.state.session;
		mySession.unpublish(localUser.getStreamManager());

		if (this.props.study.memberId === this.props.studyUser.memberId) {
			this.state.localUser.getStreamManager().stream.session.signal({
				type: 'classClosed',
			});
		}

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

		if (this.props.leaveRoom) {
			this.props.leaveRoom();
		}
	}

	// 캠 설정 변경
	camStatusChanged() {
		localUser.setVideoActive(!localUser.isVideoActive());
		localUser.getStreamManager().publishVideo(localUser.isVideoActive());
		this.sendSignalUserChanged({ isVideoActive: localUser.isVideoActive() });
		this.setState({ localUser: localUser });
	}

	// 마이크 설정 변경
	micStatusChanged() {
		localUser.setAudioActive(!localUser.isAudioActive());
		localUser.getStreamManager().publishAudio(localUser.isAudioActive());
		this.sendSignalUserChanged({ isAudioActive: localUser.isAudioActive() });
		this.setState({ localUser: localUser });
	}

	// 매개변수로 받은 stream을 가진 유저를 구독자 명단에서 제거하는 함수
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

	// 새롭게 접속한 사람의 스트림을 구독하는 함수
	subscribeToStreamCreated() {
		console.log("<< subscribeToStreamCreated >>");

		this.state.session.on('streamCreated', (event) => {
			// 새롭게 등장한 구독 객체를 subscriber에 저장
			const subscriber = this.state.session.subscribe(event.stream, undefined);

			subscriber.on('streamPlaying', (e) => {
				this.checkSomeoneShareScreen();
				subscriber.videos[0].video.parentElement.classList.remove('custom-class');
			});

			// 새로운 유저 객체를 만들어 거기에 이벤트로 받은 stream 정보를 받은 후 내 remotes에 등록
			const newUser = new UserModel();
			newUser.setStreamManager(subscriber);
			newUser.setConnectionId(event.stream.connection.connectionId);
			newUser.setType('remote');
			newUser.setAudioActive(event.stream.audioActive);
			newUser.setVideoActive(event.stream.videoActive);

			const nickname = event.stream.connection.data.split('%')[0];
			newUser.setNickname(JSON.parse(nickname).clientData);

			this.remotes.push(newUser);
			if(this.localUserAccessAllowed) {
				this.updateSubscribers();
			}
		});
	}

	// streamDestroyed 이벤트가 들어왔을 때 해당하는 stream 요소를 구독 목록에서 제거
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

	// 구독 유저 중 닉네임, 비디어, 오디오, 화면공유 상태가 변경될 때 감지
	subscribeToUserChanged() {
		console.log("<< subscribeToUserChanged >>");

		this.state.session.on('signal:userChanged', (event) => {
			let remoteUsers = this.state.subscribers;

			remoteUsers.forEach((user) => {
				if (user.getConnectionId() === event.from.connectionId) {
					const data = JSON.parse(event.data);

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
						this.updateLayout();
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

	subscribeToSessionClosed() {
		this.state.session.on('signal:classClosed', (evnet) => {
			this.leaveSession();
		});
	}

	// 레이아웃 업데이트
	updateLayout() {
	setTimeout(() => {
			this.layout.updateLayout();
		}, 20);
	}

	// 유저 정보가 변경되었음을 알려주는 함수
	sendSignalUserChanged(data) {
		console.log("<< sendSignalUserChanged >>");
		console.log("sendSignalUserChanged-data:", data);

		const signalOptions = {
			data: JSON.stringify(data),
			type: 'userChanged',
		};

		this.state.session.signal(signalOptions);
	}

	// 전체 화면을 토글하는 함수
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

	// 화면 공유를 도와주는 함수
	screenShare() {
		const videoSource =
			navigator.userAgent.indexOf('Firefox') !== -1 ? 'window' : 'screen';

		// 화면 공유하는 사람의 상태 확인
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
					alert('브라우저가 화면 공유를 지원하지 않습니다.');
				} else if (error && error.name === 'SCREEN_EXTENSION_DISABLED') {
					alert('화면 공유를 위한 확장 프로그램을 사용할 수 없습니다.');
				} else if (error && error.name === 'SCREEN_CAPTURE_DENIED') {
					alert('화면 공유를 취소합니다.');
				}
			},
		);

		// 접근 허용이 되어있다면 스크린공유를 위한 상태값 변경
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

		// 다른 사람의 streamPlaying이 발생했을 때 내 화면 초기화
		publisher.on('streamPlaying', () => {
			this.updateLayout();
			publisher.videos[0].video.parentElement.classList.remove('custom-class');
		});
	}

	// 다이얼로그창 닫기 함수
	closeDialogExtension() {
		this.setState({ showExtensionDialog: false });
	}

	// 화면 공유 중지 함수
	stopScreenShare() {
		// 현재 내용 발행 중지
		this.state.session.unpublish(localUser.getStreamManager());
		// 웹 캠 재연결
		this.connectWebCam();
	}

	// 다른 사람이 화면 공유를 하고 있는지 확인
	checkSomeoneShareScreen() {
		let isScreenShared;

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

	// 채팅 토글 버튼, none이면 채팅창 off / block이면 채팅창 on
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
	}

	// 채팅 안내 확인
	checkNotification(event) {
		this.setState({
			messageReceived: this.state.chatDisplay === 'none',
		});
	}

	// 스터디룸 입장
	entereRoom() {
		this.setState({
			isEntered: true
		});

		this.updateLayout();
	}

	handleSlideClick = (index) => {
		if (this.state.selectedSlideIndex === index) {
		this.setState({ selectedSlideIndex: -1 }); // 이미 선택된 슬라이드를 다시 클릭하면 선택 취소
	} else {
		this.setState({ selectedSlideIndex: index });
	}
	};

	render() {
		const { type, study, studyUser, leaveRoom } = this.props;

		const mySessionId = this.state.mySessionId;
		const localUser = this.state.localUser;
		const isEntered = this.state.isEntered;
		const subscribers = this.state.subscribers;

		var chatDisplay = { display: this.state.chatDisplay };

		return (
			<div className="container" id="container">
				<DialogExtensionComponent showDialog={this.state.showExtensionDialog} cancelClicked={this.closeDialogExtension} />
				<div className={`enterbox-head ${type === 'LEARNING' ? 'learning-bg' : 'coaching-bg'}`}>                                        <div className="roomtype">
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

				<div id="layout">
					{localUser !== undefined &&
						localUser.getStreamManager() !== undefined &&
							(isEntered ? (
								<div className="roombox-container">
									<div className="roombox-body">
										<div className="grid-room room1">
											<div className="me">
												<StreamComponent
													user={localUser}                                                                                                        handleNickname={this.nicknameChanged}
													isMe={true}
												/>
											</div>
											<div className="toolbar-box">
												<ToolbarComponent
													sessionId={mySessionId}
													user={localUser}                                                                                                        showNotification={this.state.messageReceived}
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
										<div className='enter-img-box'>
											<img className='swing-mascot' src={`${type === 'LEARNING' ? pandaswing : tigerswing}`} alt="swingmascot" />
										</div>
										<div className="check-box">
											<div className="check-me">
												<StreamComponent user={localUser} isMe={"check"} />
											</div>
											<div className="enter">
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
												<button className={`enter-button ${type === 'LEARNING' ? 'learning-bg' : 'coaching-bg'}`} onClick={this.entereRoom}>
													입장하기
												</button>
											</div>
											<div className={`check-box-background-div ${type === 'LEARNING' ? 'learning-bg' : 'coaching-bg'}`}></div>
										</div>
										<div className='enter-img-box'>
										</div>
									</div>
								</div>
							))}
				</div>
			</div>
		);
};


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

	// 현재 내 세션 아이디를 통해 세션을 생성하고 토큰을 발급하는 함수
	async getToken() {
		console.log("<< getToken >>");

		const sessionId = await this.createSession(this.state.mySessionId);
		console.log("ing createsession")
		console.log(sessionId);
		return await this.createToken(sessionId);
	}

	async createSession(sessionId) {
		console.log("createSession 들어옴");
		console.log(sessionId);

		try {
			const response = await axios.post(
				OPENVIDU_SERVER_URL + '/openvidu/api/sessions',
				{ customSessionId: sessionId },
				{
					headers: { Authorization:
					  'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
					  'Content-Type': 'application/json', },
				}
			);

			// setTimeout(() => {
			//      console.log("강제 리턴");
			//      console.log("--", sessionId);

			//      return sessionId;
			// }, 1000);

			console.log(response);
			return response.data.customSessionId;
		} catch (response) {
			console.log("<< createSession -- error >>");
			let error = Object.assign({}, response);
			console.log(error);

			return sessionId;
		}
	}

	async createToken(sessionId) {

		console.log("createToken!!");

		console.log(sessionId);

		const response = await axios.post(
			OPENVIDU_SERVER_URL + '/openvidu/api/sessions/' + sessionId + '/connection',
			{},
			{
				headers: { Authorization:
					'Basic ' + btoa('OPENVIDUAPP:' + OPENVIDU_SERVER_SECRET),
				  'Content-Type': 'application/json', },
			}
		);

		console.log(response.data);
		return response.data.token; // The token, response 안되면 axait axiosAPi.post로 바꿔보기
	}
}
export default VideoRoomComponent;