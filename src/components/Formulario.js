import React, { useState } from 'react';
import styled from '@emotion/styled';
import PropTypes from 'prop-types';  
import { obtenerDiferenciaYear, cacularMarca, obtenerPlan } from '../Helper';

const Campo = styled.div`
    display: flex;
    margin-bottom: 1rem;
    align-items: center;

`;
const Label = styled.label`
    flex: 0 0 100px;
`;
const Select = styled.select`
    display: block;
    width: 100%;
    padding: 1rem;
    border: 1px solid #e1e1e1;
    -webkit-appearance: none;
    border-radius: 9px;
`;
const InputRadio = styled.input`
    margin: 0 2rem;
`;
const Boton = styled.button`
    background-color: #00838f;
    font-size: 16px;
    display: block;
    width: 100%;
    padding: 1rem;
    border: none;
    color: #ffffff;
    text-transform: uppercase;
    font-weight: bold;
    transition: background-color .3s ease;
    margin-top: 2rem;

    &:hover{
        background-color: #26C6DA;
        cursor: pointer;
    }
    
`;

const Error = styled.div`
    background-color: red;
    color: white;
    padding: 1rem;
    width: 100%;
    text-align: center;
    margin-bottom: 2rem;
    border-radius: 9px;
`;

const Formulario = ({guardarResumen, guardarCargando }) => {
    //Crear el State para validar la informacion.

    const [ datos, guardarDatos] = useState({
        marca: "",
        year: "",
        plan: ""
    });

    const [ error, guardarError ] = useState(false);
    //Extraer valores del state
    const { marca, year, plan } = datos;

    //Leer los datos del formulario
    const obtenerInformacion = e =>{
        guardarDatos({
            ...datos,
            [e.target.name] : e.target.value
        })    
    }

    //Cuando el usuario presione submit

    const cotizarSeguro = e =>{
        e.preventDefault();

        if(marca.trim() === "" || year.trim() === "" || plan.trim() === "" ){
            guardarError(true);
            return;
        }
        guardarError(false);

        // Tener un base de 2000

        let resultado = 2000;

        // Obtener la diferencia de años
        const diferencia = obtenerDiferenciaYear(year);

        resultado -= ((diferencia * 3 ) * resultado) / 100;    
        // Por cada año menor hay que restar el 3%

        // Americano 15%
        // Asiatico 5%
        // Europeo 30%
        resultado = cacularMarca(marca) * resultado;

        // Plan basico aumenta 20%
        // Plan completo aumenta un 50%
        const incrementoPlan = obtenerPlan(plan);
        resultado = parseFloat(incrementoPlan * resultado).toFixed(2);      

        // Mostrar el total
        guardarCargando(true);

        setTimeout(() =>{
            guardarCargando(false);

            guardarResumen({
                cotizacion: Number(resultado),
                datos
            });

        }, 3000);


    }

    return ( 
        <form
            onSubmit={cotizarSeguro}
        >   
            { error ? <Error> Todos los campos son obligatorios </Error> : null}

            <Campo>
                <Label>Marca </Label>
                <Select
                    name="marca"
                    value={marca}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="americano"> Americano </option>
                    <option value="europeo"> Europeo </option>
                    <option value="asiatico"> Asiatico </option>

                </Select>
            </Campo>

            <Campo>
                <Label>Año</Label>
                <Select
                    name="year"
                    value={year}
                    onChange={obtenerInformacion}
                >
                    <option value="">-- Seleccione --</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                    <option value="2019">2019</option>
                    <option value="2018">2018</option>
                    <option value="2017">2017</option>
                    <option value="2016">2016</option>
                    <option value="2015">2015</option>
                    <option value="2014">2014</option>
                    <option value="2013">2013</option>
                    <option value="2012">2012</option>
               </Select>
            </Campo>
            <Campo>
                <Label>Plan</Label>
                <InputRadio
                    type="radio"
                    name="plan"
                    value="basico"
                    checked={plan === "basico"}
                    onChange={obtenerInformacion}
                />Basico
              <InputRadio
                    type="radio"
                    name="plan"
                    value="completo"
                    checked={plan === "completo"}
                    onChange={obtenerInformacion}
                />Completo
            </Campo>
            <Boton type="submit">Cotizar</Boton>
        </form>
     );
}
 
Formulario.propTypes = {
    guardarCargando: PropTypes.func.isRequired,
    guardarResumen: PropTypes.func.isRequired
}

export default Formulario;