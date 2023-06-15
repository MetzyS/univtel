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

    /**
     * Affichage page connexion
     */
    public function index()
    {
        if (!isset($_SESSION['user'])) {
            $this->model->view('connect/index', []);
        } else {
            $this->model->redirect('message/index');
        }
    }

    /**
     * Traitement page connexion
     */
    public function connect()
    {
        if (!isset($_SESSION['user'])) {
            if (isset($_SESSION['mail']) && isset($_SESSION['password'])) {
                $mail = $_SESSION['mail'];
                $password = $_SESSION['password'];
                unset($_SESSION['mail'], $_SESSION['password']);
                if ($this->validator->mailRegex($mail)) {
                    if (isset($_SESSION['user'])) {
                        unset($_SESSION['user']);
                    }
                    $user = $this->model->checkUser($mail, $password);
                    if (!$user) {
                        $message = 'Mail ou mot de passe incorrect.';
                        $this->model->view('connect/index', [
                            'message' => $message
                        ]);
                    }
                    if (!is_array($user)) {
                        $this->model->view('connect/index', [
                            'message' => $user
                        ]);
                    } else {
                        $_SESSION['user'] = $user;
                        $this->model->redirect('message/index');
                    }
                } else {
                    $message = 'Format de l&#39;adresse mail invalide.';
                    $this->model->view('connect/index', [
                        'message' => $message
                    ]);
                }
            } else {
                $this->redirect('home/index'); // 404
            }
        };
    }

    /**
     * Affichage page changement mot de passe
     */
    public function changepw()
    {
        if (isset($_SESSION['user'])) {
            $this->model->view('connect/changepw');
        } else {
            $this->model->redirect('home/index'); // 404
        }
    }

    /**
     * Traitement page changement mot de passe
     */
    public function change()
    {
        if (isset($_SESSION['user']) && isset($_SESSION['change'])) {
            $change = $_SESSION['change'];
            unset($_SESSION['change']);
            $changePassword = $this->model->changePassword($change);
            $this->model->redirect('home/index');
        }
    }
}
