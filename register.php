<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Camagru - Register</title>
    <link rel="stylesheet" href="css/body.css">
    <link rel="stylesheet" href="css/reset.css">
    <link href="https://fonts.googleapis.com/css?family=Roboto:300" rel="stylesheet">
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/favicon.png">
    <script src="js/functions.js"></script>
</head>
<body>
<div class="register-centered-div">
    <div class="register-container">
        <h1>Sign Up</h1>
        <input id="username" type="text" placeholder="Username" maxlength="12" required autofocus autocomplete="off">
        <input id="email" type="email" placeholder="E-mail" maxlength="100" required autocomplete="off">
        <input id="password" type="password" placeholder="Password" required onkeyup="passwordComplexity()" autocomplete="off">
        <hr id="pwd_indicator" class="password_strength">
        <input id="name" type="text" placeholder="Name" maxlength="45" required autocomplete="off">
        <input id="surname" type="text" placeholder="Surname" maxlength="45" required autocomplete="off">
        <button class="btn-orange register" type="button" onclick="register()"><span class="fix-skew">Sign Up</span></button>
    </div>
</div>
<div id="toast_error"></div>
<div id="toast_ok"></div>
</body>
</html>