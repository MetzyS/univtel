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