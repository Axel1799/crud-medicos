<?php
include 'database.php'; // Conexión a la base de datos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Decodificar el cuerpo de la solicitud para obtener los datos en formato JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que todos los campos requeridos estén presentes
if (isset($data['patient_name'], $data['diagnosis'], $data['treatment'], $data['admission_date'], $data['discharge_date'])) {
    
    // Preparar la consulta SQL para insertar los datos en la base de datos
    $stmt = $pdo->prepare('INSERT INTO patients (patient_name, diagnosis, treatment, admission_date, discharge_date) 
                           VALUES (:patient_name, :diagnosis, :treatment, :admission_date, :discharge_date)');
    
    // Ejecutar la consulta con los datos recibidos
    $stmt->execute([
        'patient_name' => $data['patient_name'],
        'diagnosis' => $data['diagnosis'],
        'treatment' => $data['treatment'],
        'admission_date' => $data['admission_date'],
        'discharge_date' => $data['discharge_date'],
    ]);
    
    // Responder con un mensaje de éxito
    echo json_encode(['message' => 'Paciente agregado exitosamente']);
} else {
    // Si faltan datos, responder con un mensaje de error
    echo json_encode(['message' => 'Datos inválidos']);
}
?>
