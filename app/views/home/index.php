    <main>
        <section class="contact margin">
            <span class="art"></span>
            <h1 class="contact-title">Les <span class="contact-title--accent">professionnels</span><br>
                de la <span class="contact-title--accent">réparation.</span>
            </h1>
            <span class="landscape-img"></span>
            <div class="desktop-infos">
                <div>
                    <h2 class="infos-title">7+</h2>
                    <span class="infos-text">années d'expérience</span>
                </div>
                <div>
                    <h2 class="infos-title">2</h2>
                    <span class="infos-text">boutiques</span>
                </div>
                <div>
                    <h2 class="infos-title infos-title--text">des milliers</h2>
                    <span class="infos-text infos-text-m">de clients satisfaits</span>
                </div>
            </div>

            <div>
                <p class="contact-text">Nous réparons tout type de smartphones,<br>
                    tablettes, ordinateurs et consoles de jeu.<br>
                    N'hésitez pas à demander votre devis !
                </p>
                <?php
                if (isset($_SESSION['form_error'])) {
                    echo '<p class="error-msg">' . $_SESSION['form_error'] . '</p>';
                    unset($_SESSION['form_error']);
                }
                if (isset($data['message'])) {
                    echo '<p class="confirm-msg">' . $data['message'] . '</p>';
                    unset($data['message']);
                }
                ?>
            </div>
            <input type="button" class="btn-contact" value="Contactez-nous">
            <span class="contact-img"></span>

        </section>
        <section class="infos margin">
            <div class="info-group">
                <h2 class="infos-title">7+</h2>
                <span class="infos-text">années d'expérience</span>
            </div>
            <div class="info-group">
                <h2 class="infos-title">2</h2>
                <span class="infos-text">boutiques</span>
            </div>
            <div class="info-group">
                <h2 class="infos-title infos-title--text">des milliers</h2>
                <span class="infos-text infos-text-m">de clients satisfaits</span>
            </div>
        </section>
        <section class="localisation">
            <h2 class="localisation-title">Rendez-nous <span class="localisation-title--accent">visite</span><br>dans
                l'une
                de nos<br><span class="localisation-title--accent">boutique.</span></h2>
            <div class="caroussel-wrapper">
                <input type="button" value="prev" class="mobile-nav" id="prev">
                <div class="localisation-caroussel">
                    <div class="localisation-first">
                        <p class="caroussel-title"><span class="caroussel-title--accent">Béziers</span> - 65 Avenue
                            Georges Clémenceau
                        </p>
                        <div class="caroussel-nav">
                            <div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1450.7115723317936!2d3.2183173407605974!3d43.34725875036921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b10e6205afd4e3%3A0xbd48e60e96a6de7b!2sL&#39;univers%20du%20t%C3%A9l%C3%A9phone!5e0!3m2!1sfr!2sfr!4v1684974919627!5m2!1sfr!2sfr" class="maps" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                        </div>
                        <p class="number"><span class="caroussel-num">tel: </span><a href="tel:+33973180907" class="caroussel-num">09 51 53 52 46</a></p>
                    </div>
                    <div class="localisation-second none">
                        <p class="caroussel-title"><span class="caroussel-title--accent">Pézenas</span> - 25 Rue
                            Anatole France
                        </p>
                        <div class="caroussel-nav">
                            <div class="map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2896.078128397478!2d3.4200603767099182!3d43.45896606497085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12b141e7acc15bf9%3A0xfdac061425bd4c0!2sL&#39;univers%20du%20t%C3%A9l%C3%A9phone%20-%20R%C3%A9paration%20t%C3%A9l%C3%A9phonique%2FPC%2Ftablette%20toutes%20marques!5e0!3m2!1sfr!2sfr!4v1685012918938!5m2!1sfr!2sfr" class="maps" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
                        </div>
                        <p class="number"><span class="caroussel-num">tel: </span><a href="tel:+33973180907" class="caroussel-num">09 73 18 09 07</a></p>
                    </div>
                </div>
                <input type="button" value="next" class="mobile-nav" id="next">
            </div>
        </section>
    </main>