<?php
$component = new ComponentsMessage;
?>

<section class="messages margin">
    <div class="messages-bar">
        <span class="messages-search-icon"></span>
        <span class="messages-unread">Non lu: <span class="messages-unread-nb">35</span></span>
        <span class="messages-total">Total: <span class="messages-total-nb">250</span></span>
    </div>

    <div class="separation"></div>

    <?php
    $component->messageBlock('Messages récents', []);
    ?>

    <div class="separation"></div>

    <?php
    $component->messageBlock('Messages triés', ['Devis', 'Infos', 'Autre', 'Non-lus']);
    ?>

    <div class="separation"></div>

    <?php
    $component->allMessagesBlock('Tous les messages');
    ?>
</section>