<?php
use PHPMailer\PHPMailer\Exception;
use PHPMailer\PHPMailer\PHPMailer;

require '../../../vendor/phpmailer/phpmailer/src/Exception.php';
require '../../../vendor/phpmailer/phpmailer/src/PHPMailer.php';
require '../../../vendor/phpmailer/phpmailer/src/SMTP.php';

if (isset($_SESSION['user']) && isset($_POST['reply'])) {

    $mail = new PHPMailer(true);
    $replyMail = $_POST['reply']['mail'];
    try {
        //Config serveur
        $mail->SMTPDebug = SMTP::DEBUG_SERVER;
        $mail->isSMTP();
        $mail->Host       = 'smtp.host.com';
        $mail->SMTPAuth   = true;
        $mail->Username   = 'yourmail@domain.com';
        $mail->Password   = 'yourpassword';
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
        $mail->Port       = 587;

        //Config mail
        $mail->setFrom('yourmail@domain.com', "L'Univers du Téléphone");
        $mail->addAddress($replyMail);
        $mail->addBCC('bcc@domain.com');

        //Contenu
        $mail->isHTML(true);
        $mail->Subject = 'Univers du Téléphone - Réponse a votre prise de contact';
        $mail->Body    = $_SESSION['reply']['text'];

        $mail->CharSet = 'UTF-8';
        $mail->Encoding = 'base64';

        $mail->send();
    } catch (Exception $e) {
        echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
    }
}
