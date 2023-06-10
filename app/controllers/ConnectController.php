<?php

class Connect extends M_Connect
{
    protected $model;
    protected $validator;
    public function __construct()
    {
        $this->model = new M_Connect;
        $this->validator = new Validator;
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
                if ($this->validator->mailRegex($mail)) {
                    echo 'ok';
                } else {
                    $message = 'Format de l&#39;adresse mail invalide.';
                    $this->model->view('connect/index', [
                        'message' => $message
                    ]);
                }

                $user = $this->model->checkUser($mail, $password);
            } else {
                $this->redirect('home/index'); // 404 !!
            }
        };
    }
}
