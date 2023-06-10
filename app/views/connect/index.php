<?php
$component = new ComponentsConnexion;
?>

<h1 class="margin connexion-title">Connexion</h1>

<?php
if (isset($data['message'])) {
    echo '<p class="margin error-message">' . $data['message'] . '</p>';
}
$component->connexionForm();
?>