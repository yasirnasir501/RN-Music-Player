import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { songs } from '../MusicData';
import Slider from '@react-native-community/slider';

const { height, width } = Dimensions.get('window');
const Music = () => {
  const [currentSong, setCurrentSong] = useState(0);
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      })
    }, 100)
  })
  const route = useRoute();
  return (
    <View style={styles.container}>

      <View>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={songs} renderItem={({ item, index }) => {
            return (
              <View style={styles.bannerView}>
                <Image source={item.image} style={styles.banner} />
              </View>
            )
          }} />
      </View>

      <Text style={styles.name}>{route.params.data.title}</Text>
      <Text style={styles.name}>{route.params.data.singer}</Text>
      <View style={styles.sliderView}>
        <Slider />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity onPress={() => {
          if (currentSong > 0) {
            setCurrentSong(currentSong - 1);
            ref.current.scrollToIndex({
              animated: true,
              index: currentSong - 1,
            })
          }
        }}>
          <Image source={require("../images/backward.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image source={require("../images/play.png")} style={[styles.icon, { width: 50, height: 50 }]} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          if (songs.length - 1 > currentSong) {
            setCurrentSong(currentSong + 1);
            ref.current.scrollToIndex({
              animated: true,
              index: currentSong + 1,
            })
          }
        }}>
          <Image source={require("../images/forward.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.btnArea1}>
        <TouchableOpacity>
          <Image source={require("../images/repeat.png")} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image source={require("../images/suffle.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

    </View>
  )
}

export default Music;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerView: {
    width: width,
    height: height / 2 - 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50
  },
  banner: {
    width: '90%',
    height: '100%',
    borderRadius: 10
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    marginLeft: 20,
    fontWeight: '700',
    color: '#000'
  },
  sliderView: {
    marginTop: 20,
    alignSelf: 'center',
    width: '90%'
  },
  btnArea: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 50,
  },
  btnArea1: {
    flexDirection: 'row',
    width: '50%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 20,
  },
  icon: {
    width: 35,
    height: 35,
  }
})