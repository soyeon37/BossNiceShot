import { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

// Navigation Bar
import Navbar from "./setup/routes-manager/Navbar";
import Main from "./pages/main/Main";
import Solution from "./pages/solution/Solution";
import Solution_HalfSwing from "./pages/solution/Solution_HalfSwing";
import Solution_FullSwing from "./pages/solution/Solution_FullSwing";
import StudyList from "./pages/study/StudyList";
import Golffield from "./pages/golffield/Golffield";
import Accompany from "./pages/accompany/Accompany";
import Community from "./pages/community/Community";

// Study
import CreateCRoom from './pages/study/CreateCRoom';
import CreateLRoom from './pages/study/CreateLRoom';
import CoachingRoom from './pages/study/CoachingRoom';
import LearningRoom from './pages/study/LearningRoom';

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
import "../src/assets/css/user.css";
import "../src/assets/css/common.css";
import "../src/assets/css/list-container.css";
import "../src/assets/css/create-container.css";

function App() {
  // Redux
  // 사용자 정보(userId)로 로그인 여부 판단
  const userId = useSelector((state) => state.userInfoFeature.userId);
  const userNickname = useSelector((state) => state.userInfoFeature.userNickname);

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
              <Route path="/solution/" element={<Solution />} />
              <Route path="/solution/halfswing/" element={<Solution_HalfSwing />} />
              <Route path="/solution/fullswing/" element={<Solution_FullSwing />} />

              {/* Study */}
              <Route path="/studylist/" element={userId ? <StudyList /> : <Navigate to="/Login" />} />
              <Route path="/createcroom/" element={userId ? <CreateCRoom /> : <Navigate to="/Login" />} />
              <Route path="/createlroom/" element={userId ? <CreateLRoom /> : <Navigate to="/Login" />} />
              <Route path="/coachingroom/" element={userId ? <CoachingRoom /> : <Navigate to="/Login" />} />
              <Route path="/learningroom/" element={userId ? <LearningRoom /> : <Navigate to="/Login" />} />

              {/* Accompany */}
              <Route path="/accompany/" element={userId ? <Accompany /> : <Navigate to="/Login" />} />
              <Route path="/createaccompany/" element={userId ? <CreateAccompany /> : <Navigate to="/Login" />} />

              {/* Community */}
              <Route path="/community" element={<Community />} />
              <Route path="/myeditor/" element={userId ? <MyEditor /> : <Navigate to="/Login" />} />
              <Route path="/freeboardlist/" element={userId ? <FreeBoardList /> : <Navigate to="/Login" />} />
              <Route path="/inquirylist/" element={userId ? <InquiryList /> : <Navigate to="/Login" />} />
              <Route path="/noticelist/" element={userId ? <NoticeList /> : <Navigate to="/Login" />} />
              {/* <Route path="/freeboard/:idx" element={<FreeBoardDetail />} /> */}

              {/* Profile */}
              <Route path="/mypage/info" element={userId ? <Profile /> : <Navigate to="/Login" />} />
              <Route path="/mypage/info/editprofile/" element={userId ? <EditProfile /> : <Navigate to="/Login" />} />
              <Route path="/mypage/info/editpassword/" element={userId ? <EditPassword /> : <Navigate to="/Login" />} />
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