<?php

function responseCode($http_code, $exit_code)
{
    header("HTTP/1.0 $http_code");
    exit($exit_code);
}