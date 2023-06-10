<?php

class ComponentsConnexion
{
    public function connexionForm()
    {
        echo '
    <form action="/www/univtel/app/views/connect/processing/connexion.php" method="POST" class="connexion-form margin">
        <div class="input-container">
            <label for="mail" class="label-input">Email:</label>
            <input type="email" name="mail" id="mail">
        </div>
        <div class="input-container">
            <label for="password" class="label-input">Mot de passe:</label>
            <input type="password" name="password" id="password">
        </div>
        <div class="input-container">
            <input type="submit" value="Se connecter">
        </div>
    </form>
    ';
    }
}
