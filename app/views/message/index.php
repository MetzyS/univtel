<?php
$component = new ComponentsMessage;
?>

<section class="messages margin">
    <?php
    if (isset($_SESSION['reply'])) {
        echo $_SESSION['reply'];
        unset($_SESSION['reply']);
    }
    $component->messageBar($data['messageCount'], $data['messageCountUnread']);
    ?>

    <div class="separation"></div>

    <?php
    $component->messageBlock('Messages récents', []);
    $component->messageGrid($data['messages']);
    ?>
    <div class="separation"></div>


    <div class="separation"></div>
    <?php
    $component->allMessagesBlock('Tous les messages');
    ?>
    <div class="separation"></div>

</section>