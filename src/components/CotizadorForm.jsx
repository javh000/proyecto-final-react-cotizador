import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CotizadorCalculo from '../Utils/CotizadorCalculo';
import styles from '../styles/App.module.css';
import Swal from 'sweetalert2';
import { useCotizaciones } from '../context/CotizacionesContext';
import { saveToLocalStorage, getFromLocalStorage } from '../Utils/localStorageUtils';

function CotizadorForm() {
  const [categoria, setCategoria] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [metrosCuadrados, setMetrosCuadrados] = useState('');
  const { cotizaciones, setCotizaciones } = useCotizaciones();
  const [resultadoCotizacion, setResultadoCotizacion] = useState(null);
  const [cotizacionData, setCotizacionData] = useState([]);

  useEffect(() => {
    fetch('/data/cotizacionData.json')
      .then((response) => response.json())
      .then((data) => {
        setCotizacionData(data);
      })
      .catch((error) => {
        console.error('Error al cargar el archivo JSON:', error);
      });
  }, []);

  const handleCategoriaChange = (e) => {
    setCategoria(e.target.value);
  };

  const handleUbicacionChange = (e) => {
    setUbicacion(e.target.value);
  };

  const handleMetrosCuadradosChange = (e) => {
    setMetrosCuadrados(e.target.value);
  };

  const handleCalcular = () => {
    const resultado = CotizadorCalculo({ categoria, ubicacion, metrosCuadrados, cotizacionData });

    if (resultado !== null) {
      setResultadoCotizacion(resultado);
      } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos o verifique los datos ingresados.',
      });
    }
  };

  const handleGuardarCotizacion = () => {
    if (resultadoCotizacion !== null) {
      const fechaHoraActual = new Date().toLocaleString();

      const nuevaCotizacion = {
        categoria: categoria,
        ubicacion: ubicacion,
        metrosCuadrados: metrosCuadrados,
        resultado: resultadoCotizacion,
        horaCalculo: fechaHoraActual,
      };

      const nuevoHistorial = [...cotizaciones, nuevaCotizacion];
      setCotizaciones(nuevoHistorial);

      saveToLocalStorage('historialCotizaciones', nuevoHistorial);

      setCategoria('');
      setUbicacion('');
      setMetrosCuadrados('');
      setResultadoCotizacion(null);
      } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No hay una cotización para guardar. Calcule primero.',
      });
    }
  };

  useEffect(() => {
    const historialGuardado = getFromLocalStorage('historialCotizaciones');
    if (historialGuardado) {
      setCotizaciones(historialGuardado);
    }
  }, []);

  const opcionesCategoria = cotizacionData
    .filter((item) => item.categoria === 'propiedad')
    .map((item) => (
      <option key={item.tipo} value={item.tipo}>
        {item.tipo}
      </option>
    ));

  const opcionesUbicacion = cotizacionData
    .filter((item) => item.categoria === 'ubicacion')
    .map((item) => (
      <option key={item.tipo} value={item.tipo}>
        {item.tipo}
      </option>
    ));

  return (
    <section className={styles['section-cotizador']}>
      <h1>Cotizador de Seguros</h1>
      <form>
        <label>Categoría de Propiedad:</label>
        <select value={categoria} onChange={handleCategoriaChange}>
          <option value="">Seleccione una categoría</option>
          {opcionesCategoria}
        </select>

        <label>Ubicación:</label>
        <select value={ubicacion} onChange={handleUbicacionChange}>
          <option value="">Seleccione una ubicación</option>
          {opcionesUbicacion}
        </select>

        <label>Metros Cuadrados:</label>
        <input
          type="number"
          value={metrosCuadrados}
          onChange={handleMetrosCuadradosChange}
          placeholder="Ingrese los metros cuadrados"
        />

        <div className={styles['div-bottom']}>
          <button type="button" onClick={handleCalcular}>
            Calcular
          </button>

          <button type="button" onClick={handleGuardarCotizacion}>
            Guardar
          </button>
        </div>

        <p>Cotización: ${resultadoCotizacion}</p>
        

      </form>

      <Link to="/historial">Ver Historial de Cotizaciones</Link>
    </section>
  );
}

export default CotizadorForm;
