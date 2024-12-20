import styled from "@emotion/styled";
import { colors } from "@/styles/colors";
import ProfileAvatar from "../common/ProfileAvatar";
import { useState } from "react";
import { Text } from "../common/Text";
import Button from "../common/Button";
import { updateMyProfile } from "@/api/profile";
import { useAuth } from "@/hooks/useAuth";
import { User } from "@/types/user";

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
  const { user, setUser } = useAuth();
  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedName = inputValue.trim();
    if (!trimmedName) return;

    const accessToken = user?.accessToken;
    if (!accessToken) return;

    try {
      const response = await updateMyProfile(accessToken, {
        username: trimmedName,
      });

      if (response && response.results?.data) {
        // 프로필 업데이트 성공 시 user 정보도 업데이트
        setUser((prev: User | null) =>
          prev
            ? {
                ...prev,
                username: trimmedName,
              }
            : null
        );

        onSubmit(trimmedName);
        onClose();
      } else {
        // 에러 처리 로직 (ex: toast로 에러 메시지 표시)
        console.error("프로필 업데이트 실패");
      }
    } catch (error) {
      // 에러 처리 로직 (ex: toast로 에러 메시지 표시)
      console.error("프로필 업데이트 중 오류 발생:", error);
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
