import React, {useState, useEffect} from 'react';
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

import {
    Button,
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
    Text,
} from '@chakra-ui/react'

// bell icon 삽입
// import { GoBell } from "react-icons/go";

import AlertList from './AlertList';
import "./alert.css";

import { CloseButton } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react';
import { red } from '@mui/material/colors';

function AlertPage() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = React.useRef()
    const navigate = useNavigate();
    const [notifications, setNotifications] = useState([]);



    // 알림 내역 호출 함수
    const handleGetNotification = () => {
        const apiUrl =  'http://localhost:8080/notification/read';
        axios.get(apiUrl)
        .then((response)=>{
            console.log('read:',response);

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
        const apiUrl =  `http://localhost:8080/notification/delete/${id}`;
        console.log(id);
        axios.delete(apiUrl)
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
    const handleSendResultNotification = (message, articleId, sender, recipient, type, index) => {
        console.log("신청 결과 전송 시작")
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
            handleDeleteNotification(index);
        })
        .catch((error) => {
            navigate('/');
        })
    }

    // 알림 수락/거절 함수
    const handleResultNotification = (message, index) => {
        console.log(message);
        handleSendResultNotification(message, 2, "soyeun3377@naver.com", "soyeun37@gmail.com", "coaching", index);
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


    // 알림 내역 반복문 함수
    const handleFilteringNotification = () => {
        const arr = [];
        if (notifications.length === 0) {
          return arr; // Return an empty array if there are no notifications
        }

        for (let i = 0; i <notifications.length; i++){
            if(notifications[i].type === "coaching"){
                arr.push(
                    <Flex key={i}>
                    <box>
                     <Avatar />
                    <Text fontSize='xs'>
                       {notifications[i].senderNickname}님이 {notifications[i].title} 코칭룸을 개설했습니다.
                    </Text>
                       <CloseButton onClick={() => handleDeleteNotification(notifications[i].id)}/>
                       </box>
                    </Flex> 
                )
            }else if(notifications[i].type === "learning"){
                arr.push(
                    <Flex key={i}>
                    <box> 
                     <Avatar />
                    <Text fontSize='xs'>
                       {notifications[i].senderNickname}님이 {notifications[i].title} 러닝룸을 개설했습니다.
                    </Text>
                       <CloseButton onClick={() => handleDeleteNotification(notifications[i].id)}/>
                       </box>
                    </Flex> 
                )
            }else if(notifications[i].type === "result"){
                arr.push(
                    <Flex key={i}>
                    <box>
                     <Avatar />
                    <Text fontSize='xs'>
                       {notifications[i].senderNickname}님의 {notifications[i].title} 동행 신청이 {notifications[i].status}되었습니다.
                    </Text>
                    <CloseButton onClick={() => handleDeleteNotification(notifications[i].id)}/>
                       </box>
                    </Flex> 
                )
            }else if(notifications[i].type === "apply"){
                arr.push(
                    <Flex key={i}>
                    <box>
                     <Avatar />
                    <Text fontSize='xs'>
                       {notifications[i].senderNickname}님이 {notifications[i].title}을 신청했습니다.
                    </Text>
                    <ButtonGroup className='buttons' spacing='2' size='sm'>
                      <Button className='accept'
                      borderWidth="2px"      
                      borderColor="blackAlpha.500"
                      background={'#72CE27'}
                      textColor={'white'}
                      onClick={() => handleResultNotification("SUCCESS", notifications[i].id)}
                     >수락</Button>
                      <Button className='refuse'
                       borderWidth="2px"      
                       borderColor="blackAlpha.500"
                       background={'#E53E3E'}
                       textColor={'white'}
                       onClick={() => handleResultNotification("FAIL", notifications[i].id)}
                      >거절</Button>
                    </ButtonGroup>
                       </box>
                    </Flex> 
                )
            }else if(notifications[i].type === "companion"){ // 동행 모집 글
                arr.push(
                    <Flex key={i}>
                    <box>
                     <Avatar />
                    <Text fontSize='xs'>
                       {notifications[i].senderNickname}님이 {notifications[i].title} 동행 모집을 개설했습니다.
                    </Text>
                           <CloseButton onClick={() => handleDeleteNotification(notifications[i].id)}/>
                       </box>
                    </Flex> 
                )
            }
           
        }
        return arr;
    }


    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={() => {onOpen(); handleGetNotification();} }>
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
                    <Flex justifyContent="flex-end">
              <button className='delete-all-button' onClick={handleDeleteAllNotification}>
                전체삭제
              </button>
            </Flex>
                    {handleFilteringNotification()}
                        
                        {/* 이렇게 하면 되는데, 왜 AlertList를 받아오면 안되는걸까요? */}
                        <Flex>
                            <box>
                                <Avatar />
                                <Text fontSize='xs'>
                                    윤싸피님이 [동행] 모집을 개설했습니다.
                                </Text>
                                <CloseButton />
                            </box>
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
