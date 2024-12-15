import { useState } from "react";
import styled from "@emotion/styled";
import ProfileAvatar from "../common/ProfileAvatar";
import EditIcon from "../common/icons/EditIcon";
import { colors } from "@/styles/colors";
import EditProfileModal from "./EditProfileModal";
import { useAuth } from "@/hooks/useAuth";

const ProfileSection = () => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (newName: string) => {
    // if (onUpdateUsername) {
    //   onUpdateUsername(newName);
    // }
  };

  return (
    <Container>
      <ProfileAvatar initial={user?.username ? user?.username.charAt(0) : ""} />
      <NameContainer>
        <Username>{user?.username} 플리</Username>
        <EditButton onClick={() => setIsModalOpen(true)}>
          <EditIcon />
        </EditButton>
      </NameContainer>

      <EditProfileModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        username={user?.username}
        onSubmit={handleSubmit}
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
