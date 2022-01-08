import React, { useState } from 'react'
import axios from 'axios'
import MapView, { Marker } from 'react-native-maps'
import * as Yup from 'yup';

import { KeyboardAvoidingView, Platform, ScrollView, View, Text, Alert, StyleSheet } from 'react-native'
import theme from '../../global/styles/theme'
import { Container, TitleInput, CreateButton } from './styles'

import { useMarker } from '../../hooks/markers'
import { useAuth } from '../../hooks/auth';

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export function AddMarker() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [address, setAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const { user } = useAuth();
  const { createMarker } = useMarker();

  function onRegionChange(region: IRegion) {
    setRegion(region);
  }
  const API_KEY = 'AIzaSyCwW_E39bmwkvYQPCcWOdvSz2sHLNcbj20'

  async function findData() {
    const dataAddress = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(address)}&key=${API_KEY}`)
    dataAddress.data.results.map((data: any) => {
      setLatitude(data.geometry.location.lat)
      setLongitude(data.geometry.location.lng)
      setRegion({
        latitude: data.geometry.location.lat,
        longitude: data.geometry.location.lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })
  }

  async function handleAddPost() {
    try {
      const schema = Yup.object().shape({
        title: Yup.string()
          .required('Titulo é obrigatório'),
        description: Yup.string()
          .required('A descrição é obrigatório'),
        latitude: Yup.number()
          .required('É necessário buscar o marker'),
        longitude: Yup.number()
          .required('É necessário buscar o marker')
      });

      await schema.validate({ title, description, latitude, longitude });

      await createMarker({ userId: user.id, title, description, latitude, longitude }).then(() => {
        Alert.alert('Cadastro feito com sucesso!')
      })
    } catch (error: any) {
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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      enabled
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <TitleInput
            name="Title"
            placeholderTextColor={theme.colors.title}
            placeholder="Titulo"
            onChangeText={setTitle}
            value={title}
          />
          <TitleInput
            multiline={true}
            name="Description"
            placeholderTextColor={theme.colors.title}
            placeholder="Descrição"
            onChangeText={setDescription}
            value={description}
          />
          <TitleInput
            multiline={true}
            name="Street"
            placeholderTextColor={theme.colors.title}
            placeholder="Endereço"
            onChangeText={setAddress}
            value={address}
          />
          <MapView
            style={{ flex: 1 }}
            region={region}
            onRegionChange={() => onRegionChange}
          >
            <Marker coordinate={{ latitude: latitude, longitude: longitude }} />
          </MapView>
        </Container>
        <View style={{ flexDirection: 'row', backgroundColor: theme.colors.primaryDark }}>
          <CreateButton style={{ flex: 0.5 }} onPress={findData}>
            <Text style={{ color: theme.colors.background }}>Buscar Marker</Text>
          </CreateButton>
          <CreateButton style={{ flex: 0.5 }} onPress={handleAddPost}>
            <Text style={{ color: theme.colors.background }}>Criar Post</Text>
          </CreateButton>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}