import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, SafeAreaView, Animated } from 'react-native';
import { icons, images, SIZES, COLORS, FONTS } from '../constants'
import { AntDesign, EvilIcons, Ionicons, FontAwesome } from '@expo/vector-icons';
import { isIphoneX } from 'react-native-iphone-x-helper'



export default function Restaurant({ route, navigation }) {

  const scrollX = new Animated.Value(0)
  const [restaurant, setRestaurants] = React.useState(null)
  const [currentLocation, setCurrentLocation] = React.useState(null)
  const [orderItems, setOrderItems] = React.useState([])



  React.useEffect(() => {
    let { item, currentLocation } = route.params
    setRestaurants(item)
    setCurrentLocation(currentLocation)
  })


  function editNumberOfOrder(action, menuId, price) {


    let orderList = orderItems.slice() // duplicated  the original state Array
    let item = orderList.filter(element => element.menuId == menuId)

    if (action == "+") {

      if (item.length > 0) {
        let newQty = item[0].qty + 1
        item[0].qty = newQty
        item[0].total = item[0].qty * price

      } else {
        const newItem = {
          menuId: menuId,
          qty: 1,
          price: price,
          total: price
        }
        orderList.push(newItem)
      }

      setOrderItems(orderList)

    } else {
      if (item.length > 0) {
        if (item[0]?.qty > 0) {
          let newQty = item[0].qty - 1
          item[0].qty = newQty
          item[0].total = newQty * price

        }
      }
      setOrderItems(orderList)
    }
  }



  function getItemQty(menuId) {
    let orderItem = orderItems.filter(item => item.menuId == menuId)
    if (orderItem.length > 0) return orderItem[0].qty
    return 0
  }

  function getBasketItemCount() {
    let iteminCart = orderItems.reduce((totalElements, currentElement) => totalElements + (currentElement.qty || 0), 0)
    return iteminCart
  }
  function totalPriceOfItems() {
    total = orderItems.reduce((totalElements, currentElement) => totalElements + (currentElement.total || 0), 0)
    return total
  }



  function renderHeader() {
    return (
      <View style={{ flexDirection: 'row', height: 100, marginVertical: 10 }}>

        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: 'center'
          }}
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={30} color="black" />
        </TouchableOpacity>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <View
            style={{
              width: "70%",
              height: "50%",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: COLORS.lightGray3,
              borderRadius: SIZES.radius
            }}
          >
            <Text style={{ ...FONTS.body5 }}>{restaurant?.name}</Text>
          </View>
        </View>

        <TouchableOpacity style={{ width: 50, paddingRight: SIZES.padding * 2, justifyContent: 'center' }} >
          <EvilIcons name="navicon" size={30} color="black" />
        </TouchableOpacity>


      </View>
    )
  }

  function renderFoodInfo() {
    return (


      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ], { useNativeDriver: false })}
      >
        {
          restaurant?.menu.map((item, index) => (
            <View key={`menu-${index}`} style={{ height: SIZES.height * 0.35 }}>
              {/* Food's images */}
              <Image
                source={item.photo}
                resizeMode="cover"
                style={{
                  width: SIZES.width,
                  height: "100%"
                }}
              />
              {/* Quantity */}
              <View
                style={{
                  position: 'absolute',
                  bottom: -20,
                  width: SIZES.width,
                  height: 50,
                  justifyContent: 'center',
                  flexDirection: 'row'

                }}
              >
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopLeftRadius: 25,
                    borderTopBottomRadius: 25,

                  }}
                  onPress={() => editNumberOfOrder("-", item.menuId, item.price)}

                >
                  <Text style={{ ...FONTS.body1 }}>-</Text>

                </TouchableOpacity>
                <View
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center'

                  }}
                >
                  <Text style={{ ...FONTS.h2 }}>{getItemQty(item.menuId)}</Text>
                </View>
                <TouchableOpacity
                  style={{
                    width: 50,
                    backgroundColor: COLORS.white,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderTopRightRadius: 25,
                    borderTopBottomRadius: 25,
                  }}
                  onPress={() => editNumberOfOrder("+", item.menuId, item.price)}
                >
                  <Text style={{ ...FONTS.body1 }}>+</Text>
                </TouchableOpacity>
              </View>
              {/* Name and discription */}
              <View
                style={{
                  width: SIZES.width,
                  alignItems: 'center',
                  marginTop: 15,
                  paddingHorizontal: SIZES.padding * 2
                }}
              >
                <Text style={{ marginVertical: 10, textAlign: 'center', ...FONTS.h2 }}>{item.name} - {item.price}</Text>
                <Text style={{ textAlign: 'center', ...FONTS.body3 }}>{item.description}</Text>
                {/* Food's calories  */}
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 10,
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Image
                    source={icons.fire}
                    style={{
                      width: 20,
                      height: 20,
                      marginRight: 10
                    }}
                  />
                  <Text style={{ ...FONTS.body3, color: COLORS.darkgray }}>{item.calories.toFixed(2)} cal</Text>
                </View>
              </View>
            </View>
          ))
        }
      </Animated.ScrollView>
    )
  }

  function renderDots() {

    const dotPosition = Animated.divide(scrollX, SIZES.width)
    return (
      <View style={{ height: 30 }}>
        <View style={{ flexDirection: 'row', alignItems1: 'center', justifyContent: 'center', height: SIZES.padding }}>
          {restaurant?.menu.map((item, index) => {

            const opacity = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: "clamp"

            })
            const dotSize = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [SIZES.base * 0.8, 10, SIZES.base * 0.8],
              extrapolate: "clamp"

            })
            const dotColor = dotPosition.interpolate({
              inputRange: [index - 1, index, index + 1],
              outputRange: [COLORS.darkgray, COLORS.primary, COLORS.darkgray],
              extrapolate: "clamp"

            })
            return (
              <Animated.View
                key={`dot-${index}`}
                opacity={opacity}
                style={{
                  borderRadius: SIZES.radius,
                  marginHorizontal: 6,
                  width: dotSize,
                  height: dotSize,
                  backgroundColor: dotColor
                }}
              >

              </Animated.View>
            )
          })}
        </View>
      </View>
    )
  }
  function renderOrder() {
    return (
      <View>


        {
          renderDots()
        }



        <View
          style={{
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
              borderBottomColor: COLORS.lightGray,
              borderBottomWidth: 1,
            }}
          >

            <Text style={{ ...FONTS.h3 }} >{getBasketItemCount()} items in cart</Text>
            <Text style={{ ...FONTS.h3 }}>${totalPriceOfItems()}</Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingVertical: SIZES.padding * 2,
              paddingHorizontal: SIZES.padding * 3,
            }}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Ionicons name="md-location-outline" size={20} color="gray" />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>Location</Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <FontAwesome name="cc-mastercard" size={24} color="black" />
              <Text style={{ marginLeft: SIZES.padding, ...FONTS.h4 }}>***8865</Text>
            </View>
          </View>
          {/* order Buttom */}
          <View
            style={{
              padding: SIZES.padding * 2,
              alignItems: "center",
              justifyContent: 'center'
            }}
          >
            <TouchableOpacity
              style={{
                width: SIZES.width * 0.9,
                padding: SIZES.padding,
                backgroundColor: COLORS.primary,
                alignItems: 'center',
                borderRadius: SIZES.radius
              }}
              onPress={() => navigation.navigate("OrderDelivery", {
                restaurant: restaurant,
                currentLocation: currentLocation
              })}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h4 }}>Order</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>

          {isIphoneX() &&
            <View
              style={{
                position: 'absolute',
                bottom: -34,
                left: 0,
                right: 0,
                height: 34,
                backgroundColor: COLORS.white
              }}
            >
            </View>
          }
        </View>
      </View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderFoodInfo()}
      {renderOrder()}


    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
