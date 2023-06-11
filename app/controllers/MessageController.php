<?php

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
            $messages = $this->model->getRecentMsg();
            $this->view('message/index', [
                'messages' => $messages
            ]);
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
            $_SESSION['error'] = 'not found';
            header('Location: /www/univtel/home/index/');
        }
    }
}
