/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, useColorScheme, FlatList} from 'react-native';
import { Colors,} from 'react-native/Libraries/NewAppScreen';
import styled from 'styled-components/native';
import Rating from './components/Rating';
import Genre from './components/Genre';
import Spinner from './components/Spinner';
import { getMovies } from './api';
import * as CONSTANTS from './constants/constants';

const Container = styled.View`
  flex: 1;
`
const PosterContainer = styled.View`
  width: ${CONSTANTS.ITEM_SIZE}px;
`
const Poster = styled.View`
  margin-horizontal: ${CONSTANTS.SPACING}px;
  padding: ${CONSTANTS.SPACING * 2}px;
  align-items: center;
  background-color: #FFFFFF;
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
`

const PosterDescription = styled.Text`
  font-size: 12px;
    font-family: SyneMono-Regular;
`

interface Movie {
  key: string;
  poster_path: string;
  vote_average: number;
  genres: string[];
  originalTitle: string;
  description: string;
}


function App(): React.JSX.Element {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {

    const fetchData = async () => {
      const data = await getMovies();
      setMovies(data);
      setLoaded(true);
      
    }

    fetchData();
  }, []);

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
        <StatusBar></StatusBar>
        <FlatList
          snapToInterval={CONSTANTS.ITEM_SIZE}
          decelerationRate={0}
          showsHorizontalScrollIndicator={false}
          data={movies}
          keyExtractor={item => item.key}
          horizontal
          contentContainerStyle={{
            alignItems: 'center'
          }}
          renderItem={({item}) => {
            //console.log(item);
            
            return(
              <PosterContainer>
                <Poster>
                  <PosterImage source={{uri: item.poster_path}}></PosterImage>
                  <PosterTitle numberOfLines={1}>{item.originalTitle}</PosterTitle>
                  <Rating rating={item.vote_average}></Rating>
                  <Genre genres = {item.genres}></Genre>
                  <PosterDescription numberOfLines={5}>{item.description}</PosterDescription>
                
                </Poster>
              </PosterContainer>
            )
          }}>

          </FlatList>
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
