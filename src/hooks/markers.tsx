import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
} from 'react';

interface Marker {
  userId: number;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
}

interface MarkerContextData {
  markers: Marker[];
  createMarker: (marker: Marker) => Promise<void>;
}

interface MarkerProviderProps {
  children: ReactNode;
}

const MarkerContext = createContext<MarkerContextData>({} as MarkerContextData);

function MarkerProvider({ children }: MarkerProviderProps) {
  const [data, setData] = useState<Marker[]>([]);

  async function createMarker({ userId, title, description, latitude, longitude }: Marker) {
    const info = {
      userId: userId,
      title: title,
      description: description,
      latitude: latitude,
      longitude: longitude
    }
    data.push(info)
  }

  return (
    <MarkerContext.Provider
      value={{
        markers: data,
        createMarker,
      }}
    >
      {children}
    </MarkerContext.Provider>
  )
}

function useMarker(): MarkerContextData {
  const context = useContext(MarkerContext);

  return context;
}

export { MarkerProvider, useMarker }