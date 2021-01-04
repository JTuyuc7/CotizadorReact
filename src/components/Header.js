import React from 'react';
import PropTypes from 'prop-types';  
import styled from '@emotion/styled';

const ContenedorHeader = styled.header`
    background-color: #26C6DA;
    padding: 10px;
    font-weight: bold;
    border-radius: 15px;
    color: #ffffff;
`;

const TextHeader = styled.h1`
    font-size: 2rem;
    margin: 0;
    font-family: "Slabo 35px", serif;
    text-align: center;
`;


const Header = ({titulo}) => {
    return (
        <ContenedorHeader>
            <TextHeader>{titulo}</TextHeader>
        </ContenedorHeader>

     );
}

Header.propTypes = {
    titulo: PropTypes.string.isRequired

}
 
export default Header;