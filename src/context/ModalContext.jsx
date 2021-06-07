import React, {createContext, useEffect, useState} from 'react';
import axios from 'axios';

// Crear el context
export const ModalConext = createContext();

const ModalProvider = (props) => {

    // State del provider
    const [idReceta, guardarIdReceta] = useState(null);
    const [informacion, guardarReceta] = useState({});

    // Una vez que tenemos una receta, llamar la api
    useEffect(() => {
        const obtenerReceta = async () => {
            if(!idReceta) return;

            const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${idReceta}`;

            const resultado = await axios.get(url);

            guardarReceta(resultado.data.drinks[0]);
        }
        obtenerReceta();
    }, [idReceta])

    return (
        <ModalConext.Provider
            value={{
                informacion,
                guardarIdReceta,
                guardarReceta
            }}
        >
            {props.children}
        </ModalConext.Provider>
    );
}

export default ModalProvider;