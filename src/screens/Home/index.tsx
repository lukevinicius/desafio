import { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';

import { Alert, StyleSheet } from 'react-native';
import { Container } from './styles';

import { useMarker } from '../../hooks/markers';
import { useAuth } from '../../hooks/auth';

interface IRegion {
  latitude: number;
  longitude: number;
  latitudeDelta: number;
  longitudeDelta: number;
}

interface IMarker {
  userId: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

export function Home() {
  const [region, setRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })
  const [data, setData] = useState<IMarker[]>([])
  const [load, setLoad] = useState(true)

  const { user } = useAuth();
  const { markers } = useMarker()
  const navigation = useNavigation();

  function onRegionChange(region: IRegion) {
    setRegion(region);
  }

  async function findData() {
    const dataFound = markers.filter(marker => marker.userId === user.id)
    console.log(dataFound)
    console.log(user.id)
    setData(dataFound)
  }

  useEffect(() => {
    findData();
    navigation.addListener('focus', () => { setLoad(!load) })
  }, [load, navigation])

  return (
    <Container>
      <MapView
        style={StyleSheet.absoluteFillObject}
        region={region}
        onRegionChange={() => onRegionChange}
      >
        {
          data?.map((marker, index) => (
            <Marker
              key={index}
              coordinate={{
                latitude: marker.latitude,
                longitude: marker.longitude
              }}
              title={marker.title}
              description={marker.description} />
          ))
        }
      </MapView>
    </Container>
  )
}