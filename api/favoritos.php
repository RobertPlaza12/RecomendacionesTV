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
        // Aceptar id por query (?id=) o por último segmento de la URI
        $id = null;
        if (isset($_GET['id']) && $_GET['id'] !== '') {
            $id = $_GET['id'];
        } else {
            $url = explode("/", $_SERVER["REQUEST_URI"]);
            $id = end($url);
        }

        if ($id === null || $id === '') {
            http_response_code(400);
            echo json_encode(["error" => "Falta id para eliminar"]);
            exit;
        }

        $favoritos = array_filter($favoritos, function($f) use ($id) { return $f["id"] != $id; });
        $ok = file_put_contents($archivo, json_encode(array_values($favoritos), JSON_PRETTY_PRINT));
        if ($ok === false) {
            http_response_code(500);
            echo json_encode(["error" => "No se pudo escribir el archivo de favoritos"]);
            exit;
        }

        echo json_encode(["message" => "Eliminado de favoritos"]);
        break;

    case "OPTIONS":
        // Para preflight CORS
        http_response_code(200);
        exit;

    default:
        http_response_code(405);
        echo json_encode(["error" => "Método no permitido"]);
        break;
}
?>
