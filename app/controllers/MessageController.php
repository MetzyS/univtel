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
            $this->model->changeMessageStatus($id, $status);
            $this->model->redirect('message/show');
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
}
