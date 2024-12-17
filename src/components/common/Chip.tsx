import { colors } from "@/styles/colors";
import styled from "@emotion/styled";

interface ChipProps {
  variant: "active" | "inactive" | "activeNotClicked" | "inactiveClicked";
  children: React.ReactNode;
  onClick?: () => void;
}

const StyledChip = styled.button<{ variant: ChipProps["variant"] }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;

  ${({ variant }) => {
    switch (variant) {
      case "active":
        return `
          background-color: ${colors.black};
          color: ${colors.white};
          border: 2px solid ${colors.black};
        `;
      case "inactive":
        return `
          background-color: transparent;
          color: ${colors.grey[2]};
          border: 2px dashed ${colors.grey[1]};
        `;
      case "activeNotClicked":
        return `
          background-color: ${colors.grey[1]};
          color: ${colors.white};
          border: 2px solid ${colors.grey[1]};
        `;
      case "inactiveClicked":
        return `
          background-color: transparent;
          color: ${colors.black};
          border: 2px dashed ${colors.grey[3]};
        `;
      default:
        return "";
    }
  }}
`;

export const Chip = ({ variant, children, onClick }: ChipProps) => {
  return (
    <StyledChip variant={variant} onClick={onClick}>
      {children}
    </StyledChip>
  );
};
