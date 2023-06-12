<?php

session_start();

if (!isset($_SESSION['user'])) {
    header('Location: /www/univtel/');
    exit();
} else {
    if ($_POST['mail'] && $_POST['password']) {
        $mail = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_EMAIL);
        $oldPassword = filter_input(INPUT_POST, 'oldPassword');
        $password = filter_input(INPUT_POST, 'password');

        $_SESSION['change'] = array(
            'mail' => $mail,
            'oldPassword' => $oldPassword,
            'password' => $password
        );

        header('Location: /www/univtel/connect/change/');
        exit();
    } else {
        header('Location: /www/univtel/');
        exit();
    }
}
