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
  text-align: center;
  margin: 10px;
  color: ${({ theme }) => theme.colors.text};
`
export const ButtonAccount = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  margin: 10px;
  flex-direction: row;
  align-self: center;
  border-radius: 5px;
  padding: 8px;
  width: 60%;
  align-items: center;
  justify-content: center;
`;
export const ButtonSignIn = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.success};
  margin: 10px;
  flex-direction: row;
  align-self: center;
  border-radius: 5px;
  padding: 8px;
  width: 60%;
  align-items: center;
  justify-content: center;
`;
export const TitleInput = styled.TextInput`
  margin: 10px;
  padding: 15px;
  width: 60%;
  border-radius: 10px;
  text-align: justify;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.title};
  font-size: 16px;
`
export const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.danger};
  flex-direction: row;
  align-self: center;
  border-radius: 5px;
  padding: 8px;
  width: 100%;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: 18px;
`