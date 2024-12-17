import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
import ProfileAvatar from "../common/ProfileAvatar";
import { useState } from "react";
import { Text } from "../common/Text";
import Button from "../common/Button";

// TODO : 이름변경시 update profile api & useAuth 적용해야함

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  username?: string;
  onSubmit: (newName: string) => void;
}
const EditProfileModal = ({
  isOpen,
  onClose,
  username,
  onSubmit,
}: EditProfileModalProps) => {
  const [inputValue, setInputValue] = useState(username || "");

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSubmit(inputValue.trim());
      onClose();
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Overlay>
      <ModalContainer>
        <Text variant="subtitle">프로필 수정</Text>
        <ProfileAvatar initial={inputValue[0] || ""} />
        <Form onSubmit={handleSubmit}>
          <InputWrapper>
            <InputContainer>
              <Input
                value={inputValue}
                onChange={handleChange}
                maxLength={19}
                autoFocus
                placeholder="이름을 입력해주세요"
              />
              <Text variant="body" color="grey.1">
                ({inputValue.length}/20)
              </Text>
            </InputContainer>
          </InputWrapper>
          <Button
            variant="register"
            disabled={
              inputValue.trim() === username || inputValue.trim().length === 0
            }
          >
            저장하기
          </Button>
        </Form>
      </ModalContainer>
    </Overlay>
  );
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  background: ${colors.white};
  border-radius: 12px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 500px;
  gap: 16px;
`;

const Form = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 16px;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${colors.grey[3]};
  border-radius: 8px;
  padding: 16px 24px;
  width: 100%;

  &:focus-within {
    border-color: ${colors.red[2]};
  }
`;

const Input = styled.input`
  border: none;
  outline: none;
  font-size: 14px;
  width: 100%;
`;

export default EditProfileModal;
