import styled from "styled-components";
import Paper from "@material-ui/core/Paper";
import OutlinedInput from "@material-ui/core/OutlinedInput";

export const StyledPaper = styled(Paper)`
  font-family: 'Roboto';
  margin-top: 15px;
  padding: 15px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
export const StyledChatForm = styled.form`
  justify-content: center;
  width: 80%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;
export const StyledChatHeader = styled.h2`
  text-align: center;
`;

export const StyledInput = styled(OutlinedInput)`
  margin: 10px 0;
`;
export const StyledChatInput = styled(OutlinedInput)`
  width: 70%;
`;

export const MessageContainer = styled.div`
  border-radius: 5px;
  width: 90%;
  margin: 10px auto;
  background-color: #efdfff;
  color: #a488ba;
  padding: 5px;
`;
export const MessageText = styled.p`
  margin: 0;
`;
export const MessageInfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  padding: 5px;
  border-bottom: 1px solid rgba(172, 166, 177, 0.5);
  margin-bottom: 15px;
`;
