import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CotizadorForm from './components/CotizadorForm';
import HistorialCotizaciones from './components/HistorialCotizaciones';
import './styles/App.module.css';
import { CotizacionesProvider } from './context/CotizacionesContext';

function App() {
  return (
    <BrowserRouter>
      <CotizacionesProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<CotizadorForm />} />
            <Route path="/historial" element={<HistorialCotizaciones />} />
          </Routes>
        </div>
      </CotizacionesProvider>
    </BrowserRouter>
  );
}

export default App;
