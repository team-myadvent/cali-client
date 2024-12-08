import { CSSProperties, ReactNode } from "react";
import styled from "@emotion/styled";
import { colors } from "@/styles/colors";

type TextVariant = "heading" | "title" | "subtitle" | "body" | "caption";

interface StyledTextProps {
  variant: TextVariant;
}

const getTextStyle = (variant: TextVariant) => {
  const styles = {
    heading: {
      fontSize: "28px",
      fontWeight: 700,
    },
    title: {
      fontSize: "20px",
      fontWeight: 500,
    },
    subtitle: {
      fontSize: "16px",
      fontWeight: 500,
    },
    body: {
      fontSize: "14px",
      fontWeight: 500,
    },
    caption: {
      fontSize: "12px",
      fontWeight: 500,
    },
  };

  return styles[variant];
};

const StyledText = styled.span<StyledTextProps>`
  ${({ variant }) => getTextStyle(variant)}
`;

type ColorKeys = keyof typeof colors | `brown.${keyof typeof colors.brown}`;

interface TextProps extends StyledTextProps {
  children: ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
  color?: ColorKeys;
  style?: CSSProperties;
}

export const Text = ({
  children,
  variant,
  className,
  as,
  color,
  style,
  ...props
}: TextProps) => {
  const getColor = (colorKey: ColorKeys) => {
    if (colorKey.includes(".")) {
      const [category, key] = colorKey.split(".") as [
        keyof typeof colors,
        keyof typeof colors.brown
      ];
      return colors[category][key];
    }
    return colors[colorKey as keyof typeof colors] as string;
  };

  return (
    <StyledText
      variant={variant}
      className={className}
      as={as}
      style={{
        ...style,
        color: color ? getColor(color) : undefined,
      }}
      {...props}
    >
      {children}
    </StyledText>
  );
};
