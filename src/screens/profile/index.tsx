import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';

import {
  Container,
  Button,
  Text
} from './styles';
import { useAuth } from '../../hooks/auth';

export function Profile() {
  const { user, signOut } = useAuth();

  return (
    <>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        enabled>
        <Container>
          <Text>{user.name}</Text>
          <Button onPress={signOut}><Text>Sair</Text></Button>
        </Container>
      </KeyboardAvoidingView>
    </>
  );
};