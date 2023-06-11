<?php

class M_Message extends Model
{
    public function sendMessage(array $contact)
    {
        try {
            $mail = $contact['email'];
            $subject = $contact['subject'];
            $message = $contact['message'];
            $db = DB::getPdo();
            $sql = $db->prepare(
                'INSERT INTO message (mail, subject, message, sent_at)
            VALUES (:mail, :subject, :message, NOW())'
            );
            $sql->bindParam(':mail', $mail);
            $sql->bindParam(':subject', $subject);
            $sql->bindParam(':message', $message);

            $sql->execute();
            $data = 'Votre message a bien été envoyé. Vous serez recontacté par mail.';
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }

    /**
     * Récupère les messages stockés dans la BDD
     */
    public function getRecentMsg()
    {
        try {
            $db = DB::getPdo();
            $sql = $db->query('SELECT id_message, mail, subject, message, sent_at, status FROM message ORDER BY id_message DESC LIMIT 10');
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_NAMED);
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }
}
