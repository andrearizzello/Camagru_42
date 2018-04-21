
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <title>Camagru - Personal Zone</title>
    <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto:300" rel="stylesheet">
    <link rel="stylesheet" href="css/body.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="icon" type="image/png" sizes="32x32" href="imgs/favicon.png">
    <script src="js/functions.js"></script>
    <script>
        window.onload = function () {
            getCamera();
        };
    </script>
</head>
<body>
<header style="text-align: center">
    <h1 style="font-family: 'Roboto', sans-serif; font-size: 300%">Your personal zone</h1>
</header>
<div class="camera-container">
    <video id="camera" autoplay style="width: 640px; height: 480px"></video>
</div>
<div class="preview-container">

</div>
</body>
</html>