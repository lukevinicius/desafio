import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import {
  Button,
  Text,
  Title,
  Container,
  ButtonAccount,
  TextAccount,
  ForgotPassword,
  ForgotPasswordText,
} from './styles';
import { TitleInput } from '../SignIn/styles';

export function SignUp() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();
  const { signUp, bd } = useAuth();

  async function handleSignUp() {
    try {
      if (password === confirmPassword) {
        const schema = Yup.object().shape({
          name: Yup.string()
            .required('Nome obrigatório'),
          username: Yup.string()
            .required('Nome de usuário é obrigatório'),
          password: Yup.string()
            .required('A senha é obrigatória')
        });

        await schema.validate({ username, name, password });
        const userFound = bd.find(data => data.username === username)

        if (!userFound) {
          await signUp({ name, username, password }).then(() => {
            Alert.alert('Cadastro feito com sucesso!')
            navigation.navigate('SignIn');
          });
        } else {
          Alert.alert('Usuário já existe')
        }
      }
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro no cadastro',
          'Ocorreu um erro ao fazer sua conta, verifique seus dados'
        )
      }
    }
  }

  function handleSignIn() {
    navigation.navigate('SignIn');
  }

  return (
    <>
      <Container>
        <Title>
          Novo no Memoirs? Cadastre-se agora mesmo!
        </Title>
        <TitleInput
          icon="person"
          name="name"
          placeholder="Nome Completo"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setName}
          value={name}
        />
        <TitleInput
          icon="person"
          name="username"
          placeholder="Nome de usuário"
          autoCorrect={false}
          autoCapitalize="none"
          onChangeText={setUsername}
          value={username}
        />
        <TitleInput
          icon="lock"
          name="password"
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={setPassword}
          value={password}
        />
        <TitleInput
          icon="lock"
          name="confirmPassword"
          placeholder="Confirmar a Senha"
          secureTextEntry={true}
          onChangeText={setConfirmPassword}
          value={confirmPassword}
        />
        <Button onPress={handleSignUp}>
          <Text>Criar conta</Text>
        </Button>
        <ForgotPassword>
          <ButtonAccount onPress={handleSignIn}>
            <TextAccount>Voltar</TextAccount>
          </ButtonAccount>
        </ForgotPassword>
      </Container>
    </>
  );
};