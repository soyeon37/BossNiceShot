import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useCookies } from "react-cookie";

// Navigation Bar
import Navbar from "./setup/routes-manager/Navbar";
import Main from "./pages/main/Main";
import Solution from "./pages/solution/Solution";
import StudyList from "./pages/study/StudyList";
import Golffield from "./pages/golffield/Golffield";
import Accompany from "./pages/accompany/Accompany";
import Community from "./pages/community/Community";

// Study
import CreateCRoom from './pages/study/CreateCRoom';
import CreateLRoom from './pages/study/CreateLRoom';
import CoachingRoom from './pages/study/CoachingRoom';

//accompany
import CreateAccompany from "./pages/accompany/CreateAccompany";

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
import FindPassword from "./pages/login/FindPassword";
import Login from "./pages/login/Login";

// Profile
import Profile from "./pages/mypage/Profile";
import EditProfile from "./pages/mypage/EditProfile";
import EditPassword from "./pages/mypage/EditPassword";
import MyAccompany from "./pages/mypage/MyAccompany";
import MyChat from "./pages/mypage/MyChat";
import MyFollow from "./pages/mypage/MyFollow";
import Signout from "./pages/mypage/Signout";

// Error
import ErrorPage from "./setup/error-manager/ErrorPage";

// Redux
import { useSelector } from "react-redux";

import { ChakraProvider } from "@chakra-ui/react";
import "./App.css";
import "../src/assets/css/common.css";

function App() {
  // Redux
  // 사용자 정보(userId)로 로그인 여부 판단
  const userId = useSelector((state) => state.userInfoFeatrue.userId);
  const userNickname = useSelector((state) => state.userInfoFeatrue.userNickname);

  // cookie의 user 정보 확인
  const [cookies] = useCookies(["user"]);

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

              {/* 로그인 */}
              <Route path="/" element={<Main />} />
              <Route path="/signup/" element={<Signup />} />
              <Route path="/findpassword/" element={<FindPassword />} />
              <Route path="/login/" element={<Login />} />
              <Route path="/golffield/" element={<Golffield />} />

              {/* Solution */}
              <Route path="/solution/" element={userId ? <Solution /> : <Navigate to="/Login" />} />

              {/* Study */}
              <Route path="/studylist/" element={<StudyList />} />
              <Route path="/createcroom/" element={userId ? <CreateCRoom /> : <Navigate to="/Login" />} />
              <Route path="/createlroom/" element={userId ? <CreateLRoom /> : <Navigate to="/Login" />} />
              <Route path="/coachingroom/" element={userId ? <CoachingRoom /> : <Navigate to="/Login" />} />

              {/* Accompany */}
              <Route path="/accompany/" element={<Accompany />} />
              <Route path="/createaccompany/" element={userId ? <CreateAccompany /> : <Navigate to="/Login" />} />

              {/* Community */}
              <Route path="/community" element={<Community />} />
              <Route path="/myeditor/" element={userId ? <MyEditor /> : <Navigate to="/Login" />} />
              <Route path="/freeboardlist/" element={userId ? <FreeBoardList /> : <Navigate to="/Login" />} />
              <Route path="/inquirylist/" element={userId ? <InquiryList /> : <Navigate to="/Login" />} />
              <Route path="/noticelist/" element={userId ? <NoticeList /> : <Navigate to="/Login" />} />
              {/* <Route path="/freeboard/:idx" element={<FreeBoardDetail />} /> */}

              {/* Profile */}
              <Route path="/mypage/" element={userId ? <Profile /> : <Navigate to="/Login" />} />
              <Route path="/mypage/editprofile/" element={userId ? <EditProfile /> : <Navigate to="/Login" />} />
              <Route path="/mypage/editpassword/" element={userId ? <EditPassword /> : <Navigate to="/Login" />} />
              <Route path="/mypage/myaccompany" element={userId ? <MyAccompany /> : <Navigate to="/Login" />} />
              <Route path="/mypage/mychat" element={userId ? <MyChat /> : <Navigate to="/Login" />} />
              <Route path="/mypage/myfollow" element={userId ? <MyFollow /> : <Navigate to="/Login" />} />
              <Route path="/mypage/signout/" element={userId ? <Signout /> : <Navigate to="/Login" />} />

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
