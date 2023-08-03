import React from 'react';

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

    return (
        <>
            <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
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
