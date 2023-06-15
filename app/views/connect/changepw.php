<?php

$component = new ComponentsConnexion;
?>

<section class="margin">
    <h1 class="margin connexion-title">Modifier son profil</h1>
    <?php
    if (isset($_SESSION['confirm'])) {
        echo '<p class="margin confirm-message">' . $_SESSION['confirm'] . '</p>';
        unset($_SESSION['confirm']);
    }
    $component->changePswForm();
    ?>
</section>