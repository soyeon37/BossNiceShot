import React from "react";
import { Link } from "react-router-dom";
function Footer() {

  return (
    <footer>
      <div className="inner">
    <ul className="menu">
      <li>김령은</li>
      <li>김성규</li>
      <li>한라연</li>
      <li>함소연</li>
      <li>김재아</li>
      <li>문요환</li>
    </ul>
    
    <div className="info">
      <span>개발팀: 골프파이어</span>
      <span>이메일: leongeun@naver.com</span>
      <span>TEL : 010) 1234-1234 / FAX : 02) 1234-1234</span>
      <span>개인정보 책임자 : 👽 함소연 👽</span>
    </div>

    <div className="github-comment">
      <button className="github"><Link to='https://lab.ssafy.com/s09-webmobile1-sub2/S09P12A309'>GitLab</Link></button>
      <span className="comment">본 사이트의 콘텐츠는 삼성 청년소프트웨어 아카데미와 함께합니다.</span>
    </div>
    <p className="copyright">
      &copy; <span className="this-year"></span> Bossniceshot company. All Rights Reseved.
    </p>

  </div>
    </footer>
  );
}

export default Footer;
