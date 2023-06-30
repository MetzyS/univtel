<?php
ob_start();
session_start();

use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\PHPMailer;

require '../../../vendor/phpmailer/phpmailer/src/Exception.php';
require '../../../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../../../vendor/phpmailer/phpmailer/src/SMTP.php';

if (isset($_SESSION['user']) && isset($_POST['mail']) && isset($_POST['reply'])) {
    $replyMail = filter_input(INPUT_POST, 'mail', FILTER_SANITIZE_EMAIL);
    $replyMessage = filter_input(INPUT_POST, 'reply', FILTER_DEFAULT);
    $previousMessage = filter_input(INPUT_POST, 'previousMessage', FILTER_DEFAULT);

    $mail = new PHPMailer(true);

    try {
        //Config serveur
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host       = 'smtp.host.fr';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'mail@domain.fr';
        $mail->Password   = 'password';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        //Config mail
        $mail->setFrom('mail@domain.fr', "L'Univers du Téléphone");
        $mail->addAddress($replyMail);
        $mail->addBCC('bcc@domain.fr');

        //Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Univers du Téléphone - Réponse a votre prise de contact';
        $mail->Body    = '<p style="font-family: Arial;">' . $_POST['reply'] . '</p>
        <br><br>
        <p style="font-style:italic; color:gray; font-family: Arial;"> Pour rappel, voici votre message:<br>' . $previousMessage . "</p>
        <br>
        <p style='font-family:Arial;'>En vous remerciant de nous avoir contacté,<br>L'équipe de l'Univers du Téléphone.
        <br>" . '
        <img alt="logo" src="https://www.universdutelephone.fr/assets/logo_desktop.jpg" width="50">
        <br>
        09 51 53 52 46
        <br>
        65 Avenue Georges Clémenceau
        <br>
        09 51 53 52 46
        <br>
        Béziers</p>';
        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        $mail->send();
        $mail->ClearAllRecipients();

        $_SESSION['reply'] = 'Réponse envoyée';
        header('Location: /www/univtel/message/index/');
        exit();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
} else {
    header('Location: /www/univtel/home/index');
    exit();
}
