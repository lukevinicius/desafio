import styled from "styled-components/native";
import { TouchableOpacity } from 'react-native';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  justify-content: center;
  align-items: center;
`

export const Button = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  flex-direction: row;
  align-self: center;
  border-radius: 30px;
  padding: 8px;
  margin: 15px;
  width: 50%;
  align-items: center;
  justify-content: center;
`;

export const Text = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: 20px;
`