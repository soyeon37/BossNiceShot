import { Box, Text } from '@chakra-ui/react';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
} from '@chakra-ui/react'


const Freeboard = () => {
    return (
        <Box p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Welcome to InquiryList!
            </Text>
            <TableContainer>
                <Table size={'lg'} variant='simple'>
                    <Thead>
                        <Tr>
                            <Th>글 번호</Th>
                            <Th>제목</Th>
                            <Th>작성자</Th>
                            <Th>작성일</Th>
                            <Th>조회수</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr>
                            <Td>1</Td>
                            <Td>재아님 안녕하세요</Td>
                            <Td>최현우</Td>
                            <Td>2023.07.19</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        
                        <Tr>
                            <Td>2</Td>
                            <Td>잘 지내시죠?</Td>
                            <Td>최현우</Td>
                            <Td>2023.07.19</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        <Tr>
                            <Td>3</Td>
                            <Td>감기에 걸리신 것 같아요</Td>
                            <Td>최현우</Td>
                            <Td>2023.07.19</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        <Tr>
                            <Td>yards</Td>
                            <Td>metres (m)</Td>
                            <Td isNumeric>0.91444</Td>
                        </Tr>
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Th>To convert</Th>
                            <Th>into</Th>
                            <Th isNumeric>multiply by</Th>
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Freeboard;