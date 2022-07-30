import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { Entypo } from '@expo/vector-icons';



export default function Home() {
  function renderHeader() {
    return (
      <View style={{ paddingTop: 10, width: "100%", flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>

        <TouchableOpacity style={{ paddingLeft: 10 }}>
          <Image source={icons.nearby} resizeMode="contain" style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

        <View style={{ width: "50%", paddingTop: 10 }}>
          <View style={{ backgroundColor: COLORS.l, width: "100%", borderRadius: 100 }}>
            <Text style={{ textAlign: 'center', ...FONTS.h3 }}> Location</Text>
          </View>
        </View>

        <TouchableOpacity style={{ paddingRight: 10 }}>
          <Image source={icons.basket} resizeMode="contain" style={{ width: 30, height: 30 }} />
        </TouchableOpacity>

      </View>
    )
  }
  return (
    <SafeAreaView style={{ height: 100, backgroundColor: COLORS.lightGray4, }}>
      {renderHeader()}
    </SafeAreaView>


  );
}
const styles = StyleSheet.create({
  container: {
    fle: 1, // erro aqui!
    backgroundColor: COLORS.lightGray4,
    height: 80
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  }
})