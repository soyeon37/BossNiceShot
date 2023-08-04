import React, {useState, useEffect} from 'react';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import {
    Button,
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
    Text,
} from '@chakra-ui/react'

// bell icon 삽입
// import { GoBell } from "react-icons/go";

import AlertList from './AlertList';


import { CloseButton } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';

function AlertPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState("");

    // 알림 내역 호출 함수
    const handleGetNotification = () => {
        const apiUrl =  'http://localhost:8080/notification/read';
        axios.get(apiUrl)
        .then((response)=>{
            console.log(response);

            setNotifications(response.data.data.NotificationList)
            console.log('notification: ', response.data.data.NotificationList[0]);
            handleUpdateRead();
        })
        .catch((error)=>{
            navigate('/');
        })
    };

    // 알림 삭제 함수
    // id값 가져와야 함
    const handleDeleteNotification = (id) => {
        const apiUrl =  'http://localhost:8080/notification/delete';
        const data = {
            id : id
        };
        axios.delete(apiUrl, data)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            navigate('/');
        })
    }
    
    // 알림 전체 삭제 함수
    const handleDeleteAllNotification = () => {
        const apiUrl =  'http://localhost:8080/notification/deleteAll';
        axios.delete(apiUrl)
        .then((response)=>{
            console.log(response);
        })
        .catch((error)=>{
            navigate('/');
        })
    }
    
    // 알림 수락/거절 전송 함수
    const handleSendResultNotification = (message, articleId, sender, recipient, type) => {
        const apiUrl = 'http://localhost:8080/notification/create';
        const data = {
            id : "", 
	        type : type,
	        recipient : recipient,
	        sender :  sender,
	        articleId : articleId,
	        status : message,
	        read: false
        };
        axios.post(apiUrl, data)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            navigate('/');
        })
    }

    // 알림 수락/거절 함수
    const handleResultNotification = () => {
        handleSendResultNotification("SUCCESS", 2, "soyeun3377@naver.com", "soyeun37@gmail.com", "coaching");
        handleDeleteNotification("");
    }

    // 알림 read 갱신 함수
    const handleUpdateRead = () => {
        const apiUrl = 'http://localhost:8080/notification/update';
        axios.put(apiUrl)
        .then((response) => {
            console.log(response);
        })
        .catch((error) => {
            navigate('/');
        })
    }


    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={() => {handleGetNotification(); onOpen();}}>
                벨
            </Button>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>알림내역</DrawerHeader>

                    <DrawerBody>
                    {notifications && notifications.map((notification, index) => (
                    // 반복문 실행
                    <Flex key={index}>
                     <div>
                      <Avatar />
                     <Text fontSize='xs'>
                        {notification.senderNickname}님이 {notification.title}을 개설했습니다.
                      </Text>
                       <CloseButton />
                       </div>
                     </Flex>
                    ))}
                        
                        {/* 이렇게 하면 되는데, 왜 AlertList를 받아오면 안되는걸까요? */}
                        <Flex>
                            <div>
                                <Avatar />
                                <Text fontSize='xs'>
                                    윤싸피님이 [동행] 모집을 개설했습니다.
                                </Text>
                                <CloseButton />
                            </div>
                        </Flex>
                        {/* 여기에 알람 내역 들어가는 내용들 들어와야 함 */}
                    </DrawerBody>

                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AlertPage;
