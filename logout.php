<?php
session_start();
$_SESSION['login']="logout";
session_destroy();
header('Location: /');
exit;
?>