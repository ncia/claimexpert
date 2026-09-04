import React from 'react';

export const KAKAO_CHAT_URL = 'https://open.kakao.com/o/swMNtsKi';
export const KAKAO_APP_SCHEME = 'kakaoopen://join?l=swMNtsKi&r=EW';

export const handleKakaoConsultation = (e?: React.MouseEvent) => {
  if (e) {
    e.preventDefault();
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

  if (isMobile) {
    // 모바일: 스마트폰 카카오톡 앱 즉시 다이렉트 실행
    window.location.href = KAKAO_APP_SCHEME;
    // 앱 호출 실패 또는 앱 미설치 환경 대비 fallback
    setTimeout(() => {
      window.location.href = KAKAO_CHAT_URL;
    }, 700);
  } else {
    // PC: 카카오 웹 안내 페이지 새 창으로 열기
    window.open(KAKAO_CHAT_URL, '_blank', 'noopener,noreferrer');
  }
};
