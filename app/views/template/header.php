<?php
include_once 'app/components/connexion.php';
$component = new ComponentsConnexion;
?>
<header>
    <nav class="margin">
        <input type="button" class="btn-burger" value="burger">
        <div class="burger-menu none">
            <ul>
                <li>Contact</li>
                <li>Infos</li>
                <li>Localisation</li>
            </ul>
        </div>
        <?php
        if (isset($_SESSION['user'])) {
            $component->logoutBtn();
        } else {
            echo '<a href="/www/univtel/home/index/" class="logo"></a>';
            echo '<input type="button" value="Contactez-nous" class="btn-contact-tab">';
        };
        ?>
    </nav>
</header>