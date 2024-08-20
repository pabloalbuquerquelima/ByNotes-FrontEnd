import styled from 'styled-components'

export const Container = styled.textarea`
  width: 100%;
  height: 150px;

  background-color: ${({ theme }) => theme.COLORS.BACKGROUND_900};
  color: white;

  border: none;
  resize: none;

  margin-top: 10px;
  margin-bottom: 8px;
  border-radius: 14px;
  padding: 16px;

  &::placeholder {
  color: ${({ theme }) => theme.COLORS.GRAY_300};
  }
`