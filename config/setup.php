<?php
include("database.php");

global $DB_DNS;
global $DB_USER;
global $DB_PASSWORD;
try {
    $pdobj = new PDO($DB_DNS, $DB_USER, $DB_PASSWORD);
    $pdobj->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdobj->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
} catch (PDOException $e) {
    die('Connection failed: ' . $e->getMessage());
}
try {
    $query = file_get_contents("db.sql"); //TODO: FIXARE STO GESUDDIO
    $stmt = $pdobj->prepare($query);
    $stmt->execute();
}
catch (PDOException $e)
{
    echo $e->getMessage();
    die();
}