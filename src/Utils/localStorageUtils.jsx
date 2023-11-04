export const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error al guardar en el almacenamiento local: ${error}`);
    }
  };
  
  export const getFromLocalStorage = (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch (error) {
      console.error(`Error al obtener datos del almacenamiento local: ${error}`);
      return defaultValue;
    }
  };
  