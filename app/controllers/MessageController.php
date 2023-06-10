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
        $this->view('message/index');
    }

    public function send()
    {
        if (isset($_SESSION['contact'])) {
            $contact = $_SESSION['contact'];
            unset($_SESSION['contact']);
        } else {
            $_SESSION['error'] = 'not found';
            header('Location: /www/univtel/home/index/');
        }
    }
}