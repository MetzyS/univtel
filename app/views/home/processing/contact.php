<?php
session_start();

$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);


$_SESSION['contact'] = array(
    'email' => $email,
    'subject' => $subject,
    'message' => $message
);
header('Location: /www/univtel/message/send/');
exit();
