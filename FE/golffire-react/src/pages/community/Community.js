import React from "react";
import MyEditor from "./MyEditor";
import Freeboard from "./FreeBoardList";
import { Button, ButtonGroup } from '@chakra-ui/react'

const Community = () => {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <h1 style={{ fontSize: "50px", padding: "20" }}>
        Community
      </h1>
      <MyEditor />
      <Freeboard/>
    </div>
  );
};

export default Community;
