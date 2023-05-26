<?php

include 'db.php';

class Storemsg
{
    public function storeMessage(string $name, string $mail, string $subject, string $message)
    {
        $db = DB::getPdo();
        $sql = $db->prepare(
            'INSERT INTO message (name, email, subject, message, sent_at)
            VALUES (:name, :mail, :subject, :message, NOW())'
        );
        $sql->bindParam(':name', $name);
        $sql->bindParam(':mail', $mail);
        $sql->bindParam(':subject', $subject);
        $sql->bindParam(':message', $message);

        $sql->execute();
    }
}
