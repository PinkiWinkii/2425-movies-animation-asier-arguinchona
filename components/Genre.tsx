import React from "react";
import styled from "styled-components/native";

const Container = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;    
`

const GenreContainer = styled.View`
    border: 1px solid #CCCCCC;
    border-radius: 3px;
    margin: 0 2px 2px 0;
    padding: 3px;
`

const Text = styled.Text`
    opacity: 0.5;
    font-size: 8px;
    color: #FFF;
`
interface GenreProps {
    genres: any;
}

const Genre: React.FC<GenreProps> = ({genres}) => {
    return ( 
        <Container>
            {genres.map((genre: any, index: any) => {
                return(
                    <GenreContainer key={index.toString()}>
                        <Text>{genre}</Text>
                    </GenreContainer>
                )
            })}
        </Container>
    )
}

export default Genre;