import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

// Redux
import { useSelector } from "react-redux";

import {
  AvatarBadge,
  ButtonGroup,
  useDisclosure,
  Input,
  Stack,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Icon,
  Flex,
} from "@chakra-ui/react";

import AlertList from "./AlertList";
import "./alert.css";

import { CloseButton } from "@chakra-ui/react";
import { Avatar } from "@chakra-ui/react";
import { red } from "@mui/material/colors";

function AlertPage() {
  // 사용자 정보(userId)로 axios 수행
  const userId = useSelector((state) => state.userInfoFeature.userId);
  const accessToken = useSelector((state) => state.userInfoFeature.userAccessToken);
  axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);

  // 알림 내역 호출 함수
  const handleGetNotification = () => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + '/api/notification/read';
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("read:", response);
        const num = 0;
        const dataWithVisibility = response.data.data.NotificationList.map(
          (notification, index) => ({
            ...notification,
            isVisible: true, // Set initial visibility for each notification
            index: index + 1,
          })
        );
        setNotifications(dataWithVisibility);
        // setNotifications(response.data.data.NotificationList);
        console.log("notification: ", notifications[1]);
        handleUpdateRead();
      })
      .catch((error) => {
        navigate("/");
      });
  };

  // 알림 삭제 함수
  // id값 가져와야 함
  const handleDeleteNotification = (id, index) => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + `/api/notification/delete/${id}`;
    console.log(id);
    axios
      .delete(apiUrl)
      .then((response) => {
        console.log(response);
        handleVisibility(index);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  // 알림 전체 삭제 함수
  const handleDeleteAllNotification = () => {
    const confirmDelete = window.confirm("알림 전체 삭제를 진행하시겠습니까?");
    if (confirmDelete) {
      const apiUrl = process.env.REACT_APP_SERVER_URL + + "/notification/deleteAll";
      axios
        .delete(apiUrl)
        .then((response) => {
          console.log(response);
          handleGetNotification();
        })
        .catch((error) => {
          navigate("/");
        });
    }
  };

  // 알림 수락/거절 전송 함수
  const handleSendResultNotification = (message, articleId, sender, recipient, type, index) => {
    console.log("신청 결과 전송 시작");
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/notification/create";
    const data = {
      id: "",
      type: type,
      recipient: recipient,
      sender: sender,
      articleId: articleId,
      status: message,
      read: false,
    };
    axios
      .post(apiUrl, data)
      .then((response) => {
        console.log(response);
        handleDeleteNotification(index);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  // 알림 수락/거절 함수
  const handleResultNotification = (message, index) => {
    if (message === "SUCCESS") {
      const confirmResult = window.confirm("정말로 수락하시겠습니까?");
      if (confirmResult) {
        handleSendResultNotification(
          message,
          2,
          "soyeun3377@naver.com",
          "soyeun37@gmail.com",
          "result",
          index
        );
      }
    } else if (message === "FAIL") {
      const confirmResult = window.confirm("정말로 거절하시겠습니까?");
      if (confirmResult) {
        handleSendResultNotification(
          message,
          2,
          "soyeun3377@naver.com",
          "soyeun37@gmail.com",
          "result",
          index
        );
      }
    }
    console.log(message);
  };

  // 알림 read 갱신 함수
  const handleUpdateRead = () => {
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/notification/update";
    axios
      .put(apiUrl)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        navigate("/");
      });
  };

  // div 안보이게 하는 함수
  const handleVisibility = (index) => {
    setNotifications((notifications) => {
      const updateData = notifications.map((item) =>
        item.index === index + 1 ? { ...item, isVisible: !item.isVisible } : item
      );
      return updateData;
    });
    // 삭제 후 새로고침
    handleGetNotification();
  };
  // 알림 내역 반복문 함수
  const handleFilteringNotification = () => {
    const arr = [];
    if (notifications.length === 0) {
      return arr; // Return an empty array if there are no notifications
    }

    for (let i = 0; i < notifications.length; i++) {
      if (notifications[i].type === "coaching") {
        arr.push(
          <div
            className="alert-sidebar"
            key={i}
            style={{ display: notifications[i].isVisible ? "block" : "none" }}
          >
            <div className="alert-top">
              <div className="alert-avatar">
                <Avatar />
              </div>
              <div className="alert-text">
                <div style={{ fontSize: "12px" }}>
                  <span className="bold">{notifications[i].senderNickname}님</span>이
                  <span className="bold">[{notifications[i].title}]</span> 코칭룸을 개설했습니다.
                </div>
              </div>
              <div className="alert-delete">
                <CloseButton
                  onClick={() => {
                    handleDeleteNotification(notifications[i].id, i);
                  }}
                />
              </div>
            </div>
          </div>
        );
      } else if (notifications[i].type === "learning") {
        arr.push(
          <div
            className="alert-sidebar"
            key={i}
            style={{ display: notifications[i].isVisible ? "block" : "none" }}
          >
            <div className="alert-top">
              <div className="alert-avatar">
                <Avatar />
              </div>
              <div className="alert-text">
                <div style={{ fontSize: "12px" }}>
                  <span className="bold">{notifications[i].senderNickname}님</span>이
                  <span className="bold">[{notifications[i].title}]</span> 러닝룸을 개설했습니다.
                </div>
              </div>
              <div className="alert-delete">
                <CloseButton
                  onClick={() => {
                    handleDeleteNotification(notifications[i].id, i);
                  }}
                />
              </div>
            </div>
          </div>
        );
      } else if (notifications[i].type === "result") {
        arr.push(
          <div
            className="alert-sidebar"
            key={i}
            style={{ display: notifications[i].isVisible ? "block" : "none" }}
          >
            <div className="alert-top">
              <div className="alert-avatar">
                <Avatar />
              </div>
              <div className="alert-text">
                <div style={{ fontSize: "12px" }}>
                  <span className="bold">{notifications[i].senderNickname}님</span>의
                  <span className="bold">[{notifications[i].title}]</span> 동행 모집 신청 결과
                  <span className="bold">[{notifications[i].status}]</span> 했습니다.
                </div>
              </div>
              <div className="alert-delete">
                <CloseButton
                  onClick={() => {
                    handleDeleteNotification(notifications[i].id, i);
                  }}
                />
              </div>
            </div>
          </div>
        );
      } else if (notifications[i].type === "apply") {
        arr.push(
          <div className="alert-sidebar">
            <div className="alert-top">
              <div className="alert-avatar">
                <Avatar />
              </div>
              <div className="alert-text">
                <div style={{ fontSize: "12px" }}>
                  <span className="bold">{notifications[i].senderNickname}님</span>이
                  <span className="bold">[{notifications[i].title}]</span>을 신청했습니다.
                </div>
              </div>
            </div>
            <div className="alert-bottom">
              <button
                className="accept"
                onClick={() => handleResultNotification("SUCCESS", notifications[i].id)}
              >
                수락
              </button>
              <button
                className="refuse"
                onClick={() => handleResultNotification("FAIL", notifications[i].id)}
              >
                거절
              </button>
            </div>
          </div>
        );
      } else if (notifications[i].type === "companion") {
        // 동행 모집 글
        arr.push(
          <div
            className="alert-sidebar"
            key={i}
            style={{ display: notifications[i].isVisible ? "block" : "none" }}
          >
            <div className="alert-top">
              <div className="alert-avatar">
                <Avatar />
              </div>
              <div className="alert-text">
                <div style={{ fontSize: "12px" }}>
                  <span className="bold">{notifications[i].senderNickname}님</span>이
                  <span className="bold">[{notifications[i].title}]</span> 동행 모집을 개설했습니다.
                </div>
              </div>
              <div className="alert-delete">
                <CloseButton
                  onClick={() => {
                    handleDeleteNotification(notifications[i].id, i);
                  }}
                />
              </div>
            </div>
          </div>
        );
      }
    }
    return arr;
  };

  // HTML
  return (
    <>
      <div
        className="nav-alarm-bell"
        onClick={() => {
          console.log("작은게 눌림!");
          onOpen();
          handleGetNotification();
        }} div />

      <Drawer isOpen={isOpen} placement="right" onClose={onClose} finalFocusRef={btnRef}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>알림내역</DrawerHeader>

          <DrawerBody>
            <Flex justifyContent="flex-end">
              <button className="delete-all-button" onClick={handleDeleteAllNotification}>
                전체삭제
              </button>
            </Flex>
            {handleFilteringNotification()}
            {/* 컴포넌트 CSS 적용 */}

            <div className="alert-sidebar">
              <div className="alert-top">
                <div className="alert-avatar">
                  <Avatar />
                </div>
                <div className="alert-text">
                  <div style={{ fontSize: "12px" }}>
                    윤싸피님이 <span className="bold">[동행]</span> 모집을 개설했습니다.
                  </div>
                </div>
                <div className="alert-delete">
                  <CloseButton />
                </div>
              </div>
            </div>

            <div className="alert-sidebar ">
              <div className="alert-top">
                <div className="alert-avatar">
                  <Avatar />
                </div>
                <div className="alert-text">
                  <div style={{ fontSize: "12px" }}>
                    윤싸피님이 <span className="bold">[동행]</span> 모집을 개설했습니다.
                  </div>
                </div>
              </div>
              <div className="alert-bottom">
                <button className="accept">수락</button>
                <button className="refuse">거절</button>
              </div>
            </div>
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  );
}

export default AlertPage;
