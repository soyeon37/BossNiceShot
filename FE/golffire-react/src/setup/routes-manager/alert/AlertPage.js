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
} from '@chakra-ui/react'

// bell icon 삽입
import { GoBell } from "react-icons/go";

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
                        <Stack spacing='24px'>

                        </Stack>
                        {/* 여기에 알람 내역 들어가는 내용들 들어와야 함 */}
                        <Input placeholder='Type here...' />
                    </DrawerBody>

                    <DrawerFooter>
                        <Button variant='outline' mr={3} onClick={onClose}>
                            닫기
                        </Button>
                        <Button colorScheme='blue'>Save</Button>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default AlertPage;
