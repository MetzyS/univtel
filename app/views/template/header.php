<?php
include_once '../app/components/connexion.php';
$component = new ComponentsConnexion;
?>
<header>
    <nav class="margin">
        <div class="burger-menu none">
            <ul>
                <li>Contact</li>
                <li>Infos</li>
                <li>Localisation</li>
            </ul>
        </div>
        <?php
        if (isset($_SESSION['user'])) {
            if ($_SERVER['REQUEST_URI'] == '/www/univtel/public/message/index') {
                $component->changePswBtn();
            }
            if ($_SERVER['REQUEST_URI'] == '/www/univtel/public/connect/changepw' || $_SERVER['REQUEST_URI'] == '/www/univtel/public/message/show') {
                $component->messagePageBtn();
            }
            $component->logoutBtn();
        } else {
            echo '<a href="/www/univtel/public/home/index/" class="logo"></a>';
            echo '<input type="button" value="Contactez-nous" class="btn-contact-tab">';
        };
        ?>
    </nav>
</header>