function CotizadorCalculo({ categoria, ubicacion, metrosCuadrados, cotizacionData }) {
  const costoM2 = 35.86;

  if (categoria && ubicacion && metrosCuadrados) {
    const cotizacionCategoria = cotizacionData.find((item) => item.categoria === 'propiedad' && item.tipo === categoria);
    const cotizacionUbicacion = cotizacionData.find((item) => item.categoria === 'ubicacion' && item.tipo === ubicacion);

    if (cotizacionCategoria && cotizacionUbicacion) {
      const metros = parseFloat(metrosCuadrados);
      if (!isNaN(metros)) {
        const resultado = (costoM2 * cotizacionCategoria.factor * cotizacionUbicacion.factor * metros).toFixed(2);
        return resultado;
      }
    }
  }

  return null;
}

export default CotizadorCalculo;
