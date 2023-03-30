import { View, Text, TouchableOpacity, Dimensions, StyleSheet, Image,} from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

const {height, width} = Dimensions.get('window');
const MusicListItem = ({item, index, data}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity style={[styles.container, {marginBottom: index == data.length - 1 ? 30 : 0},]} onPress={()=>{
      navigation.navigate('Music', {
        data: item,
        index: index,
      })
    }}>
      <Image source={item.image} style={styles.songImage}/>
      <View style={styles.nameView}>
        <Text style={styles.name}>{item.title}</Text>
        <Text style={styles.name}>{item.singer}</Text>
      </View>
      <TouchableOpacity >
        <Image source={require('../images/play.png')} style={styles.play}/>
      </TouchableOpacity>
    </TouchableOpacity>
  )
}

export default MusicListItem;

const styles = StyleSheet.create({
    container: {
        height: 100,
        width: width - 20,
        elevation: 5,
        backgroundColor: '#fff',
        marginTop: 20,
        alignSelf: 'center',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    songImage:{
      width: 100,
      height: 90,
      borderRadius: 10,
      marginLeft: 7
    },
    nameView:{
      paddingLeft: 15,
      width:'53%'
    },
    name:{
      fontSize: 20,
      fontWeight: '600',
      color: '#000'
    },
    play:{
      height: 30,
      width: 30
    },

})