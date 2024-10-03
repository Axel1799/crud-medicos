import React from 'react';
import PatientsList from './components/PatientsList';  // Importamos el componente de la lista de pacientes

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Sistema de Gestión de Dengue</h1>
      <PatientsList /> 
    </div>
  );
};

export default App;
