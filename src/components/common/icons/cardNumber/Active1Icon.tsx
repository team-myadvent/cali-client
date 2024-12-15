interface IconProps extends React.SVGProps<SVGSVGElement> {
  width?: number | string;
  height?: number | string;
  variant?: "default" | "detail";
}

/**
 * 이 컴포넌트는 props로 width, height를 받아 다양한 크기로 렌더링할 수 있습니다.
 * 예를 들어, width와 height를 50, 54로 주면 첫 번째 SVG 크기처럼,
 * width와 height를 76, 76으로 주면 두 번째 SVG 크기처럼 나타낼 수 있습니다.
 * viewBox를 고정하고 SVG 자체의 width, height를 조정하면 내부 그래픽이 비율에 맞게 스케일됩니다.
 */
const Active1Icon = ({
  variant = "default",
  width,
  height,
  ...props
}: IconProps) => {
  const finalWidth = width ?? (variant === "detail" ? 76 : 50);
  const finalHeight = height ?? (variant === "detail" ? 76 : 54);

  return (
    <svg
      width={finalWidth}
      height={finalHeight}
      viewBox="0 0 76 76"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-labelledby="scalableIconTitle"
      role="img"
      {...props}
    >
      <g filter="url(#filter0_d_270_661)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M61.56 3C62.0804 3 65.5882 3.05231 66.0784 3.15186C66.7774 3.29379 67.0523 4.07102 67.0404 4.76991C67.0401 4.78705 67.04 4.80422 67.04 4.82143C67.04 6.49801 68.4279 7.85714 70.14 7.85714C70.1778 7.85714 70.2154 7.85648 70.2528 7.85517C70.9335 7.83133 71.685 8.07741 71.8298 8.72916C71.9558 9.29621 71.5286 9.81323 71.0211 10.113C70.1216 10.6443 69.52 11.6105 69.52 12.7143C69.52 13.8328 70.1377 14.81 71.0573 15.3366C71.5664 15.6282 72 16.1043 72 16.6818V18.461C72 19.0385 71.5664 19.5147 71.0573 19.8062C70.1377 20.3328 69.52 21.3101 69.52 22.4286C69.52 23.5471 70.1377 24.5243 71.0573 25.0509C71.5664 25.3425 72 25.8186 72 26.3961V28.1753C72 28.7528 71.5664 29.229 71.0573 29.5205C70.1377 30.0471 69.52 31.0243 69.52 32.1429C69.52 33.2614 70.1377 34.2386 71.0573 34.7652C71.5664 35.0568 72 35.5329 72 36.1104V37.8896C72 38.4671 71.5664 38.9432 71.0573 39.2348C70.1377 39.7614 69.52 40.7386 69.52 41.8571C69.52 42.9756 70.1377 43.9529 71.0573 44.4795C71.5664 44.771 72 45.2472 72 45.8247V47.6039C72 48.1814 71.5664 48.6575 71.0573 48.9491C70.1377 49.4757 69.52 50.4529 69.52 51.5714C69.52 52.6899 70.1377 53.6672 71.0573 54.1938C71.5664 54.4853 72 54.9615 72 55.539V57.3182C72 57.8957 71.5664 58.3718 71.0573 58.6634C70.1377 59.19 69.52 60.1672 69.52 61.2857C69.52 62.3895 70.1216 63.3557 71.0211 63.887C71.5286 64.1868 71.9558 64.7038 71.8298 65.2708C71.685 65.9226 70.9335 66.1687 70.2528 66.1448C70.2154 66.1435 70.1778 66.1429 70.14 66.1429C68.4279 66.1429 67.04 67.502 67.04 69.1786C67.04 69.1958 67.0401 69.213 67.0404 69.2301C67.0523 69.929 66.7774 70.7062 66.0784 70.8481C65.5882 70.9477 62.0804 71 61.56 71C61.1632 71 60.8321 70.7199 60.6696 70.3654C60.185 69.3079 59.1003 68.5714 57.84 68.5714C56.6978 68.5714 55.6999 69.1763 55.1621 70.0769C54.8644 70.5754 54.3782 71 53.7884 71H51.9716C51.3818 71 50.8956 70.5754 50.5979 70.0769C50.0601 69.1763 49.0622 68.5714 47.92 68.5714C46.7778 68.5714 45.7799 69.1763 45.2421 70.0769C44.9444 70.5754 44.4582 71 43.8684 71H42.0516C41.4618 71 40.9756 70.5754 40.6779 70.0769C40.1401 69.1763 39.1422 68.5714 38 68.5714C36.8578 68.5714 35.8599 69.1763 35.3221 70.0769C35.0244 70.5754 34.5382 71 33.9484 71H32.1316C31.5418 71 31.0556 70.5754 30.7579 70.0769C30.2201 69.1763 29.2222 68.5714 28.08 68.5714C26.9378 68.5714 25.9399 69.1763 25.4021 70.0769C25.1044 70.5754 24.6182 71 24.0284 71H22.2116C21.6218 71 21.1356 70.5754 20.8379 70.0769C20.3001 69.1763 19.3022 68.5714 18.16 68.5714C16.8997 68.5714 15.815 69.3079 15.3304 70.3654C15.1679 70.7199 14.8368 71 14.44 71C13.9196 71 10.4118 70.9477 9.92155 70.8481C9.22263 70.7062 8.94769 69.929 8.95956 69.2301C8.95985 69.213 8.96 69.1958 8.96 69.1786C8.96 67.502 7.57208 66.1429 5.86 66.1429C5.82224 66.1429 5.78463 66.1435 5.74719 66.1448C5.0665 66.1687 4.31502 65.9226 4.17018 65.2708C4.04416 64.7038 4.47141 64.1868 4.97885 63.887C5.87844 63.3557 6.48 62.3895 6.48 61.2857C6.48 60.1672 5.86228 59.19 4.94269 58.6634C4.43361 58.3718 4 57.8957 4 57.3182V55.539C4 54.9615 4.43361 54.4853 4.94269 54.1938C5.86228 53.6672 6.48 52.6899 6.48 51.5714C6.48 50.4529 5.86228 49.4757 4.94269 48.9491C4.43361 48.6575 4 48.1814 4 47.6039V45.8247C4 45.2472 4.43361 44.771 4.94269 44.4795C5.86228 43.9529 6.48 42.9756 6.48 41.8571C6.48 40.7386 5.86228 39.7614 4.94269 39.2348C4.43361 38.9432 4 38.4671 4 37.8896V36.1104C4 35.5329 4.43361 35.0568 4.94269 34.7652C5.86228 34.2386 6.48 33.2614 6.48 32.1429C6.48 31.0244 5.86228 30.0471 4.94269 29.5205C4.43361 29.229 4 28.7528 4 28.1753V26.3961C4 25.8186 4.43361 25.3425 4.94269 25.0509C5.86228 24.5243 6.48 23.5471 6.48 22.4286C6.48 21.3101 5.86228 20.3328 4.94269 19.8062C4.43361 19.5147 4 19.0385 4 18.461V16.6818C4 16.1043 4.43361 15.6282 4.94269 15.3366C5.86228 14.81 6.48 13.8328 6.48 12.7143C6.48 11.6105 5.87844 10.6443 4.97886 10.113C4.47141 9.81323 4.04416 9.29621 4.17018 8.72916C4.31502 8.07741 5.06649 7.83133 5.74719 7.85517C5.78463 7.85648 5.82223 7.85714 5.86 7.85714C7.57208 7.85714 8.96 6.49801 8.96 4.82143C8.96 4.80422 8.95985 4.78705 8.95956 4.76991C8.94769 4.07102 9.22263 3.29379 9.92155 3.15186C10.4118 3.05231 13.9196 3 14.44 3C14.8368 3 15.1679 3.28006 15.3304 3.63458C15.815 4.69206 16.8997 5.42857 18.16 5.42857C19.3022 5.42857 20.3001 4.82366 20.8379 3.92314C21.1356 3.42462 21.6218 3 22.2116 3H24.0284C24.6182 3 25.1044 3.42462 25.4021 3.92314C25.9399 4.82366 26.9378 5.42857 28.08 5.42857C29.2222 5.42857 30.2201 4.82366 30.7579 3.92314C31.0556 3.42462 31.5418 3 32.1316 3H33.9484C34.5382 3 35.0244 3.42462 35.3221 3.92314C35.8599 4.82366 36.8578 5.42857 38 5.42857C39.1422 5.42857 40.1401 4.82366 40.6779 3.92314C40.9756 3.42462 41.4618 3 42.0516 3H43.8684C44.4582 3 44.9444 3.42462 45.2421 3.92314C45.7799 4.82366 46.7778 5.42857 47.92 5.42857C49.0622 5.42857 50.0601 4.82366 50.5979 3.92314C50.8956 3.42462 51.3818 3 51.9716 3H53.7884C54.3782 3 54.8644 3.42462 55.1621 3.92314C55.6999 4.82366 56.6978 5.42857 57.84 5.42857C59.1003 5.42857 60.185 4.69206 60.6696 3.63458C60.8321 3.28006 61.1632 3 61.56 3Z"
          fill="white"
        />
        <rect x="12" y="11" width="52" height="52" rx="8" fill="#F25151" />
        <path
          d="M42.0312 25.375V48H37.3125V29.8438H37.1875L32 33.0938V28.9375L37.5938 25.375H42.0312Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_d_270_661"
          x="0"
          y="0"
          width="76"
          height="76"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.705882 0 0 0 0 0.113725 0 0 0 0 0.113725 0 0 0 0.5 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_270_661"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_270_661"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

export default Active1Icon;
