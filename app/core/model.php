<?php


class Model
{
    public function view(string $view, array $data = [])
    {
        require_once('app/views/' . $view . '.php');
    }
}
