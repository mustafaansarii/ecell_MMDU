import React from 'react';

const LoadingAnimation = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#000',
      color: '#fff',
    }}>
      <div className="flex flex-col items-center">
        <div className="flex items-baseline">
          <div className="logo-text text-blue-600 font-bold text-4xl">E </div>
          <div className="logo-text text-white font-bold text-4xl -ml-1">&nbsp;CELL</div>
        </div>
        <div className="divider-container flex items-center mt-[-0.4rem]">
          <div className="w-6 h-[1px] bg-white"></div>
          <span className="university-text mx-1 text-white text-sm font-semibold tracking-wide">
            MMDU
          </span>
          <div className="w-6 h-[1px] bg-white"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingAnimation; 