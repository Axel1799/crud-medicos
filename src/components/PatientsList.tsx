import React, { useState, useEffect } from 'react';
import api from '../api';
import PatientForm from './PatientForm';

interface Patient {
  id: number;
  patient_name: string;
  diagnosis: string;
  treatment: string;
  admission_date: string;
  discharge_date: string;
}

const PatientsList: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  useEffect(() => {
    fetchPatients(); 
  }, []);

  const fetchPatients = async () => {
    try {
      const response = await api.get('/get_records.php', {
        withCredentials: true, // Asegura que las credenciales (como cookies) se envíen si es necesario
      });
      setPatients(response.data);
    } catch (error) {
      console.error('Error al obtener los pacientes:', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await api.delete(`/delete_record.php?id=${id}`);
      fetchPatients();
    } catch (error) {
      console.error('Error al eliminar el paciente:', error);
    }
  };

  const handleEdit = (patient: Patient) => {
    setSelectedPatient(patient);
  };

  const clearSelectedPatient = () => {
    setSelectedPatient(null);
    fetchPatients();
  };

  return (
    <div className="patients-list-container">
      <h2 className="patients-list-title">Sistema de Gestión de Dengue</h2>
      <h3 className="patients-list-subtitle">Lista de Pacientes</h3>
      
      <PatientForm
        initialData={selectedPatient || undefined}
        onSuccess={clearSelectedPatient}
      />
      
      {patients.length > 0 ? (
        <table className="patients-table">
          <thead>
            <tr>
              <th>Nombre del Paciente</th>
              <th>Diagnóstico</th>
              <th>Tratamiento</th>
              <th>Fecha de Ingreso</th>
              <th>Fecha de Alta</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {patients.map(patient => (
              <tr key={patient.id}>
                <td>{patient.patient_name}</td>
                <td>{patient.diagnosis}</td>
                <td>{patient.treatment}</td>
                <td>{new Date(patient.admission_date).toLocaleDateString()}</td>
                <td>{new Date(patient.discharge_date).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleEdit(patient)}>Editar</button>
                  <button onClick={() => handleDelete(patient.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No se encontraron pacientes.</p>
      )}
    </div>
  );
};

export default PatientsList;
