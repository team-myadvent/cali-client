import React from "react";

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const EditIcon = ({
  width = 19,
  height = 18,
  color = "#B3A8A2",
}: IconProps): JSX.Element => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 19 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M13.2647 2.41176L7.24562 8.43086C7.02607 8.65041 6.86065 8.91806 6.76246 9.21261L6.13246 11.1026C5.87187 11.8844 6.61561 12.6281 7.39737 12.3675L9.28739 11.7375C9.58194 11.6394 9.8496 11.4739 10.0691 11.2544L16.0882 5.23529C16.8679 4.4556 16.8679 3.19146 16.0882 2.41176C15.3085 1.63207 14.0444 1.63207 13.2647 2.41176Z"
        stroke={color}
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M8.5 1H5.5C3.29086 1 1.5 2.79086 1.5 5V13C1.5 15.2091 3.29086 17 5.5 17H13.5C15.7091 17 17.5 15.2091 17.5 13V10"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default EditIcon;
