import React, { useState, useEffect, useContext, createContext } from 'react';
import { getFromLocalStorage } from '../Utils/localStorageUtils';

const CotizacionesContext = createContext();

export const CotizacionesProvider = ({ children }) => {
  const [cotizaciones, setCotizaciones] = useState([]);

  useEffect(() => {
    const historialGuardado = getFromLocalStorage('historialCotizaciones');
    if (historialGuardado) {
      setCotizaciones(historialGuardado);
    }
  }, []);

  const limpiarHistorial = () => {
    setCotizaciones([]);

    localStorage.removeItem('historialCotizaciones');
  };

  return (
    <CotizacionesContext.Provider value={{ cotizaciones, setCotizaciones, limpiarHistorial }}>
      {children}
    </CotizacionesContext.Provider>
  );
};

export const useCotizaciones = () => {
  return useContext(CotizacionesContext);
};
