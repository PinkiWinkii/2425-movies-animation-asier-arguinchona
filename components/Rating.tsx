import React from "react";
import styled from "styled-components/native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Container = styled.View`
    flex-direction: row;
    margin-vertical: 4px;
    align-items: center;
    justify-content: center;
`;

interface RatingProps {
    rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
    //console.log(rating);
    
    // Ensure rating is a number between 0 and 10
    const normalizedRating = Math.min(Math.max(rating, 0), 10);
    const totalOfFullStars = Math.floor(normalizedRating / 2);
    const starOutlineCount = 5 - totalOfFullStars;

    // Create arrays for full stars and outlined stars
    const ratingStars = [
        ...Array(totalOfFullStars).fill('star'), // Full stars
        ...Array(starOutlineCount).fill('star-outline'), // Outline stars
    ];

    return (
        <Container>
            {ratingStars.map((icon, index) => (
                <MaterialCommunityIcons key={index} name={icon} size={16} color='gray' />
            ))}
        </Container>
    );
}

export default Rating;
