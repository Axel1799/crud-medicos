<?php
include 'database.php';
// Permitir el acceso desde cualquier origen (esto es solo para desarrollo; en producción, especifica el dominio exacto)
header("Access-Control-Allow-Origin: *");

// Permitir métodos específicos
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");

// Permitir cabeceras específicas
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$stmt = $pdo->query('SELECT * FROM records');
$patients = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($patients);

?>
