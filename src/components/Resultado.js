import React from 'react';
import PropTypes from 'prop-types';  
import styled from '@emotion/styled';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

const Mensaje = styled.p`
    background-color: rgb(127, 224, 237);
    margin-top: 2rem;
    padding: 2rem;
    text-align: center;
    border-radius: 9px;
`;

const ResultadoCotizacion = styled.div`
    text-align: center;
    padding: .5 rem;
    border: 1px solid #26C6DA;
    background-color: rgb(127, 224, 237);
    margin-top: 1rem;
    position: relative;
`;

const TextoCotizacion = styled.p`
    color: #00838f;
    padding: 1rem;
    border-radius: 30px;
    text-transform: uppercase;
    font-weight: bold;
    margin: 0;
`;

const Resultado = ({cotizacion}) => {

    return(
        (cotizacion === 0 ) 
        ? <Mensaje>Elije marca, año y tipo de seguro </Mensaje>   
        :
            (
                <ResultadoCotizacion>
                    <TransitionGroup
                        component="span"
                        className="resultado"
                    >
                        <CSSTransition
                            classNames="resultado"
                            key={cotizacion}
                            timeout={{enter: 500, exit: 500}}
                        >
                            <TextoCotizacion>El total es $ <span> {cotizacion} </span> </TextoCotizacion> 
                        </CSSTransition>
                    </TransitionGroup>
                </ResultadoCotizacion>
            )

    )

}

Resultado.propTypes = {
    cotizacion: PropTypes.number.isRequired

}

export default Resultado;