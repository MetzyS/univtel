<?php

class Connect extends M_Connect
{
    protected $model;
    public function __construct()
    {
        $this->model = new M_Connect;
    }
    public function index()
    {
        if (!isset($_SESSION['user'])) {
            $this->model->view('connect/index', []);
        } else {
            $this->model->redirect('home/index');
        }
    }

    public function connect()
    {
        if (!isset($_SESSION['user'])) {
            if (isset($_SESSION['mail']) && isset($_SESSION['password'])) {
                $mail = $_SESSION['mail'];
                $password = $_SESSION['password'];
                unset($_SESSION);

                $user = $this->model->connect($mail, $password);
            } else {
                $this->redirect('home/index'); // 404 !!
            }
        };
    }
}
