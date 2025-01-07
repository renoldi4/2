<!DOCTYPE html>
<html>
<head>
    <title>Conversione Valuta</title>
</head>
<body>
    <form method="POST" action="client.php">
        <label for="amount">Inserisci importo:</label>
        <input type="number" name="amount" placeholder="Importo da convertire" required/>
        
        <label for="currency">Scegli valuta da ottenere:</label>
        <select name="currency" required>
            <option value="dollari">Dollari</option>
            <option value="sterline">Sterline</option>
            <option value="franchi">Franchi</option>
        </select>
        
        <input type="submit" value="Converti"/>
    </form>

    <?php
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $amount = $_POST['amount'];
        $currency = $_POST['currency'];

        $wsdl_url = "http://127.0.0.1/soap/server/test.wsdl";

        try {
            $client = new SoapClient($wsdl_url, ["location" => "http://127.0.0.1/soap/server/", "uri" => "urn:soap-conversion"]);

            $response = $client->convertCurrency($amount, $currency);

            echo "<h3>Risultato Conversione:</h3>";
            echo "Importo: " . $amount . " in " . ucfirst($currency) . " è: " . $response;
        } catch (SoapFault $e) {
            echo '<br>Errore nel client SOAP: ' . $e->getMessage();
        }
    }
    ?>
</body>
</html>
