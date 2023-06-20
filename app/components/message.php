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

    /**
     * Génère le code HTML pour le block "tous les messages"
     * @param string $title = titre du block
     */
    public function allMessagesBlock(string $title)
    {
        echo '
            <div class="messages-block">
                <div class="messages-block-head">
                    <a href="/www/univtel/message/show" class="messages-block-title sec-color">' . $title . '</a>
                    <span class="messages-open-icon"></span>
                </div>
            </div>';
    }

    /**
     * Affiche la liste des messages donnés en arguments
     * @param array $messages 
     */
    public function messageGrid(array $messages = null)
    {
        echo '
            <div class="messages-grid">
                <span class="message-top">Mail</span><span class="message-top">Sujet</span><span class="message-top">Date</span><span class="message-top message-center">Etat</span>';
        if (!empty($messages)) {
            foreach ($messages as $id => $array) {
                echo '<div class="message-grid-row" id="message-' . $array['id_message'] . '">';
                foreach ($array as $key => $value) {
                    switch ($key) {
                        case 'id_message':
                            continue 2;
                        case 'message':
                            continue 2;
                        case 'subject':
                            // echo $value;
                            switch ($value) {
                                case 1:
                                    $value = 'Devis';
                                    break;
                                case 2:
                                    $value = 'Infos';
                                    break;
                                case 3:
                                    $value = 'Autre';
                                    break;
                            }
                    }

                    if ($key == 'mail') {
                        echo '<span class="contact-infos contact-mail">' . $value . '</span>';
                        continue;
                    }
                    if ($key == 'sent_at') {
                        $value = strtotime($value);
                        $value = date("d-m-Y", $value);
                    }
                    if ($value == 'read' || $value == 'unread' || $value == 'answered') {
                        echo '<button type="button" class="default-btn contact-infos ' . $value . '"></button>';
                    } else {
                        echo '<span class="contact-infos">' . $value . '</span>';
                    }
                }
                echo '</div>';
            }
        } else {
            echo '<p class="message-empty">Aucun message a afficher </p>';
        }
        echo '</div>';
    }

    /**
     * Affiche la bar de navigation des messages
     * @param int $messageCount = tableau nb messages et nb msg non lu
     */
    public function messageBar(int $messageCount = null, int $messageCountUnread = null)
    {
        echo '    <div class="messages-bar">
        <span class="messages-search-icon"></span>
        <span class="messages-unread">Non lu: <span class="messages-unread-nb">' . $messageCountUnread . '</span></span>
        <span class="messages-total">Total: <span class="messages-total-nb">' . $messageCount . '</span></span>
    </div>';
    }
}
