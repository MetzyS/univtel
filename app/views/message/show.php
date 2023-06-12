<?php
$component = new ComponentsMessage;
?>

<section class="messages margin">
    <?php
    $component->messageBar($data['messageCount'], $data['messageCountUnread']);
    ?>

    <div class="separation"></div>

    <?php
    $component->allMessagesBlock('Tous les messages');
    $component->messageGrid($data['messages']);
    ?>
    <div class="separation"></div>

</section>

<div class="submenu">
    <ul class="submenu-list">
        <li><a href="#"><span>Lu</span><span class="read"></span></a></li>
        <li><a href="#"><span>Non Lu</span><span class="unread"></span></a></li>
        <li><a href="#"><span>Traîté</span><span class="answered"></span></a></li>
    </ul>
</div>