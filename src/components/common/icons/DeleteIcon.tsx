import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const DeleteIcon = ({
  width = 8,
  height = 8,
  color = "#6F6E6E",
  ...props
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M1 1L5 5M5 5L9 9M5 5L9 1M5 5L1 9"
        stroke={color}
        stroke-width="2"
        stroke-linecap="round"
      />
    </svg>
  );
};

export default DeleteIcon;
