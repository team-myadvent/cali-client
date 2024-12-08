import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
type ButtonVariant = "export" | "select" | "save" | "iconOnly";

interface BaseButtonProps {
  variant: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
}

interface StandardButtonProps extends BaseButtonProps {
  variant: "export" | "select" | "save";
  children: React.ReactNode;
}

interface IconOnlyButtonProps extends BaseButtonProps {
  variant: "iconOnly";
  icon: React.ReactElement;
}

type ButtonProps = StandardButtonProps | IconOnlyButtonProps;

const Button = (props: ButtonProps) => {
  if (props.variant === "iconOnly") {
    return <StyledButton {...props}>{props.icon}</StyledButton>;
  }

  return <StyledButton {...props}>{props.children}</StyledButton>;
};
export default Button;

const StyledButton = styled.button<{ variant: ButtonVariant }>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 10px;

  ${({ variant }) => {
    switch (variant) {
      case "export":
        return `
          padding: 12px 24px;
          border-radius: 30px;
          background-color: ${colors.lemon};
          color: ${colors.brown[5]};

          &:hover {
            opacity: 0.9;
          }
        `;

      case "select":
        return `
          padding: 8px 10px;
          border-radius: 8px;
          background-color: ${colors.brown[2]};
          color: ${colors.brown[5]};

          &:hover, &:focus {
            background-color: ${colors.brown[3]};
            color: ${colors.brown[5]};
          }
        `;

      case "save":
        return `
          padding: 12px 20px;
          border-radius: 12px;
          background-color: ${colors.brown[5]};
          color: white;

          &:hover {
            opacity: 0.9;
          }
        `;

      case "iconOnly":
        return `
          padding: 8px;
          border-radius: 8px;
          background-color: transparent;

          &:hover {
            background-color: ${colors.brown[1]};
          }
        `;

      default:
        return "";
    }
  }}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
