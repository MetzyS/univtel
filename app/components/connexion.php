<?php

class ComponentsConnexion
{
    public function connexionForm()
    {
        echo '
    <form action="/www/univtel/app/views/connect/processing/connexion.php" method="POST">
        <label for="mail">Email:</label>
        <input type="email" name="mail" id="mail">
        <label for="password">Mot de passe:</label>
        <input type="password" name="password" id="password">
        <input type="submit" value="submit">
        <input type="reset" value="reset">
    </form>
    ';
    }
}
