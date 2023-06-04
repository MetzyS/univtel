<?php
session_start();

$name = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$subject = filter_input(INPUT_POST, 'subject', FILTER_SANITIZE_FULL_SPECIAL_CHARS);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_FULL_SPECIAL_CHARS);


$_SESSION['contact'] = array(
    'nom' => $name,
    'email' => $email,
    'subject' => $subject,
    'message' => $message
);

header('Location: msg/setmsg.php');
exit();
