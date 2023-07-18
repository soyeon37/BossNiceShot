import React from "react";
import "./full-banner.css";

function MainBanner() {
  return (
    <div id="Banner" style={{ height: "500px", backgroundColor: "skyblue", position: "relative" }}>
      <img src="your_banner_image_url" alt="Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <h1 style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", fontSize: "50px", backgroundColor: "red", padding: "20px" }}>
        Banner의 공간
        <br />
      </h1>
    </div>
  );
}

export default MainBanner;
