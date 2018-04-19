<?php
session_start();
include("../config/database.php");

function debug($string_to_write) {
    $tmp = fopen("debug.log", "w");
    $total = "";
    if (is_array($string_to_write))
    {
        foreach ($string_to_write as $key => $value)
            $total .= $key.":".$value.PHP_EOL;
        fwrite($tmp, $total);
    }
    else
        fwrite($tmp, $string_to_write);
    fclose($tmp);
}
function responseCode($http_code, $exit_code)
{
    header("HTTP/1.0 $http_code");
    exit($exit_code);
}

//LOGIN
if (count($_POST) === 2 && isset($_POST['username'], $_POST['password']))
{
    global $DB_DNS;
    global $DB_USER;
    global $DB_PASSWORD;
    $username = preg_replace("/[^a-zA-Z0-9]/", "", trim($_POST['username']));
    $password = hash("whirlpool", preg_replace("/[^a-zA-Z0-9]/", "", trim($_POST['password'])));
    try {
        $pdobj = new PDO($DB_DNS, $DB_USER, $DB_PASSWORD);
        $pdobj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdobj->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    } catch (PDOException $e) {
        die('Connection failed: ' . $e->getMessage());
    }
    if (empty($username) || empty($password))
        responseCode(400, -1);
    $query = "SELECT * FROM `users` WHERE `username` = ? AND `password` = ?";
    $db = $pdobj->prepare($query);
    $db->bindParam(1, $username, PDO::PARAM_STR);
    $db->bindParam(2, $password, PDO::PARAM_STR);
    $db->execute();
    $result = $db->fetch(PDO::FETCH_ASSOC);
    if ($result)
    {
        $_SESSION['user'] = $result;
        responseCode(302, -1);
    }
    else
        responseCode(404, -1);
}

//REGISTER
if (count($_POST) === 5 && isset($_POST['username'], $_POST['email'], $_POST['password'], $_POST['name'], $_POST['surname']))
{
    global $DB_DNS;
    global $DB_USER;
    global $DB_PASSWORD;
    $username = preg_replace("/[^a-zA-Z0-9]/", "", trim($_POST['username']));
    $password = hash("whirlpool", preg_replace("/[^a-zA-Z0-9]/", "", trim($_POST['password'])));
    $name = preg_replace("/[^a-zA-Z0-9]/", "", trim($_POST['name']));
    $surname = preg_replace("/[^a-zA-Z0-9]/", "", trim($_POST['surname']));
    try {
        $pdobj = new PDO($DB_DNS, $DB_USER, $DB_PASSWORD);
        $pdobj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $pdobj->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    } catch (PDOException $e) {
        die('Connection failed: ' . $e->getMessage());
    }
    if (empty($username) || empty($password) || empty($name) || empty($surname))
        responseCode(400, -1);
    if(!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL))
        responseCode(400, -1);
    $email = $_POST['email'];
    $query = "SELECT * FROM `users` WHERE `email` = ? AND `username` = ?";
    $db = $pdobj->prepare($query);
    $db->bindParam(1, $email, PDO::PARAM_STR);
    $db->bindParam(2, $username, PDO::PARAM_STR);
    $db->execute();
    if ($db->rowCount() > 0)
    {
        responseCode(302, -1);
    }
    else
    {
        try {
            $query = "INSERT INTO `users` (`username`, `email`, `password`, `name`, `surname`) VALUES (?, ?, ?, ?, ?)";
            $db = $pdobj->prepare($query);
            $db->bindParam(1, $username, PDO::PARAM_STR);
            $db->bindParam(2, $email, PDO::PARAM_STR);
            $db->bindParam(3, $password, PDO::PARAM_STR);
            $db->bindParam(4, $name, PDO::PARAM_STR);
            $db->bindParam(5, $surname, PDO::PARAM_STR);
            if ($db->execute())
            {
                //TODO:ADDARE IL MESSAGGIO CON IL CODICE
                mail($email,"[ACCOUNT VERIFICATION]", "This is the code", "From: <arizzell@student.42.fr>\r\n");
                responseCode(201, 0);
            }
            else
                responseCode(400, -1);
        }
        catch (PDOException $exception)
        {
            if ($exception->getCode() == 23000)
                responseCode(409, -1);
            else
                responseCode(400, -1);
        }
    }
}

//DESTROY SESSION
if (count($_POST) === 1 && isset($_POST['destroy']))
{
    session_destroy();
    responseCode(200, 0);
}