import React from "react";

interface IconProps {
  name: string;
  size?: number;
  className?: string;
  color?: string;
  onClick?: () => void;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 24,
  className = "",
  color,
  onClick,
}) => {
  const iconStyle = {
    width: size,
    height: size,
    color,
    cursor: onClick ? "pointer" : undefined,
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

    // 사용자 아이콘 (마이페이지)
    user: (
      <svg
        viewBox="0 0 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={iconStyle}
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-420.000000, -2159.000000)"
            fill="currentColor"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M374,2009 C371.794,2009 370,2007.206 370,2005 C370,2002.794 371.794,2001 374,2001 C376.206,2001 378,2002.794 378,2005 C378,2007.206 376.206,2009 374,2009 M377.758,2009.673 C379.124,2008.574 380,2006.89 380,2005 C380,2001.686 377.314,1999 374,1999 C370.686,1999 368,2001.686 368,2005 C368,2006.89 368.876,2008.574 370.242,2009.673 C366.583,2011.048 364,2014.445 364,2019 L366,2019 C366,2014 369.589,2011 374,2011 C378.411,2011 382,2014 382,2019 L384,2019 C384,2014.445 381.417,2011.048 377.758,2009.673"
                id="profile-[#1335]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    ),

    // 하트 아이콘 (찜목록)
    heart: (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M7.24689,2.24696 C5.58979,0.593179 2.90579,0.594203 1.24997,2.25003 C-0.406886,3.90688 -0.406891,6.59317 1.24996,8.25002 L7.99996,15.0001 L14.75,8.25003 C16.4068,6.59317 16.4068,3.90688 14.75,2.25003 C13.0942,0.594273 10.4104,0.593172 8.75327,2.24673 L7.99996,3.00003 L7.24689,2.24696 Z M7.99996,12.1716 L13.3358,6.83581 C14.2116,5.96001 14.2116,4.54005 13.3358,3.66424 C12.46,2.78843 11.04,2.78843 10.1642,3.66424 L7.99996,5.82846 L5.83575,3.66425 C4.95995,2.78844 3.53999,2.78844 2.66418,3.66425 C1.78837,4.54005 1.78837,5.96001 2.66417,6.83581 L7.99996,12.1716 Z"
          ></path>
        </g>
      </svg>
    ),

    // 장바구니 아이콘
    cart: (
      <svg
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 490.875 490.875"
        xmlSpace="preserve"
        style={iconStyle}
      >
        <g>
          <g>
            <g>
              <path
                d="M451.611,178.111h-31.244c3.668,20.593-5.14,42.301-23.979,53.957c-8.325,5.146-17.877,7.869-27.635,7.869 c-18.359,0-35.082-9.312-44.729-24.912c-6.822-11.033-9.033-24.246-6.75-36.915h-143.67c2.273,12.669,0.063,25.881-6.758,36.922 c-9.639,15.592-26.362,24.904-44.721,24.904c-9.765,0-19.316-2.723-27.646-7.869c-18.835-11.656-27.646-33.364-23.974-53.957 H39.263C17.575,178.11,0,195.685,0,217.373c0,21.676,17.575,39.25,39.263,39.25h4.331l28.793,175.116 c3.019,18.319,18.847,31.771,37.423,31.771h271.254c18.575,0,34.403-13.452,37.42-31.771l28.784-175.114h4.343 c21.686,0,39.264-17.576,39.264-39.251C490.875,195.686,473.295,178.111,451.611,178.111z M167.419,418.083 c-1.186,0.174-2.36,0.266-3.523,0.266c-11.459,0-21.503-8.391-23.269-20.069l-16.306-108.682 c-1.931-12.87,6.931-24.861,19.801-26.792c12.886-1.875,24.853,6.931,26.792,19.793l16.31,108.692 C189.155,404.157,180.289,416.151,167.419,418.083z M268.997,394.782c0,13.018-10.541,23.564-23.552,23.564 c-13.016,0-23.552-10.549-23.552-23.564V286.093c0-13.004,10.537-23.553,23.552-23.553c13.011,0,23.552,10.549,23.552,23.553 V394.782z M366.561,289.596l-16.317,108.682c-1.754,11.68-11.797,20.069-23.256,20.069c-1.168,0-2.338-0.091-3.527-0.266 c-12.869-1.931-21.732-13.926-19.801-26.792l16.307-108.692c1.938-12.87,13.857-21.732,26.791-19.794 C359.625,264.734,368.49,276.727,366.561,289.596z"
                fill="currentColor"
              ></path>
              <path
                d="M102.748,218.713c6.037,3.74,12.748,5.521,19.379,5.521c12.341,0,24.407-6.199,31.362-17.464 c6.415-10.375,6.967-22.646,2.739-33.151l69.947-113.048c6.321-10.222,3.16-23.611-7.062-29.944 c-3.566-2.203-7.522-3.263-11.423-3.263c-7.286,0-14.402,3.661-18.528,10.324l-69.924,113.048 c-11.282,0.906-22.02,6.86-28.435,17.232C80.086,185.283,85.449,208.003,102.748,218.713z"
                fill="currentColor"
              ></path>
              <path
                d="M334.652,173.619c-4.228,10.505-3.688,22.776,2.729,33.151c6.967,11.266,19.021,17.464,31.373,17.464 c6.629,0,13.332-1.781,19.379-5.521c17.299-10.71,22.65-33.431,11.937-50.745c-6.398-10.372-17.146-16.326-28.418-17.232 L301.7,37.688c-4.114-6.664-11.231-10.324-18.519-10.324c-3.899,0-7.855,1.06-11.427,3.263 c-10.218,6.333-13.354,19.722-7.058,29.944L334.652,173.619z"
                fill="currentColor"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    ),

    // 로그인 아이콘
    login: (
      <svg
        height="200px"
        width="200px"
        version="1.1"
        id="_x32_"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 512 512"
        xmlSpace="preserve"
        style={iconStyle}
      >
        <g>
          <polygon
            points="237.61,331.547 271.554,365.5 347.11,289.946 381.054,256 347.11,222.054 271.554,146.5 237.61,180.453 289.164,232 0,232 0,280 289.164,280 "
            fill="currentColor"
          ></polygon>
          <polygon
            points="464,0 416,0 192,0 144,0 96,0 96,48 96,80 96,160 144,160 160,160 160,64 448,64 448,448 160,448 160,352 144,352 96,352 96,432 96,464 96,512 144,512 192,512 416,512 464,512 512,512 512,464 512,416 512,96 512,48 512,0 "
            fill="currentColor"
          ></polygon>
        </g>
      </svg>
    ),

    // 왼쪽 화살표 아이콘
    arrowLeft: (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="layer1" transform="rotate(45 1254.793 524.438)">
            <path
              style={{
                fill: "currentColor",
                fillOpacity: 1,
                fillRule: "evenodd",
                stroke: "none",
                strokeWidth: "1px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              d="M15.464 1044.409v-1.997h-9v-9h-2v11z"
              id="path4179"
            ></path>
          </g>
        </g>
      </svg>
    ),

    // 오른쪽 화살표 아이콘
    arrowRight: (
      <svg
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g id="layer1" transform="rotate(45 1254.793 524.438)">
            <path
              style={{
                fill: "currentColor",
                fillOpacity: 1,
                fillRule: "evenodd",
                stroke: "none",
                strokeWidth: "1px",
                strokeLinecap: "butt",
                strokeLinejoin: "miter",
                strokeOpacity: 1,
              }}
              d="M11.532 1048.341H9.536v-9h-9v-2h11z"
              id="path4179"
            ></path>
          </g>
        </g>
      </svg>
    ),

    // 아래쪽 화살표
    arrowDown: (
      <svg
        viewBox="0 -4.5 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-180.000000, -6684.000000)"
              fill="currentColor"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M144,6525.39 L142.594,6524 L133.987,6532.261 L133.069,6531.38 L133.074,6531.385 L125.427,6524.045 L124,6525.414 C126.113,6527.443 132.014,6533.107 133.987,6535 C135.453,6533.594 134.024,6534.965 144,6525.39"
                  id="arrow_down-[#339]"
                ></path>
              </g>
            </g>
          </g>
        </g>
      </svg>
    ),

    // 위쪽 화살표
    arrowUp: (
      <svg
        viewBox="0 -4.5 20 20"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <g
            id="Page-1"
            stroke="none"
            strokeWidth="1"
            fill="none"
            fillRule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-140.000000, -6683.000000)"
              fill="currentColor"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M84,6532.61035 L85.4053672,6534 L94.0131154,6525.73862 L94.9311945,6526.61986 L94.9261501,6526.61502 L102.573446,6533.95545 L104,6532.58614 C101.8864,6530.55736 95.9854722,6524.89321 94.0131154,6523 C92.5472155,6524.40611 93.9757869,6523.03486 84,6532.61035"
                  id="arrow_up-[#340]"
                ></path>
              </g>
            </g>
          </g>
        </g>
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

    // 삭제 아이콘 (원형 X)
    remove: (
      <svg
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <style type="text/css">{`.st0{fill:none;}`}</style>
          <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M16.9,15.5l-1.4,1.4L12,13.4l-3.5,3.5l-1.4-1.4l3.5-3.5 L7.1,8.5l1.4-1.4l3.5,3.5l3.5-3.5l1.4,1.4L13.4,12L16.9,15.5z"></path>
          <rect className="st0" width="24" height="24"></rect>
        </g>
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
      <svg
        fill="currentColor"
        viewBox="0 0 32 32"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path d="M16 0c-8.836 0-16 7.163-16 16s7.163 16 16 16c8.837 0 16.001-7.163 16.001-16s-7.163-16-16.001-16zM16 30.032c-7.72 0-14-6.312-14-14.032s6.28-14 14-14 14.001 6.28 14.001 14-6.281 14.032-14.001 14.032zM14.53 25.015h2.516v-2.539h-2.516zM15.97 6.985c-1.465 0-2.672 0.395-3.62 1.184s-1.409 2.37-1.386 3.68l0.037 0.073h2.295c0-0.781 0.261-1.904 0.781-2.308s1.152-0.604 1.893-0.604c0.854 0 1.511 0.232 1.971 0.696s0.689 1.127 0.689 1.989c0 0.725-0.17 1.343-0.512 1.855-0.343 0.512-0.916 1.245-1.721 2.198-0.831 0.749-1.344 1.351-1.538 1.806s-0.297 1.274-0.305 2.454h2.405c0-0.74 0.047-1.285 0.14-1.636s0.36-0.744 0.799-1.184c0.945-0.911 1.703-1.802 2.277-2.674 0.573-0.87 0.86-1.831 0.86-2.881 0-1.465-0.443-2.607-1.331-3.424s-2.134-1.226-3.736-1.226z"></path>
        </g>
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

    // 체크박스 아이콘 (비체크 상태)
    checkbox: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <rect
          x="1"
          y="1"
          width="28"
          height="28"
          rx="4"
          ry="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),

    // 체크박스 아이콘 (체크 상태)
    checkboxChecked: (
      <svg
        width="30"
        height="30"
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <rect
          x="1"
          y="1"
          width="28"
          height="28"
          rx="4"
          ry="4"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M6 15L12 21L24 9"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),

    // Plus Circle 아이콘
    plusCircle: (
      <svg
        fill="currentColor"
        version="1.1"
        id="Layer_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 24 24"
        xmlSpace="preserve"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <style type="text/css">{`.st0{fill:none;}`}</style>
          <path d="M12,2C6.5,2,2,6.5,2,12s4.5,10,10,10s10-4.5,10-10S17.5,2,12,2z M13,17.9h-2V13H6.1v-2H11V6.1h2V11h4.9v2H13V17.9z"></path>
          <rect className="st0" width="24" height="24"></rect>
        </g>
      </svg>
    ),

    // Minus Circle 아이콘
    minusCircle: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM18 11H6V13H18V11Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    ),

    // Equal Circle 아이콘
    equalCircle: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
        <g
          id="SVGRepo_tracerCarrier"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></g>
        <g id="SVGRepo_iconCarrier">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM6 11H18V9H6V11ZM6 15H18V13H6V15Z"
            fill="currentColor"
          ></path>
        </g>
      </svg>
    ),

    // 라디오 버튼 (비선택)
    radio: (
      <svg
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <circle
          cx="15"
          cy="15"
          r="13"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
    ),

    // 라디오 버튼 (선택)
    radioSelected: (
      <svg
        viewBox="0 0 30 30"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={iconStyle}
      >
        <circle
          cx="15"
          cy="15"
          r="13"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
        <circle cx="15" cy="15" r="9" fill="#0b87f0" />
      </svg>
    ),
  };

  return (
    <span
      className={className}
      onClick={onClick}
      style={onClick ? { cursor: "pointer" } : undefined}
    >
      {icons[name] || null}
    </span>
  );
};

export default Icon;
