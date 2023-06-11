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

    public function getMsg()
    {
    }
}
