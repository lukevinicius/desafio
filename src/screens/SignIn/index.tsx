import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { Alert, ScrollView, View, KeyboardAvoidingView, Platform } from 'react-native';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { ButtonAccount, ButtonSignIn, Container, Text, Title, TitleInput } from './styles';

const SignIn: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useAuth();
  const navigation = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        username: Yup.string()
          .required('E-mail obrigatório'),
        password: Yup.string()
          .required('A senha é obrigatória')
      });

      await schema.validate({ username, password });

      signIn({ username, password }).catch(err => {
        Alert.alert(err.message);
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        Alert.alert('Opa', error.message);
      } else {
        Alert.alert(
          'Erro na autenticação',
          'Ocorreu um erro ao fazer login, verifique as credenciais'
        )
      }
    }
  }

  function handleSignUp() {
    navigation.navigate('SignUp');
  }

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <ScrollView
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{ flex: 1 }}
        >
          <Container>
            <Title>
              Faça seu login para começar
            </Title>
            <TitleInput
              name="username"
              placeholder="username"
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
            <ButtonSignIn onPress={handleSignIn}>
              <Text>Entrar</Text>
            </ButtonSignIn>
            <ButtonAccount onPress={handleSignUp}>
              <Text>Criar conta gratuita</Text>
            </ButtonAccount>
          </Container>
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default SignIn;