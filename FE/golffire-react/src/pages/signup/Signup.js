import { ChakraProvider } from '@chakra-ui/react'
import {
    FormControl,
    FormLabel,
    FormErrorMessage,
    FormHelperText,
    HStack,
    Radio,
    RadioGroup,
    Input
  } from '@chakra-ui/react'


function Signup() {
  return (
    <FormControl>
        <h1>정보 입력</h1>
        <h3>자신을 소개하는 정보를 입력하세요</h3>
        {/* 사진 넣는 공간 */}
        <FormLabel>닉네임</FormLabel>
        <Input type='nickname' />
        <FormLabel>자기소개</FormLabel>
        <Input type='selfintro' />
        <FormLabel>최고타수</FormLabel>
        <Input type='bestshot' />
        <FormLabel>평균타수</FormLabel>
        <Input type='avgshot' />
        
        <FormLabel as='teebox'>선호 티박스</FormLabel>
        <RadioGroup defaultValue='Redtee'>
            <HStack spacing='24px'>
                <Radio value='Redtee'>레드티박스 - 여성</Radio>
                <Radio value='Whitetee'>화이트티박스 - 남성</Radio>
                <Radio value='Blacktee'>블랙티박스 - 프로</Radio>
            </HStack>
        </RadioGroup>
        <FormHelperText>프로라면 블랙티박스를 선택하세요.</FormHelperText>
    </FormControl>
  );
};

export default Signup;
