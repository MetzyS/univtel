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
        try {
            $db = DB::getPdo();
            $sql = $db->prepare(
                'SELECT * 
            FROM user 
            WHERE user_mail = :mail'
            );
            $sql->bindParam(':mail', $mail);
            $sql->execute();
            $data = $sql->fetch(PDO::FETCH_NAMED);

            if ($data && password_verify($password, $data['user_password'])) {
                unset($data['user_password']);
                return $data;
            }
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
            return $data;
        }
        return false;
    }


    public function changePassword(array $array)
    {
        $array['password'] = password_hash($array['password'], PASSWORD_BCRYPT);
        try {
            $db = DB::getPdo();
            $sql = $db->prepare(
                'UPDATE user
            SET user_password = :password
            WHERE user_mail = :mail'
            );
            $sql->bindParam(':password', $array['password']);
            $sql->bindParam(':mail', $array['mail']);
            $sql->execute();
            $data = 'Changement effectué.';
        } catch (Exception $e) {
            $errorCode = $e->getCode();
            $data = "Une erreur est survenue lors de la communication avec la base de données. Veuillez contacter l'administrateur du système pour obtenir de l'aide. Code d'erreur: " . $errorCode;
        }
        return $data;
    }
}
