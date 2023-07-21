import { Box, Button, Text } from '@chakra-ui/react';
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
import { Link } from 'react-router-dom';

const Freeboard = () => {
    return (
        <Box p={4}>
            <Text fontSize="xl" fontWeight="bold" mb={4}>
                Welcome to Freeboard!
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
                            <Td>힝잉잉</Td>
                            <Td>요환</Td>
                            <Td>2023.07.21</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        
                        <Tr>
                            <Td>2</Td>
                            <Td>시끄러우니까</Td>
                            <Td>요환</Td>
                            <Td>2023.07.21</Td>
                            <Td isNumeric>1</Td>
                        </Tr>
                        <Tr>
                            <Td>3</Td>
                            <Td>나가서울어</Td>
                            <Td>요환</Td>
                            <Td>2023.07.21</Td>
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
            <Box display="flex" justifyContent="flex-end">
                <Link to="/myeditor" style={{ textDecoration: "none" }}> 
                    <Button width='8rem' margin={5}>
                        작성하기
                    </Button>
                </Link>
            </Box>
        </Box>
    );
    
};


export default Freeboard;