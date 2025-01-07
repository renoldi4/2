<?php

ini_set("soap.wsdl_cache_enabled", "0");
ini_set("soap.wsdl_cache_ttl", "1");

$tassi_di_conversione = json_decode(file_get_contents("tassi_conversione.json"), true);

function convertCurrency($amount, $currency) {
    global $tassi_di_conversione;

    $tasso = $tassi_di_conversione[$currency];
    $convertedAmount = number_format($amount * $tasso, 2);
    return "Il valore di $amount EUR in $currency è: $convertedAmount";
}

$server = new SoapServer("test.wsdl");
$server->addFunction("convertCurrency");
$server->handle();

?>
