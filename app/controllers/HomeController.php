<?php

class Home extends M_Home
{
    protected $model;
    public function __construct()
    {
        $this->model = new M_Home();
    }
    public function index()
    {
        $this->model->view('home/index');
    }

    public function confidentialite()
    {
        $this->model->view('home/confidentialite');
    }
}
