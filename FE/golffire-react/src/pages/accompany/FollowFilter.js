import React, { useState } from 'react';

function FollowFilter() {
  const [switchValue, setSwitchValue] = useState(false);

  const handleSwitchChange = () => {
    setSwitchValue(!switchValue);
    // 필터 기능을 추가하고 원하는 작업을 수행할 수 있습니다.
  };

  return (
    <label>
      <input
        type="checkbox"
        checked={switchValue}
        onChange={handleSwitchChange}
      />
      팔로잉
    </label>
  );
}

export default FollowFilter;