import { useState } from 'react'
import { StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { Container } from './styles';

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

export function Home() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  function onRegionChange(region: IRegion) {
    setRegion(region);
  }

  return (
    <Container>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        onRegionChange={() => onRegionChange}
      />
    </Container>
  )
}