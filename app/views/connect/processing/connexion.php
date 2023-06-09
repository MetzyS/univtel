<?php
session_start();
if (isset($_SESSION['mail'])) {
    unset($_SESSION['mail']);
}
if (isset($_SESSION['password'])) {
    unset($_SESSION['password']);
}

if ($_POST['mail'] && $_POST['password']) {
    $mail = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_EMAIL);
    $password = filter_input(INPUT_POST, 'password');
    $_SESSION['mail'] = $mail;
    $_SESSION['password'] = $password;

    echo '<pre>';
    var_dump($_SESSION);
    die();
    header('Location: /www/univtel/connect/connect');
    exit();
} else {
    $this->redirect('home/index'); // 404 !!
}
