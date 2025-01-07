<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $amount = $_POST['amount'];
    $currency = $_POST['currency'];

    $wsdl_url = "http://127.0.0.1/soap/server/test.wsdl";

    try {
        $client = new SoapClient($wsdl_url, [
            "location" => "http://127.0.0.1/soap/server/",
            "uri" => "urn:soap-conversion"
        ]);

        $response = $client->convertCurrency($amount, $currency);

        echo "<h3>Risultato Conversione:</h3>";
        echo "Importo: " . $amount . " in " . ucfirst($currency) . " è: " . $response;
    } catch (SoapFault $e) {
        echo '<br>Errore nel client SOAP: ' . $e->getMessage();
    }
}
?>

