<?php
ini_set("soap.wsdl_cache_enabled", "0");
ini_set("soap.wsdl_cache_ttl", "1");

$tassi_di_conversione = json_decode(file_get_contents("valori.json"), true)["conversion_rates"];

function convertCurrency($amount, $currency) {
    global $tassi_di_conversione;

    if (!isset($tassi_di_conversione[$currency])) {
        throw new SoapFault("Server", "Valuta non valida");
    }

    $tasso = $tassi_di_conversione[$currency];
    $convertedAmount = number_format($amount * $tasso, 2);
    return $convertedAmount;
}

$server = new SoapServer("test.wsdl");
$server->addFunction("convertCurrency");
$server->handle();
?>
