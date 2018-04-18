<?php
include("../config/database.php");
include("functions.php");

if (isset($_POST['username'], $_POST['email'], $_POST['password'], $_POST['name'], $_POST['surname']))
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
        $query = "INSERT INTO `users` (`username`, `email`, `password`, `name`, `surname`) VALUES (?, ?, ?, ?, ?)";
        $db = $pdobj->prepare($query);
        $db->bindParam(1,$username, PDO::PARAM_STR);
        $db->bindParam(2, $email, PDO::PARAM_STR);
        $db->bindParam(3, $password, PDO::PARAM_STR);
        $db->bindParam(4,$name, PDO::PARAM_STR);
        $db->bindParam(5, $surname, PDO::PARAM_STR);
        if ($db->execute())
            responseCode(201, 0);
        else
            responseCode(400, -1);
    }
}