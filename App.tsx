/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect, useRef} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, FlatList} from 'react-native';
import { Colors,} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';
import Rating from './components/Rating';
import Genre from './components/Genre';
import Spinner from './components/Spinner';
import { getMovies } from './api';
import * as CONSTANTS from './constants/constants';
import {Animated} from 'react-native';
import { useSharedValue, useAnimatedStyle, interpolate, useAnimatedScrollHandler } from "react-native-reanimated";
import LinearGradient from 'react-native-linear-gradient';

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  background-color: #000;
`
const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
  margin-top: ${CONSTANTS.TOP}px;
`
const Poster = styled.View`
  margin-horizontal: ${CONSTANTS.SPACING}px;
  padding: ${CONSTANTS.SPACING * 2}px;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
`

const PosterImage = styled.Image`
  width: 100%;
  height: ${CONSTANTS.ITEM_SIZE * 1.2}px;
  resize-mode: cover;
  border-radius: 10px;
  margin: 0 0 10px 0;
`

const PosterTitle = styled.Text`
  font-size: 18px;
  font-family: SyneMono-Regular;
  color: #FFF;
`

const PosterDescription = styled.Text`
  font-size: 12px;
    font-family: SyneMono-Regular;
    color: #FFF;
`
const DummyContainer = styled.View`
  width: ${CONSTANTS.SPACER_ITEM_SIZE}px;
`
const ContentContainer = styled.View`
  position: absolute;
  width: ${CONSTANTS.WIDTH}px;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`

const BackdropContainer = styled.View`
  width: ${CONSTANTS.WIDTH}px;
  position: absolute;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
  overflow: hidden;
`

const BackdropImage = styled.Image`
  position: absolute;
  width: ${CONSTANTS.WIDTH}px;
  height: ${CONSTANTS.BACKDROP_HEIGHT}px;
`

interface BackdropProps {
  movies: any,
  scrollX: any,
}

interface Movie {
  key: string;
  poster_path: string;
  vote_average: number;
  genres: string[];
  original_title: string;
  description: string;
}



function App(): React.JSX.Element {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;

  useEffect(() => {

    const fetchData = async () => {
      const data = await getMovies();
      //setMovies(data);
      setMovies([{key: 'left-spacer'}, ...data, {key: 'right-spacer'}]);
      setLoaded(true);
      
    }

    fetchData();
  }, []);

  const Backdrop:React.FC<BackdropProps> = ({movies, scrollX}) => {
    return(
      <ContentContainer>
        <FlatList
          data={movies}
          keyExtractor={item => `${item.key}`}
          removeClippedSubviews={false}
          contentContainerStyle={{width: CONSTANTS.WIDTH, height: CONSTANTS.BACKDROP_HEIGHT}}
          renderItem={({item, index}) => {
            if(!item.backdrop_path){
              console.log("NO TIENE COMPONENTE BACKDROP");
              
              return null
            }
            console.log(item.backdrop_path);
            
            
            const translateX = scrollX.interpolate({
              inputRange: [(index - 1) * CONSTANTS.ITEM_SIZE, index * CONSTANTS.ITEM_SIZE],
              outputRange: [0, CONSTANTS.WIDTH]
            })
            return(

              <BackdropContainer
                as={Animated.View}
                style={{transform:[{translateX: translateX}]}}>
                <BackdropImage source={{uri: item.backdrop_path}}></BackdropImage>
              </BackdropContainer>
            )
          }}>
  
        </FlatList>
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'black']}
          style={{
            height: CONSTANTS.BACKDROP_HEIGHT,
            width: CONSTANTS.WIDTH,
            position: 'absolute',
            bottom: 0,
          }}>
  
          </LinearGradient>
      </ContentContainer>
    )
  }

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  if(!loaded)
  {
    return <Spinner></Spinner>
  }
  else {
    return (
      <Container>
        <Backdrop movies={movies} scrollX={scrollX}></Backdrop>
        <StatusBar></StatusBar>
        <Animated.FlatList
        scrollEventThrottle={16}
          onScroll={Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}],
                  {useNativeDriver: true}
          )}
          snapToInterval={CONSTANTS.ITEM_SIZE}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={item => item.key}
          horizontal
          contentContainerStyle={{
            alignItems: 'center'
          }}
          renderItem={({item, index}) => {

            const inputRange = [(index - 2) * CONSTANTS.ITEM_SIZE,
                                (index - 1) * CONSTANTS.ITEM_SIZE,
                                index * CONSTANTS.ITEM_SIZE]
            const outputRange = [0, -50, 0];

            const translateYMovie = scrollX.interpolate({inputRange, outputRange});
            
            //console.log("scroll_x.value:", scrollX);

            if(!item.original_title)
            {
              //console.log("NO TIENE ORIGINAL TITLE");
              
              return <DummyContainer></DummyContainer>
            }
            else{
              return(
                <PosterContainer>
                  <Poster as={Animated.View} style={{transform: [{translateY: translateYMovie}]}}>
                    <PosterImage source={{uri: item.poster_path}}></PosterImage>
                    <PosterTitle numberOfLines={1}>{item.original_title}</PosterTitle>
                    <Rating rating={item.vote_average}></Rating>
                    <Genre genres = {item.genres}></Genre>
                    <PosterDescription numberOfLines={5}>{item.description}</PosterDescription>
                  
                  </Poster>
                </PosterContainer>
              )
            }
          }}>

          </Animated.FlatList>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
