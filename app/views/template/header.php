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
            <a href="/www/univtel/home/index/" class="logo"></a>
            <?php
            if (isset($_SESSION['admin'])) {
                echo 'admin';
            } else {
                echo '<input type="button" value="Contactez-nous" class="btn-contact-tab">';
            };
            ?>
        </nav>
    </header>