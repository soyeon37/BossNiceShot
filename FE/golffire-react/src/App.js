import "./App.css";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";

// Navigation Bar
import Navbar from "./setup/routes-manager/Navbar";
import Main from "./pages/main/Main";
import Solution from "./pages/solution/Solution";
import StudyList from "./pages/study/StudyList";
import Golffield from "./pages/golffield/Golffield";
import Accompany from "./pages/accompany/Accompany";
import Community from "./pages/community/Community";

// Community
import FreeBoardList from "./pages/community/FreeBoardList";
import InquiryList from "./pages/community/InquiryList";
import NoticeList from "./pages/community/NoticeList";
import MyEditor from "./pages/community/MyEditor";
import FreeBoardDetail from "./pages/community/FreeBoardDetail";

// Sign-up & Log-in & Sign-out
import KakaoLogin from "./setup/user-auth/KakaoLogin";
import KakaoSignUp from "./setup/user-auth/KakaoSignUp";
import Signup from "./pages/signup/Signup";
import SignupEmail1 from "./pages/signup/SignupEmail1";
import SignupEmail2 from "./pages/signup/SignupEmail2";
import SignupInfo from "./pages/signup/SignupInfo";
import FindPassword from "./pages/login/FindPassword";
import Login from "./pages/login/Login";
import Signout from "./pages/mypage/Signout";

// Profile
import Profile from "./pages/mypage/Profile";
import EditProfile from "./pages/mypage/EditProfile";
import EditPassword from "./pages/mypage/EditPassword";

// Error
import ErrorPage from "./setup/error-manager/ErrorPage";

import { ChakraProvider } from "@chakra-ui/react";

function App() {
  // cookie의 user 정보 확인
  const [cookies] = useCookies(["user"]);
  // 로그인 여부를 나타내는 변수, false로 초기화
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 여부를 확인하여 true로 바꾸는 함수
  useEffect(() => {
    // 로그인 정보가 있다면 true, 없다면 false로 만드는 코드
    setIsLoggedIn(!!cookies.user);

    // 추후 서버로 token 정보를 보내 유효한지 확인한 뒤 true로 만들기
  }, [cookies]);

  return (
    <ChakraProvider>
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <div style={{ flexGrow: 1, overflow: "auto" }}>
            <Routes>
              {/* Kakao Auth */}
              <Route path="/Auth/Kakao/Signup/Callback" element={<KakaoSignUp />} />
              <Route path="/Auth/Kakao/Login/Callback" element={<KakaoLogin />} />

              {/* 항상 route 가능 */}
              <Route path="/" element={<Main />} />
              <Route path="/signup/" element={<Signup />} />
              <Route path="/signup/email1" element={<SignupEmail1 />} />
              <Route path="/signup/email2" element={<SignupEmail2 />} />
              <Route path="/signup/info" element={<SignupInfo />} />
              <Route path="/findpassword/" element={<FindPassword />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/golffield/" element={<Golffield />} />

              {/* 로그인 후 route 가능 */}
              {/* <Route
                path="/solution/"
                element={isLoggedIn ? <Solution /> : <Navigate to="/Login" />}
              /> */}

              <Route path="/solution/" element={<Solution />} />

              <Route path="/studylist/" element={<StudyList />} />

              <Route path="/accompany/" element={<Accompany />} />

              {/* Community */}
              <Route path="/community" element={<Community />} />
              <Route path="/myeditor" element={<MyEditor />} />
              <Route path="/freeboardlist" element={<FreeBoardList />} />
              <Route path="/inquirylist" element={<InquiryList />} />
              <Route path="/noticelist" element={<NoticeList />} />
              {/* <Route path="/freeboard/:idx" element={<FreeBoardDetail />} /> */}

              {/* Profile */}
              <Route path="/mypage/" element={<Profile />} />
              <Route path="/mypage/editprofile/" element={<EditProfile />} />
              <Route path="/mypage/editpassword/" element={<EditPassword />} />
              <Route path="/mypage/signout/" element={<Signout />} />

              {/* Error */}
              <Route path="/error" element={<ErrorPage />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
