<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$archivo = "../data/favoritos.json";
$method = $_SERVER["REQUEST_METHOD"];

// Leer el archivo
$favoritos = file_exists($archivo) ? json_decode(file_get_contents($archivo), true) : [];

switch ($method) {
    case "GET":
        echo json_encode($favoritos);
        break;

    case "POST":
        $data = json_decode(file_get_contents("php://input"), true);
        if (!isset($data["id"]) || !isset($data["titulo"])) {
            http_response_code(400);
            echo json_encode(["error" => "Faltan datos"]);
            exit;
        }

        // Verificar si ya existe
        foreach ($favoritos as $f) {
            if ($f["id"] == $data["id"]) {
                echo json_encode(["message" => "Ya está en favoritos"]);
                exit;
            }
        }

        $favoritos[] = $data;
        file_put_contents($archivo, json_encode($favoritos, JSON_PRETTY_PRINT));
        echo json_encode(["message" => "Agregado a favoritos"]);
        break;

    case "DELETE":
        $url = explode("/", $_SERVER["REQUEST_URI"]);
        $id = end($url);

        $favoritos = array_filter($favoritos, fn($f) => $f["id"] != $id);
        file_put_contents($archivo, json_encode(array_values($favoritos), JSON_PRETTY_PRINT));

        echo json_encode(["message" => "Eliminado de favoritos"]);
        break;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
?>
