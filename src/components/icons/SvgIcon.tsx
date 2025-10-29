import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  color,
}) => {
  const iconStyle = {
    width: size,
    height: size,
    color,
  };

  const icons: { [key: string]: React.JSX.Element } = {
    // 검색 아이콘
    search: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
    ),

    // 사용자 아이콘
    user: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
      </svg>
    ),

    // 하트 아이콘 (찜목록)
    heart: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    ),

    // 장바구니 아이콘
    cart: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
        />
      </svg>
    ),

    // 로그인 아이콘
    login: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
        />
      </svg>
    ),

    // 왼쪽 화살표 아이콘 (배너)
    arrowLeft: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 19l-7-7 7-7"
        />
      </svg>
    ),

    // 오른쪽 화살표 아이콘 (배너)
    arrowRight: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    ),

    // 아래쪽 화살표 (arrowRight를 90도 회전)
    arrowDown: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ),

    // Google 아이콘
    google: (
      <svg viewBox="0 0 24 24" style={iconStyle}>
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#000000"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#000000"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          fill="#000000"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          fill="#000000"
        />
      </svg>
    ),

    // 이미지 아이콘
    image: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    ),

    // 진행 단계 구분자
    progressDivider: (
      <svg viewBox="0 0 12 20" fill="none" style={iconStyle}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.0004673 19.3708L10.1857 10L0.0004673 0.650833L0.439083 0L11.3379 10L0.431997 20L0.0004673 19.3708Z"
          fill="currentColor"
        />
      </svg>
    ),

    // 체크 아이콘
    check: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 12 8"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M1 4L4 7L11 1"
        />
      </svg>
    ),

    // X 아이콘
    close: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    ),

    // 플러스 아이콘
    plus: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 6v6m0 0v6m0-6h6m-6 0H6"
        />
      </svg>
    ),

    // 마이너스 아이콘
    minus: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M18 12H6"
        />
      </svg>
    ),

    // 별 아이콘
    star: (
      <svg
        fill="currentColor"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
        />
      </svg>
    ),

    // 홈 아이콘
    home: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
      </svg>
    ),

    // 설정 아이콘
    settings: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),

    // 주문 아이콘
    order: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
        />
      </svg>
    ),

    // 돈 아이콘
    money: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
        />
      </svg>
    ),

    // 배송 아이콘
    truck: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 17a2 2 0 100 4 2 2 0 000-4zM8 17V7a2 2 0 012-2h4.5L19 7.5V17M8 17H6a2 2 0 01-2-2V7a2 2 0 012-2h2"
        />
      </svg>
    ),

    // 쿠폰 아이콘
    coupon: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),

    // 물음표 아이콘
    question: (
      <svg viewBox="0 0 30 30" fill="none" style={iconStyle}>
        <circle
          cx="15"
          cy="15"
          r="11.25"
          stroke="currentColor"
          strokeWidth="2"
        />
        <circle
          cx="15"
          cy="22.5"
          r="0.625"
          fill="currentColor"
          stroke="currentColor"
        />
      </svg>
    ),

    // 드롭다운 화살표 (아래)
    dropdownArrow: (
      <svg viewBox="0 0 16 10" fill="none" style={iconStyle}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.503332 -0.000114441L8 8.14809L15.4793 -0.000114441L16 0.350779L8 9.06982L0 0.34511L0.503332 -0.000114441Z"
          fill="currentColor"
        />
      </svg>
    ),

    // 오른쪽 화살표 (작은)
    arrowRightSmall: (
      <svg viewBox="0 0 10 16" fill="none" style={iconStyle}>
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.00037384 15.4967L8.14858 8L0.00037384 0.520667L0.351267 0L9.07031 8L0.345598 16L0.00037384 15.4967Z"
          fill="currentColor"
        />
      </svg>
    ),

    // Facebook 아이콘
    facebook: (
      <svg viewBox="0 0 11 25" fill="none" style={iconStyle}>
        <path
          d="M7.07583 24.1504V13.442H10.3017L10.7812 9.24931H7.07583V6.57873C7.07583 5.36888 7.37683 4.54053 8.92733 4.54053H10.892V0.802505C9.93608 0.687778 8.97522 0.632383 8.01383 0.636574C5.1625 0.636574 3.20483 2.58594 3.20483 6.16456V9.24147H0V13.4342H3.21183V24.1504H7.07583Z"
          fill="currentColor"
        />
      </svg>
    ),

    // Kakao 아이콘
    kakao: (
      <svg viewBox="0 0 28 32" fill="none" style={iconStyle}>
        <path
          d="M6.36642 24.1089C3.91759 22.1096 2.33325 19.0909 2.33325 15.7871C2.33325 9.7085 7.55409 4.77271 13.9999 4.77271C20.4458 4.77271 25.6666 9.7085 25.6666 15.7871C25.6666 21.8644 20.4458 26.8002 13.9999 26.8002C12.7081 26.809 11.422 26.6031 10.1826 26.189C10.0753 26.1492 9.93059 26.1492 9.82325 26.1492C9.60742 26.1492 9.39159 26.2288 9.21075 26.3521L6.65459 28.0238C6.58896 28.0693 6.5152 28.0973 6.43875 28.106C6.33414 28.1054 6.23395 28.058 6.15976 27.9742C6.08556 27.8904 6.04331 27.7768 6.04209 27.6579C6.04209 27.5346 6.07709 27.4538 6.11442 27.3305C6.14942 27.2907 6.47375 25.9437 6.65459 25.1284C6.65459 25.0462 6.68959 24.9242 6.68959 24.842C6.68959 24.5159 6.58225 24.2719 6.36642 24.1089ZM10.1114 13.935C10.9479 13.935 11.6106 13.182 11.6106 12.2314C11.6106 11.2795 10.9479 10.5265 10.1114 10.5265C9.27375 10.5265 8.61225 11.2795 8.61225 12.2314C8.61225 13.182 9.27375 13.935 10.1114 13.935ZM17.8884 13.935C18.7261 13.935 19.3876 13.182 19.3876 12.2314C19.3876 11.2795 18.7261 10.5265 17.8884 10.5265C17.0519 10.5265 16.3893 11.2795 16.3893 12.2314C16.3893 13.182 17.0519 13.935 17.8884 13.935Z"
          fill="currentColor"
        />
      </svg>
    ),

    // Google 아이콘 (소셜 로그인용)
    googleSocial: (
      <svg viewBox="0 0 25 28" fill="none" style={iconStyle}>
        <g clipPath="url(#clip0_google)">
          <path
            d="M24.9868 14.2619C24.9868 13.1148 24.9018 12.2777 24.7177 11.4095H12.749V16.5872H19.7744C19.6328 17.8739 18.8679 19.8117 17.1682 21.1138L17.1444 21.2871L20.9286 24.4957L21.1908 24.5243C23.5987 22.0905 24.9868 18.5095 24.9868 14.2619"
            fill="#4285F4"
          />
          <path
            d="M12.7491 27.9038C16.191 27.9038 19.0805 26.6636 21.191 24.5244L17.1683 21.1138C16.0919 21.9354 14.6471 22.509 12.7491 22.509C9.37808 22.509 6.51693 20.0753 5.49701 16.7113L5.34751 16.7252L1.41254 20.0582L1.36108 20.2147C3.45737 24.7723 7.7633 27.9038 12.7491 27.9038Z"
            fill="#34A853"
          />
          <path
            d="M5.49685 16.7113C5.22773 15.8432 5.07199 14.913 5.07199 13.9519C5.07199 12.9907 5.22773 12.0606 5.48269 11.1925L5.47556 11.0076L1.4913 7.62109L1.36094 7.68896C0.49697 9.58024 0.0012207 11.7041 0.0012207 13.9519C0.0012207 16.1997 0.49697 18.3234 1.36094 20.2147L5.49685 16.7113"
            fill="#FBBC05"
          />
          <path
            d="M12.7491 5.3947C15.1428 5.3947 16.7574 6.52635 17.6781 7.47205L21.2758 3.6275C19.0663 1.37969 16.1909 0 12.7491 0C7.76325 0 3.45735 3.1314 1.36108 7.68899L5.48283 11.1925C6.5169 7.82857 9.37803 5.3947 12.7491 5.3947"
            fill="#EB4335"
          />
        </g>
        <defs>
          <clipPath id="clip0_google">
            <rect width="25" height="28" fill="white" />
          </clipPath>
        </defs>
      </svg>
    ),

    // 드롭다운 아이콘
    dropdown: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 9l-7 7-7-7"
        />
      </svg>
    ),

    // 다운로드 아이콘 (쿠폰 받기용)
    download: (
      <svg
        fill="none"
        stroke="currentColor"
        viewBox="0 0 30 30"
        style={iconStyle}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={0.1}
          d="M15 17.5L14.2929 18.2071L15 18.9142L15.7071 18.2071L15 17.5ZM16 6.25C16 5.69772 15.5523 5.25 15 5.25C14.4477 5.25 14 5.69772 14 6.25L15 6.25L16 6.25ZM8.75 11.25L8.04289 11.9571L14.2929 18.2071L15 17.5L15.7071 16.7929L9.45711 10.5429L8.75 11.25ZM15 17.5L15.7071 18.2071L21.9571 11.9571L21.25 11.25L20.5429 10.5429L14.2929 16.7929L15 17.5ZM15 17.5L16 17.5L16 6.25L15 6.25L14 6.25L14 17.5L15 17.5Z"
          fill="currentColor"
        />
        <path
          d="M6.25 20L6.25 21.25C6.25 22.6307 7.36929 23.75 8.75 23.75L21.25 23.75C22.6307 23.75 23.75 22.6307 23.75 21.25V20"
          stroke="currentColor"
          strokeWidth={2}
        />
      </svg>
    ),
  };

  return <span className={className}>{icons[name] || null}</span>;
};

export default Icon;
