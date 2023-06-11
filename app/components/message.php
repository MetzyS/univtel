<?php

class ComponentsMessage
{
    /**
     * Affiche les messages stockés dans la BDD
     * @param array $message = tableau des messages
     */
    public function messageBlock(string $title, array $select)
    {
        echo '
            <div class="messages-block">
                <div class="messages-block-head">
                    <h1 class="messages-block-title">' . $title . '</h1>
                        <span class="messages-open-icon">';
        if (!empty($select)) {
            echo '<select name="order" id="select-order">';
            for ($i = 0; $i < count($select); $i++) {
                echo '<option value="' . $i . '">' . $select[$i] . '</option>';
            }
            echo '</select>';
        }
        echo '<svg viewBox="0 0 11 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.636402 1.01506L0.636402 12.736C0.636774 12.8546 0.669504 12.971 0.731067 13.0724C0.79263 13.1739 0.880695 13.2566 0.985785 13.3117C1.09087 13.3669 1.20901 13.3923 1.32747 13.3853C1.44593 13.3782 1.56023 13.339 1.65808 13.2719L10.1232 7.41143C10.4742 7.16854 10.4742 6.5838 10.1232 6.34026L1.65808 0.479806C1.56044 0.411971 1.44608 0.372191 1.32742 0.364788C1.20876 0.357385 1.09034 0.382642 0.985029 0.437815C0.879717 0.492988 0.791539 0.575967 0.730076 0.677736C0.668613 0.779505 0.636215 0.896172 0.636402 1.01506Z"/>
                        </svg>
                    </span>
                </div>
            </div>';
    }

    public function allMessagesBlock(string $title)
    {
        echo '
            <div class="messages-block">
                <div class="messages-block-head">
                    <h1 class="messages-block-title sec-color">' . $title . '</h1>
                    <span class="messages-open-icon"></span>
                </div>
            </div>';
    }

    public function messageGrid(array $messages = null)
    {
        echo '
            <div class="messages-grid">
                <span class="message-top">Mail</span><span class="message-top">Sujet</span><span class="message-top">Date</span><span class="message-top">Etat</span>';
        if (!empty($messages)) {
            echo '<div class="message-grid-row">
                    <span class="contact-infos-mail">teTZTZTZETZTZEst@mail.com</span><span class="contact-infos-subject">Devis</span><span class="contact-infos-date">11/01/01</span><span class="contact-info-state">X</span>
                </div>';
        } else {
            echo '<p class="message-empty">Aucun message a afficher </p>';
        }
        echo '</div>';
    }
}
