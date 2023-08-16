import React, { Component } from 'react';
import './ToolbarComponent.css';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import { 
	MdVideocam,
	MdVideocamOff,
	MdMic,
	MdMicOff,
	MdScreenShare,
	MdStopScreenShare, 
} from "react-icons/md";
// import Tooltip from '@material-ui/core/Tooltip';
// import QuestionAnswer from '@material-ui/icons/QuestionAnswer';
import IconButton from '@material-ui/core/IconButton';

export default class ToolbarComponent extends Component {
	constructor(props) {
		super(props);
		this.state = { fullscreen: false };
		this.camStatusChanged = this.camStatusChanged.bind(this);
		this.micStatusChanged = this.micStatusChanged.bind(this);
		this.screenShare = this.screenShare.bind(this);
		this.stopScreenShare = this.stopScreenShare.bind(this);
		this.toggleChat = this.toggleChat.bind(this);
	}

	
	micStatusChanged() {
		this.props.micStatusChanged();
	}

	camStatusChanged() {
		this.props.camStatusChanged();
	}

	screenShare() {
		this.props.screenShare();
	}

	stopScreenShare() {
		this.props.stopScreenShare();
	}

	toggleChat() {
		this.props.toggleChat();
	}

	render() {
		const mySessionId = this.props.sessionId;
		const localUser = this.props.user;
		return (
			
			// <AppBar className="toolbar" id="header">
				<Toolbar className="toolbar">
					{/* 방 제목 */ }
					{/* <div id="navSessionInfo">
						{this.props.sessionId && <div id="titleContent">
							<span id="session-title">{mySessionId}</span>
						</div>}
					</div> */}

					{/* 툴바 버튼 */}
					<div className="buttonsContent">
						<IconButton 
							color="inherit" 
							className="navButton" 
							id="navMicButton" 
							onClick={this.micStatusChanged}
						>
							{localUser !== undefined && localUser.isAudioActive() ? (
								<MdMic /> 
							) : (
								<MdMicOff  />
							)}
						</IconButton>

						<IconButton 
							color="inherit" 
							className="navButton" 
							id="navCamButton" 
							onClick={this.camStatusChanged}
						>
							{localUser !== undefined && localUser.isVideoActive() ? (
								<MdVideocam />
							) : (
								<MdVideocamOff />
							)}
						</IconButton>

						{localUser !== undefined && !localUser.isScreenShareActive() && (
							<IconButton
								color="inherit"
								className="navButton"
								onClick={this.screenShare}
							>
								<MdScreenShare fontSize="large" />
							</IconButton>
						)}
						{localUser !== undefined && localUser.isScreenShareActive() && (
							<IconButton onClick={this.stopScreenShare} id="navScreenButton">
								<MdStopScreenShare 
									color="secondary" 
									fontsize="large" 
								/>
							</IconButton>
						)}
						{/* <IconButton 
							color="inherit" 
							onClick={this.toggleChat} 
							id="navChatButton"
						>
							{this.props.showNotification && <div id="point" className="" />}
							<Tooltip title="Chat">
								<QuestionAnswer />
							</Tooltip>
						</IconButton> */}
					</div>
			  </Toolbar>
		//   </AppBar>
		);
	}
}
