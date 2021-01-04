import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import {primeraMayuscula} from '../Helper';

const ContenedorResument = styled.div`
    padding: 1rem,;
    text-align: center;
    background-color: #00CED1;
    color: #fff;
    margin-top: 1rem;
    border-radius: 9px;

`;

const Resumen = ({datos}) => {

    const {marca, year, plan} = datos;

    if(marca === "" || year === "" || plan === "" ) return null;

    return ( 
        <ContenedorResument>
            <h2>Resumen de Cotizacion</h2>
            <ul>
                <li>Marca: {primeraMayuscula(marca) } </li>
                <li>Plan: {primeraMayuscula(plan) } </li>
                <li>Año del Auto: {year} </li>
            </ul>
        </ContenedorResument>

     );
}

Resumen.propTypes = {
    datos: PropTypes.object.isRequired

}


export default Resumen;