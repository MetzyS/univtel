<?php

require_once '../../../core/db.php';

session_start();
if (isset($_SESSION['user']) && isset($_GET['id'])) {
    // Récupère l'ID via la méthode GET (exemple: url.php?id=41)
    $id_message = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

    try {
        $db = DB::getPdo();
        // Requête infos pour requête AJAX
        $sql = $db->prepare(
            'SELECT mail, sent_at, message, subject,status FROM message WHERE id_message = :id_message'
        );
        $sql->bindValue(':id_message', $id_message);
        $sql->execute();
        $result = $sql->fetch(PDO::FETCH_ASSOC);

        // Requête changement status message (lu)
        $sql2 = $db->prepare(
            'UPDATE message SET status = "read" WHERE id_message = :id_message'
        );
        $sql2->bindValue(':id_message', $id_message);
        $sql2->execute();


        // traitement de la date (format YYYY/mm/dd => dd/mm/YYYY)
        $result['sent_at'] = explode(' ', $result['sent_at']);
        $result['sent_at'][0] = implode('/', array_reverse(explode('-', $result['sent_at'][0])));
        $result['sent_at'] = implode(' ', $result['sent_at']);

        // traitement du sujet de la prise de contact
        switch ($result['subject']) {
            case 1:
                $result['subject'] = 'Demande de devis';
            case 2:
                $result['subject'] = "Demande d'informations";
            case 3:
                $result['subject'] = 'Autre (précisé dans le message)';
        }
        // Affiche la réponse sous le format JSON (pour AJAX)
        echo json_encode($result);
    } catch (Exception $e) {
        $errorCode = $e->getCode();
        $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        return $data;
    }
    exit;
} else {
    header('Location: /www/univtel/home/index');
}
