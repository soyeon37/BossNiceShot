import React from "react";
import MyEditor from "./MyEditor";

import { Button, ButtonGroup } from '@chakra-ui/react'

const Community = () => {
  return (
    <div style={{ display:"flex", flexDirection:"column", alignItems:"center"}}>
      <h1 style={{ fontSize: "50px", padding: "20" }}>
        Community
      </h1>
      <MyEditor />
      {/* 버튼을 만들었는데 div tag가 겹칩니다. */}

      <div style={{  display:"flex", justifyContent:"space-between", position:"static", padding:"20", width:"200px", alignContent:"center"}}>
        <Button>취소</Button>
        <Button>등록하기</Button>
      </div>
    </div>
  );
};

export default Community;
