<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Camagru</title>
    <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto:300" rel="stylesheet">
    <link rel="stylesheet" href="css/body.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/favicon.png">
    <script src="js/functions.js"></script>
</head>
<body class="background">
<header>
    <div class="header">
        <h1 class="title">Camagru</h1>
        <?php if (isset($_SESSION['user'])) : ?>
            <button id="first" class="btn-blue delay" onclick="redirectPA()"><span class="fix-skew">Personal Area</span></button>
            <button id="second" class="btn-red-index" onclick="destroy_session()"><span class="fix-skew">Logout</span></button>
        <?php else: ?>
            <button id="first" class="btn-orange delay" onclick="redirectRegister()"><span class="fix-skew">Register</span></button>
            <button id="second" class="btn-orange" onclick="redirectLogin()"><span class="fix-skew">Login</span></button>
        <?php endif;?>
    </div>
</header>
<div class="img-container">
</div>
</body>
<footer>
    <p>Andrea Rizzello (@arizzell) 2018</p>
</footer>
</html>