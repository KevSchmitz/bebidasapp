/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const BebidasContext = createContext();

export const BebidasProvider = ({ children }) => {
  const [bebidas, setBebidas] = useState([]);
  const [modal, setModal] = useState(false);
  const [bebidaId, setBebidaId] = useState(null);
  const [receta, setReceta] = useState({});
  const [cargando, setCargando] = useState(false);

  const consultarBebida = async (datos) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${datos.nombre}&c=${datos.categoria}`;
      const { data } = await axios(url);
      setBebidas(data.drinks);
    } catch (error) {
      console.log(error);
    }
  };

  const handleModalClick = () => {
    setModal(!modal);
  };

  const handleBebidaIdClick = (id) => {
    setBebidaId(id);
  };

  useEffect(() => {
    const obtenerIngredientes = async () => {
      try {
        setCargando(true);
        if (!bebidaId) return;

        const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${bebidaId}`;
        const { data } = await axios(url);
        setReceta(data.drinks[0]);
      } catch (error) {
        console.log(error);
      } finally {
        setCargando(false);
      }
    };
    obtenerIngredientes();
  }, [bebidaId]);

  const mostrarIngredientes = () => {
    let ingredientes = [];
    for (let i = 1; i < 16; i++) {
      if (receta[`strIngredient${i}`]) {
        ingredientes.push(
          <li>
            {receta[`strIngredient${i}`]} {receta[`strMeasure${i}`]}
          </li>
        );
      }
    }
    return ingredientes;
  };

  return (
    <BebidasContext.Provider
      value={{
        bebidas,
        cargando,
        consultarBebida,
        handleBebidaIdClick,
        handleModalClick,
        modal,
        mostrarIngredientes,
        receta,
      }}
    >
      {children}
    </BebidasContext.Provider>
  );
};
