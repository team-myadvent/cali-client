import styled from "@emotion/styled";
import { colors } from "@/styles/colors";

interface ProfileAvatarProps {
  initial: string;
  backgroundColor?: string;
}

const ProfileAvatar = ({
  initial,
  backgroundColor = colors.green[3],
}: ProfileAvatarProps) => {
  return (
    <AvatarContainer backgroundColor={backgroundColor}>
      <Initial>{initial}</Initial>
    </AvatarContainer>
  );
};

const AvatarContainer = styled.div<{ backgroundColor: string }>`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: ${({ backgroundColor }) => backgroundColor};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Initial = styled.span`
  color: ${colors.white};
  font-size: 16px;
  line-height: 20px;
  font-weight: 700;
`;

export default ProfileAvatar;
