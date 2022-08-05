import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { COLORS, FONTS, icons, SIZES, GOOGLE_API_KEY } from "../constants"






export default function OrderDelivery({ route, navigation }) {

  const [destination, setDestination] = useState(null)
  const [origin, setOrigin] = useState(null)
  const [restaurant, setRestaurant] = React.useState(null)
  useEffect(() => {
    let { restaurant, currentLocation } = route.params;

    (async function () {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        setRestaurant(restaurant)
        let location = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
        setOrigin({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        })
      } else {
        throw new Error('Location permission not granted');
      }
    })();

  }, []);






  function renderMap() {

    return (
      <View style={{ flex: 1 }}>
        <MapView style={{ height: "100%", width: "100%", flex: 1 }} initialRegion={origin} showsUserLocation={true} zoomEnabled={true} loadingEnabled={true}>

        </MapView>
      </View>
    )
  }



  function renderDeliveryInfo() {
    return (
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          left: 0,
          right: 0,
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <View
          style={{
            width: SIZES.width * 0.9,
            paddingVertical: SIZES.padding * 3,
            paddingHorizontal: SIZES.padding * 2,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.white
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {/* Avatar */}
            <Image
              source={restaurant?.courier.avatar}
              style={{
                width: 50,
                height: 50,
                borderRadius: 25
              }}
            />

            <View style={{ flex: 1, marginLeft: SIZES.padding }}>
              {/* Name & Rating */}
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ ...FONTS.h4 }}>{restaurant?.courier.name}</Text>
                <View style={{ flexDirection: 'row' }}>
                  <Image
                    source={icons.star}
                    style={{ width: 18, height: 18, tintColor: COLORS.primary, marginRight: SIZES.padding }}
                  />
                  <Text style={{ ...FONTS.body3 }}>{restaurant?.rating}</Text>
                </View>
              </View>

              {/* Restaurant */}
              <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>Deliveryman(Girl)</Text>
              <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}>{restaurant?.name}</Text>

            </View>
          </View>

          {/* Buttons */}
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.padding * 2,
              justifyContent: 'space-between'
            }}
          >
            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                marginRight: 10,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
              onPress={() => navigation.navigate("Home")}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Home</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                flex: 1,
                height: 50,
                backgroundColor: COLORS.secondary,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10
              }}
              onPress={() => navigation.goBack()}
            >
              <Text style={{ ...FONTS.h4, color: COLORS.white }}>Cancel Buy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }






  return (

    <View style={{ flex: 1 }}>
      {renderMap()}
      {renderDeliveryInfo()}

    </View>
  );
}
