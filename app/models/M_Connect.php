<?php

class M_Connect extends Model
{
    /**
     * Verifie les infos entrés par l'utilisateur pour la connexion
     * @param string $mail = adresse mail
     * @param string $password = mot de passe
     * @return array
     */
    public function checkUser(string $mail, string $password)
    {
        $db = DB::getPdo();
        $sql = $db->prepare(
            'SELECT * 
            FROM user 
            WHERE user_mail = :mail'
        );
        $sql->bindParam(':mail', $mail);
        $sql->execute();
        $data = $sql->fetch();

        return $data;
    }
}
