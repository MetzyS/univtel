<?php

include 'db.php';

class Storemsg
{
    /**
     * Enregistre un message dans la bdd
     * @param string $mail
     * @param string $subject
     * @param string $message
     * @return void
     */
    public function storeMessage(string $mail, string $subject, string $message)
    {
        $db = DB::getPdo();
        $sql = $db->prepare(
            'INSERT INTO message (email, subject, message, sent_at)
            VALUES (:mail, :subject, :message, NOW())'
        );
        $sql->bindParam(':mail', $mail);
        $sql->bindParam(':subject', $subject);
        $sql->bindParam(':message', $message);

        $sql->execute();
    }
}
