<?php
include ("$_SERVER[DOCUMENT_ROOT]/backend/functions.php")
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Camagru - Verify</title>
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/favicon.png">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/body.css">
    <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto:300" rel="stylesheet">
</head>
<body>
<?php
if (isset($_GET['token']))
{
    if (activateUser($_GET['token']) === 0) :?>
<div style="text-align: center; width: 100%">
    <img src="imgs/thumbs_up.gif">
    <h1 style="font-family: 'Roboto', sans-serif; font-size: 500%">Awesome!</h1>
    <p style="font-family: 'Roboto', sans-serif">Your account has been verified, you can now login</p>
    <a href="index.php"><button class="btn-green"><span class="fix-skew-greenbtn">Go back!</span></button></a>
</div>
    <?php else: ?>
<div style="text-align: center; width: 100%">
    <img src="imgs/warning.svg" style="width: 300px">
    <h1 style="font-family: 'Roboto', sans-serif; font-size: 500%">Error!</h1>
    <p style="font-family: 'Roboto', sans-serif">The user name associated with this token has already been verified</p>
    <a href="index.php"><button class="btn-red"><span class="fix-skew-greenbtn">Go back!</span></button></a>
</div>
    <?php endif;
}
else
    header("Location: index.php");
?>

</body>
</html>