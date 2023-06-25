<?php


use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';


class Message extends M_Message
{
    protected $model;

    public function __construct()
    {
        $this->model = new M_Message;
    }

    public function index()
    {
        if (isset($_SESSION['user'])) {
            $messageCount = $this->model->getCountMsg();
            $messageCountUnread = $this->model->getCountMsgUnread();
            $messages = $this->model->getRecentMsg();
            $this->view('message/index', [
                'messageCount' => $messageCount,
                'messageCountUnread' => $messageCountUnread,
                'messages' => $messages,
            ]);
        } else {
            $this->model->redirect('home/index');
            exit;
        }
    }

    public function send()
    {
        if (isset($_SESSION['contact'])) {
            $contact = $_SESSION['contact'];
            unset($_SESSION['contact']);
            $message = $this->model->sendMessage($contact);
            $this->model->view('home/index', [
                'message' => $message
            ]);
        } else {
            $this->model->redirect('home/index');
            exit;
        }
    }

    public function show()
    {
        if (isset($_SESSION['user'])) {
            $messageCount = $this->model->getCountMsg();
            $messageCountUnread = $this->model->getCountMsgUnread();
            $messages = $this->model->getAllMsg();
            $this->view('message/show', [
                'messageCount' => $messageCount,
                'messageCountUnread' => $messageCountUnread,
                'messages' => $messages,
            ]);
        } else {
            $this->model->redirect('home/index');
        }
    }

    public function changeStatus($id, $status)
    {
        if (isset($_SESSION['user'])) {
            if ($status == 'unread' || $status == 'read' || $status == 'answered') {
                $this->model->changeMessageStatus($id, $status);
                $this->model->redirect('message/show');
            } else {
                $this->model->redirect('home/index');
            }
        } else {
            $this->model->redirect('home/index');
        }
    }

    public function deleteMessage($id)
    {
        if (isset($_SESSION['user'])) {
            $this->model->deleteMessageById($id);
            $this->model->redirect('message/show');
        } else {
            $this->model->redirect('home/index');
        }
    }

    public function response()
    {
        if (isset($_SESSION['user']) && $_SESSION['response']) {
            $mail = new PHPMailer(true);
            $responseMail = $_SESSION['response']['mail'];
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
                $mail->addAddress($responseMail);
                $mail->addBCC('bcc@domain.com');

                //Contenu
                $mail->isHTML(true);
                $mail->Subject = 'Univers du Téléphone - Réponse a votre prise de contact';
                $mail->Body    = $_SESSION['response']['text'];

                $mail->CharSet = 'UTF-8';
                $mail->Encoding = 'base64';

                $mail->send();
            } catch (Exception $e) {
                echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
            }
            $this->model->redirect('message/home');
        } else {
            $this->model->redirect('home/index');
        }
    }
}
