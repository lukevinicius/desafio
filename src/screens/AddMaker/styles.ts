import { TouchableOpacity } from 'react-native';
import styled from 'styled-components/native'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.primaryDark};
  padding: 30px;
`
export const TitleInput = styled.TextInput`
  margin: 15px 0 5px 0;
  padding: 15px;
  border-radius: 10px;
  text-align: justify;
  background-color: ${({ theme }) => theme.colors.shape};
  color: ${({ theme }) => theme.colors.title};
  font-size: 16px;
`
export const CreateButton = styled(TouchableOpacity)`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: 10px;
  margin: 20px;
  align-self: center;
  border-radius: 30px;
  width: 35%;
  align-items: center;
`