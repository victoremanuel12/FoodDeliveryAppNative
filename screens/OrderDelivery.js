import React, { useState, useEffect, useRef } from 'react';
import { View, Text } from 'react-native';
import MapView from 'react-native-maps';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions'


function renderMap() {
  const [destination, setDestination] = useState(null)
  const [origin, setOrigin] = useState(null)

  useEffect(() => {
    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.000922,
          longitudeDelta: 0.000421
        })
      } else {
        throw new Error('Location permission not granted');
      }
    })();
  }, []);



  return (
    <View>

      <MapView style={{ height: "100%", width: "100%", marginTop: 30 }} initialRegion={origin} showsUserLocation={true} zoomEnabled={true} loadingEnabled={true} />
    </View>
  )
}

export default function OrderDelivery() {

  return (

    <View style={{ flex: 1 }}>
      {renderMap()}
    </View>
  );
}
// chaveAndroidGoggle:AIzaSyBH4lIhuumBqdAJSHo9cDfUkdxidbvR2gw
// chaveIOSGoogle:AIzaSyBRWMiqQjPA5IVqGAEVKnsDbJZGmFE9rBw
//chaveAPI:AIzaSyBH4lIhuumBqdAJSHo9cDfUkdxidbvR2gw