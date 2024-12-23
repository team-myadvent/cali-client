import { useState } from "react";
import styled from "@emotion/styled";
import ProfileAvatar from "../common/ProfileAvatar";
import EditIcon from "../common/icons/EditIcon";
import { colors } from "@/styles/colors";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "@/hooks/useAuth";

const ProfileSection = () => {
  const { user, setUser } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileUpdate = (newName: string) => {
    if (user) {
      setUser({
        ...user,
        username: newName,
      });
    }
  };

  return (
    <Container>
      <ProfileAvatar initial={user?.username ? user?.username.charAt(0) : ""} />
      <NameContainer>
        <Username>{user?.username}의 플레이리스트</Username>
        <EditButton onClick={() => setIsModalOpen(true)}>
          <EditIcon />
        </EditButton>
      </NameContainer>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={user?.username}
        onSubmit={handleProfileUpdate}
      />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Username = styled.span`
  font-size: 16px;
  color: ${colors.black};
`;

const EditButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export default ProfileSection;
