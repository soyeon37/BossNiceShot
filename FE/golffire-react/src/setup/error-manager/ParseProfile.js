// 변환 가능 여부 반환
function getAble(profile) {
    if (typeof profile === 'string' && profile.length >= 20) {
        let profileValues = null;
        if (profile) profileValues = profile.toString().split(' ');
        if (profileValues[0] && profileValues[1]) return true;
        else return false;
    } else {
        return false;
    }
}

// 프로필 이미지 반환
function getImage(profile) {
    if (typeof profile === 'string' && profile.length >= 20) {
        let profileValues = null;
        if (profile) profileValues = profile.toString().split(' ');
        if (profileValues[0] && profileValues[1])
            return profileValues[0];
        else
            return "green_suncap_tiger";
    }
    return "green_suncap_tiger";
}

// 프로필 배경 반환
function getBackground(profile) {
    if (typeof profile === 'string' && profile.length >= 20) {
        let profileValues = null;
        if (profile) profileValues = profile.toString().split(' ');
        if (profileValues[0] && profileValues[1])
            return profileValues[1];
        else
            return "white";
    }
    return "white";
}


export { getAble, getImage, getBackground };
