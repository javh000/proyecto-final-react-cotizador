import React from 'react';
import { Link } from 'react-router-dom';
import { useCotizaciones } from '../context/CotizacionesContext';
import styles from '../styles/App.module.css';

function HistorialCotizaciones() {
  const { cotizaciones, limpiarHistorial } = useCotizaciones();

  return (
    <section className={styles['section-cotizador']}>
      <h1>Historial de Cotizaciones</h1>

      <button onClick={limpiarHistorial}>Limpiar Historial</button>

      <ul className={styles['cotizaciones-list']}>
        {cotizaciones.map((cotizacion, index) => (
          <li key={index} className={styles['cotizacion-item']}>
            <div className={styles['cotizacion-details']}>
              <strong>Fecha de Cotización:</strong> {cotizacion.horaCalculo}
              <br />
              <strong>Categoría:</strong> {cotizacion.categoria}
              <br />
              <strong>Ubicación:</strong> {cotizacion.ubicacion}
              <br />
              <strong>M²:</strong> {cotizacion.metrosCuadrados}
              <br />
              <strong>Importe Póliza:</strong> ${cotizacion.resultado}
            </div>
          </li>
        ))}
      </ul>
      <Link to="/">Volver al Cotizador</Link>
    </section>
  );
}

export default HistorialCotizaciones;
