<?php

require_once '../../../core/db.php';

session_start();
if (isset($_SESSION['user']) && isset($_GET['id'])) {
    // Récupère l'ID via la méthode GET (exemple: url.php?id=41)
    $id_message = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

    $db = DB::getPdo();
    $sql = $db->prepare(
        'SELECT mail, sent_at, message, subject,status FROM message WHERE id_message = :id_message'
    );
    $sql->bindValue(':id_message', $id_message);
    $sql->execute();
    $result = $sql->fetch(PDO::FETCH_ASSOC);


    // traitement de la date (format YYYY/mm/dd => dd/mm/YYYY)
    $result['sent_at'] = explode(' ', $result['sent_at']);
    $result['sent_at'][0] = implode('/', array_reverse(explode('-', $result['sent_at'][0])));
    $result['sent_at'] = implode(' ', $result['sent_at']);


    // Affiche la réponse sous le format JSON (pour AJAX)
    echo json_encode($result);
    exit;
} else {
    header('Location: /www/univtel/home/index');
}
