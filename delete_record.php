<?php
include 'database.php'; // Conexión a la base de datos
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");


// Obtener el ID del registro a eliminar
$id = $_GET['id'];

if ($id) {
    // Preparar la consulta SQL para eliminar el registro
    $stmt = $pdo->prepare('DELETE FROM records WHERE id = :id');
    
    // Ejecutar la consulta
    $stmt->execute(['id' => $id]);
    
    // Responder con un mensaje de éxito
    echo json_encode(['message' => 'Paciente eliminado exitosamente']);
} else {
    // Si falta el ID, responder con un mensaje de error
    echo json_encode(['message' => 'ID inválido']);
}
?>
