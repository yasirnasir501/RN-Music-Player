import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native'
import React, { useRef, useState, useEffect } from 'react'
import { useRoute } from '@react-navigation/native'
import { songs } from '../MusicData';
import Slider from '@react-native-community/slider';
import TrackPlayer, {capabilities, usePlaybackState, useProgress, State} from 'react-native-track-player'


const { height, width } = Dimensions.get('window');

const Music = () => {
  const route = useRoute();
  const playbackState = usePlaybackState();
  const [currentSong, setCurrentSong] = useState(route.params.index);
  const ref = useRef();
  useEffect(() => {
    setTimeout(() => {
      ref.current.scrollToIndex({
        animated: true,
        index: currentSong,
      })
    }, 100)
  }, []);

  useEffect(()=> {
    setupPlayer();
  }, [])

  const setupPlayer = async () => {
    try{
      await TrackPlayer.setupPlayer()
      await TrackPlayer.updateOptions({
        // Media controls capabilities
        capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
        ],
    
        // Capabilities that will show up when the notification is in the compact form on Android
        compactCapabilities: [Capability.Play, Capability.Pause],
    
        // Icons for the notification on Android (if you don't like the default ones)
        
    });
    await TrackPlayer.add(songs);
    togglePlayback(playbackState);
    }
    catch(e) {}
  };

  const togglePlayback = async playbackState => {
    console.log(playbackState);
    if ( 
      playbackState === State.Paused || playbackState === State.Ready){
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };

  return (
    <View style={styles.container}>

      <View>
        <FlatList
          horizontal
          ref={ref}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          data={songs}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.bannerView}>
                <Image source={item.image} style={styles.banner} />
                <Text style={styles.name}>{route.params.data.title}</Text>
                <Text style={styles.name}>{route.params.data.singer}</Text>
              </View>
            );
          }}
        />
      </View>


      <View style={styles.sliderView}>
        <Slider />
      </View>

      <View style={styles.btnArea}>
        <TouchableOpacity onPress={async() => {
          if (currentSong > 0) {
            setCurrentSong(currentSong - 1);
            ref.current.scrollToIndex({
              animated: true,
              index: parseInt(currentSong) - 1,
            });
            await TrackPlayer.skip(parseInt(currentSong) - 1);
            togglePlayback(playbackState);
          }
        }}>
          <Image source={require("../images/backward.png")} style={styles.icon} />
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => {
          // await TrackPlayer.skip(1)
          togglePlayback(playbackState);
        }}>
          <Image source={playbackState == State.Paused || playbackState == State.Ready ? require("../images/play.png") : require("../images/pause.png")} style={[styles.icon, { width: 50, height: 50 }]} />
        </TouchableOpacity>

        <TouchableOpacity onPress={async () => {
          if (songs.length - 1 > currentSong) {
            setCurrentSong(currentSong + 1);
            ref.current.scrollToIndex({
              animated: true,
              index: parseInt(currentSong) + 1,
            })
            await TrackPlayer.skip(parseInt(currentSong) + 1);
            togglePlayback(playbackState);
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
});