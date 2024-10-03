import React, { useState } from 'react';
import api from '../api'; // Asegúrate de que la ruta sea correcta según tu estructura de carpetas

interface PatientFormProps {
  initialData?: {
    id?: number;
    patient_name: string;
    diagnosis: string;
    treatment: string;
    admission_date: string;
    discharge_date: string;
  };
  onSuccess: () => void; // Función a ejecutar al completar el formulario
}

const PatientForm: React.FC<PatientFormProps> = ({ initialData, onSuccess }) => {
  const [formData, setFormData] = useState({
    patient_name: initialData?.patient_name || '',
    diagnosis: initialData?.diagnosis || '',
    treatment: initialData?.treatment || '',
    admission_date: initialData?.admission_date || '',
    discharge_date: initialData?.discharge_date || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialData?.id) {
        // Actualización de un registro existente
        await api.put(`/update_record.php?id=${initialData.id}`, formData);
      } else {
        // Creación de un nuevo registro
        await api.post('/create_record.php', formData);
      }
      onSuccess(); // Llama a la función onSuccess después de un envío exitoso
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Nombre del Paciente</label>
        <input
          type="text"
          name="patient_name"
          value={formData.patient_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Diagnóstico</label>
        <input
          type="text"
          name="diagnosis"
          value={formData.diagnosis}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Tratamiento</label>
        <input
          type="text"
          name="treatment"
          value={formData.treatment}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Ingreso</label>
        <input
          type="date"
          name="admission_date"
          value={formData.admission_date}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Fecha de Alta</label>
        <input
          type="date"
          name="discharge_date"
          value={formData.discharge_date}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">
        {initialData ? 'Actualizar Paciente' : 'Agregar Paciente'}
      </button>
    </form>
  );
};

export default PatientForm;
