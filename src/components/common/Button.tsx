import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
type ButtonVariant =
  | "export"
  | "select"
  | "register"
  | "iconOnly"
  | "text"
  | "iconText";

interface BaseButtonProps {
  variant: ButtonVariant;
  onClick?: () => void;
  disabled?: boolean;
  isBlocked?: boolean;
}

interface StandardButtonProps extends BaseButtonProps {
  variant: "export" | "select" | "register" | "text";
  children: React.ReactNode;
}

interface IconOnlyButtonProps extends BaseButtonProps {
  variant: "iconOnly";
  icon: React.ReactElement;
}

interface IconTextButtonProps extends BaseButtonProps {
  variant: "iconText";
  icon: React.ReactElement;
  children: React.ReactNode;
}

type ButtonProps =
  | StandardButtonProps
  | IconOnlyButtonProps
  | IconTextButtonProps;

const Button = (props: ButtonProps) => {
  if (props.variant === "iconOnly") {
    return <StyledButton {...props}>{props.icon}</StyledButton>;
  }
  if (props.variant === "iconText") {
    return (
      <StyledButton {...props}>
        {props.icon}
        {props.children}
      </StyledButton>
    );
  }
  return <StyledButton {...props}>{props.children}</StyledButton>;
};
export default Button;

const StyledButton = styled.button<{
  variant: ButtonVariant;
  isBlocked?: boolean;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  gap: 10px;
  width: ${({ isBlocked }) => (isBlocked ? "100%" : "fit-content")};
  white-space: nowrap;

  ${({ variant }) => {
    switch (variant) {
      case "export":
        return `
          padding: 12px 24px;
          border-radius: 30px;
          background-color: ${colors.red[3]};
          color: ${colors.white};

          &:hover {
            opacity: 0.9;
          }
        `;

      case "select":
        return `
          padding: 8px 10px;
          border-radius: 8px;
          background-color: ${colors.black};
          color: ${colors.white};
        `;

      case "register":
        return `
          padding: 12px 20px;
          border-radius: 12px;
          background-color: ${colors.red[3]};
          color: ${colors.white};

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
            background-color: ${colors.grey[1]};
          }
        `;

      case "text":
        return `
          padding: 4px 8px;
          background-color: transparent;
          color: ${colors.grey[3]};
        `;

      case "iconText":
        return `
          background-color: transparent;
          color: ${colors.black};
          gap: 8px;
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
