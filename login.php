<?php
session_start();
if (isset($_SESSION['user']))
{
    header("Location: index.php");
    exit(0);
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Camagru - Login</title>
    <link rel="stylesheet" href="css/body.css">
    <link rel="stylesheet" href="css/reset.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/favicon.png">
    <script src="js/functions.js"></script>
</head>
<body>
<div class="register-centered-div">
    <div class="register-container">
        <h1>Sign In</h1>
        <input id="username" type="text" placeholder="Username" maxlength="12" required autofocus autocomplete="off">
        <input id="password" type="password" placeholder="Password" required autocomplete="off">
        <button class="btn-orange register" type="button" onclick="login()"><span class="fix-skew">Sign In</span></button>
    </div>
</div>
<div id="redir_screen" style="display: none">
    <div class="notification-container-login">
        <div style="display: table-cell; vertical-align: middle; text-align: center">
            <p class="center-message">User successfully authenticated, redirecting in few seconds</p>
            <img src="imgs/refresh-page-option.svg" class="rotation-refreshimage">
        </div>
    </div>
</div>
<div id="toast_error"></div>
</body>
</html>