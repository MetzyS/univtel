<?php

require_once '../../../core/db.php';

session_start();
if (isset($_SESSION['user'])) {
    $id_message = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
    $db = DB::getPdo();
    $sql = $db->prepare(
        'SELECT mail, sent_at, message, status FROM message WHERE id_message = :id_message'
    );
    $sql->bindValue(':id_message', $id_message);
    $sql->execute();

    $result = $sql->fetch(PDO::FETCH_ASSOC);
    $result = json_encode($result);
    var_dump($result);
}
