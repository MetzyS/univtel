<?php
session_start();

if ($_POST['message'] && $_POST['email'] && $_POST['subject'] && $_POST['policy'] == 'policy') {
    if (mb_strlen($_POST['message']) > 500) {
        $_SESSION['form_error'] = 'Le message est trop long. 500 caractères maximum autorisé.';
        header('Location: /www/univtel/public/');
        exit();
    }
    $email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
    $subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_ENCODED);
    $message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_ENCODED);

    $_SESSION['contact'] = array(
        'email' => $email,
        'subject' => $subject,
        'message' => $message
    );
    header('Location: /www/univtel/public/message/send/');
    exit();
} else {
    $_SESSION['form_error'] = 'Votre demande de contact n&#39;a pas abouti. <br>Veuillez recommencer et veiller à bien remplir tous les champs.';
    header('Location: /www/univtel/public/');
}
