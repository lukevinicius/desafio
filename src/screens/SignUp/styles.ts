import styled from 'styled-components/native';
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px;
`
export const Title = styled.Text`
  font-size: 28px;
  margin: 10px;
  color: ${({ theme }) => theme.colors.text};
`

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 20px;
`;

export const ForgotPasswordText = styled.Text`
  font-size: 16px;
  color: ${({ theme }) => theme.colors.text};
`;

export const ButtonAccount = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  align-self: center;
  margin: 3px;
`;

export const TextAccount = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 18px;
`

export const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-self: center;
  border-radius: 5px;
  margin-top: 10px;
  padding: 8px;
  width: 60%;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
`