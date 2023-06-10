<?php

class Validator
{
    /**
     * Vérifie si l'email donné en argument respecte le format standard
     *
     * @param string $mail
     * @return bool
     */
    public static function mailRegex(string $mail)
    {
        $mailLowercase = strtolower($mail);
        $pattern = "/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,6})$/i";
        return preg_match($pattern, $mailLowercase);
    }

    /**
     * Vérifie si le mot de passe donné en argument respecte le format dans $pattern
     *
     * @param string $psw
     * @return bool
     */
    public static function passwordRegex(string $psw)
    {
        $pattern = "/(?=^.{8,16}$)((?=.*\d)(?=.*\w+))(?![.\n])(?=.*[A-Z])(?=.*[a-z])(?=.*[$&+,:;=?@#_*-]).*$/";
        return preg_match($pattern, $psw);
    }
}
