// import { useState, useEffect } from 'react';
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
    // 백엔드로부터 전달받은 게시물 데이터 배열 가정하기
    const posts = [
        { idx: 1, title: "힝잉잉", createdBy: "요환", createdAt: "2023.07.21", views: 1 },
        { idx: 2, title: "시끄러우니까", createdBy: "요환", createdAt: "2023.07.21", views: 1 },
        { idx: 3, title: "나가서울어", createdBy: "요환", createdAt: "2023.07.21", views: 1 },
        { idx: 4, title: "혹시 되나?", createdBy: "요환", createdAt: "2023.07.24", views: 5 },
    ];
    // 진자로 백과 연결됐을 경우
    // const Freeboard = () => {
    //     const [posts, setPosts] = useState([]);
    
    //      useEffect를 사용하여 컴포넌트가 렌더링 될 때 데이터를 받아오는 비동기 작업을 수행
    //     useEffect(() => {
    //          비동기 함수에서 데이터를 받아오는 예시 (fetch API 사용)
    //         const fetchPosts = async () => {
    //             try {
    //                  백엔드 API 엔드포인트에서 데이터를 받아옴
    //                 const response = await fetch('백엔드API주소/posts');
    //                 const data = await response.json();
    
    //                  받아온 데이터를 state에 저장
    //                 setPosts(data);
    //             } catch (error) {
    //                 console.error('Error fetching data:', error);
    //             }
    //         };
    
    //          데이터 받아오는 함수 호출
    //         fetchPosts();
    //     }, []);  두 번째 인자로 빈 배열을 전달하여 최초 렌더링 시에만 실행하도록 설정
    
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
                        {posts.map((post) => (
                            <Tr key={post.idx}>
                                <Td>{post.idx}</Td>
                                <Td>
                                    <Link to={`/freeboardlist/${post.idx}`} style={{ textDecoration: "none" }}>
                                        {post.title}
                                    </Link>
                                </Td>
                                <Td>{post.createdBy}</Td>
                                <Td>{post.createdAt}</Td>
                                <Td isNumeric>{post.views}</Td>
                            </Tr>
                        ))}
                    </Tbody>
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