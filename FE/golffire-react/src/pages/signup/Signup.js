import { ChakraProvider } from '@chakra-ui/react'
//  form 관련 코드 import
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  HStack,
  Radio,
  RadioGroup,
  Input,
  Textarea,
  Text,

} from '@chakra-ui/react'

// 타수값 조정하는 코드 import
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from '@chakra-ui/react'


function Signup() {
  return (
    <FormControl>
      <h1>정보 입력</h1>
      <h3>자신을 소개하는 정보를 입력하세요</h3>
      {/* 사진 넣는 공간 */}
      <FormLabel>닉네임</FormLabel>
      <Input type='nickname' />
      {/* 자기소개 */}
      <FormLabel>자기소개</FormLabel>
      <Text mb='8px'>자기소개: </Text>
      <Textarea
        placeholder='본인을 소개하세요'
        size='sm'
      />
      <Input type='selfintro' />
      {/* 타수 정보 입력 */}
      <FormLabel>평균타수</FormLabel>
      <NumberInput defaultValue={72} min={0} max={144} step={1} width={'auto'}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Input type='bestshot' />
      <FormLabel>최고타수</FormLabel>
      <NumberInput defaultValue={72} min={0} max={144} step={1}>
        <NumberInputField />
        <NumberInputStepper>
          <NumberIncrementStepper />
          <NumberDecrementStepper />
        </NumberInputStepper>
      </NumberInput>
      <Input type='avgshot' />
      {/* 선호 티박스 정보 입력 */}
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
