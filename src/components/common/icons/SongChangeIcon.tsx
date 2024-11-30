import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const SongChangeIcon = ({
  width = 20,
  height = 24,
  color = "#5A4B45",
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 20 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="4" cy="13" r="3" stroke={color} strokeWidth="2" />
      <path
        d="M7 13V3C7 1.89543 7.92652 1.10587 8.81793 1.75814C10.3687 2.89291 12 5.20176 12 8"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M12.0909 12H15C17.2091 12 19 13.7909 19 16V16C19 18.2091 17.2091 20 15 20H7M7 20L10 17M7 20L10 23"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default SongChangeIcon;
