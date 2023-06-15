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
     * Récupère les 10 derniers messages stockés dans la BDD
     * @return array
     */
    public function getRecentMsg()
    {
        try {
            $db = DB::getPdo();
            $sql = $db->query('SELECT id_message, mail, subject, message, sent_at, status FROM message ORDER BY sent_at DESC LIMIT 10');
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_NAMED);
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }

    /**
     * Récupère les 10 derniers messages stockés dans la BDD
     * @return array
     */
    public function getAllMsg()
    {
        try {
            $db = DB::getPdo();
            $sql = $db->query('SELECT id_message, mail, subject, message, sent_at, status FROM message ORDER BY sent_at DESC');
            $sql->execute();
            $data = $sql->fetchAll(PDO::FETCH_NAMED);
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }

    /**
     * Récupère le nombre de messages stockés dans la BDD
     * @return int
     */
    public function getCountMsg()
    {
        try {
            $db = DB::getPdo();
            $sql = $db->query('SELECT COUNT(*) FROM message');
            $sql->execute();
            $data = $sql->fetch(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }

    /**
     * Récupère le nombre de messages stockés dans la BDD
     * @return int
     */
    public function getCountMsgUnread()
    {
        try {
            $db = DB::getPdo();
            $sql = $db->query('SELECT COUNT(*) FROM message WHERE status = "unread"');
            $sql->execute();
            $data = $sql->fetch(PDO::FETCH_COLUMN);
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }

    /**
     * Change le statut d'un message dans la BDD
     * @param int $id = message id
     * @param string $status = nouveau statut
     * @return string $data = msg si erreur avec la requête
     */
    public function changeMessageStatus($id, $status)
    {
        try {
            $db = DB::getPdo();
            $sql = $db->prepare('UPDATE message SET status = :status WHERE id_message = :id_message');
            $sql->bindParam(':status', $status);
            $sql->bindParam(':id_message', $id);
            $sql->execute();
            $data = 'OK';
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }

    /**
     * Supprime un message de la base de données
     * @param int $id = message id
     * @return string $data = msg confirmation ou msg erreur
     */
    public function deleteMessageById($id)
    {
        try {
            $db = DB::getPdo();
            $sql = $db->prepare('DELETE FROM message WHERE id_message = :id_message');
            $sql->bindParam(':id_message', $id);
            $sql->execute();
            $data = 'Le message à bien été supprimé.';
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }
}
