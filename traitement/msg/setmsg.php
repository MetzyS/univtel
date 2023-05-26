<?php
session_start();

if (isset($_SESSION['contact'])) {
    include 'storemsg.php';
    $store = new Storemsg();

    if (isset($_SESSION['confirm'])) {
        unset($_SESSION['confirm']);
    }

    $name = $_SESSION['contact']['nom'];
    $email = $_SESSION['contact']['email'];
    $subject = $_SESSION['contact']['subject'];
    $message = $_SESSION['contact']['message'];

    unset($_SESSION['contact']);
    $store->storeMessage($name, $email, $subject, $message);
    $_SESSION['confirm'] = 'Votre message a bien été envoyé.<br>Vous serez recontacté par mail.';
    header('Location: ../../index.php');
} else {
    header('Location: ../../index.php');
};
