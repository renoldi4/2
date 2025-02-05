import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function WordPressAPIViewer() {
  const [siteUrl, setSiteUrl] = useState('');
  const [data, setData] = useState([]);
  const [type, setType] = useState('posts');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!siteUrl) return;
    setLoading(true);
    setError(null);

    const apiBaseUrl = `${siteUrl.replace(/\/$/, '')}/wp-json/wp/v2/${type}`; // Rimuove eventuali slash finali

    try {
      const response = await fetch(apiBaseUrl);
      if (!response.ok) throw new Error(`Errore API: ${response.statusText}`);

      const result = await response.json();
      setData(result);
    } catch (err) {
      if (err.message.includes("Failed to fetch")) {
        setError("Impossibile connettersi all'API. Verifica l'URL o le restrizioni CORS.");
      } else {
        setError(err.message);
      }
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">WordPress API Viewer</h1>

      <div className="flex gap-2 mb-4">
        <Input
          placeholder="Inserisci l'URL del sito WordPress (es. https://techcrunch.com)"
          value={siteUrl}
          onChange={(e) => setSiteUrl(e.target.value)}
        />
        <Button onClick={fetchData} disabled={loading}>
          {loading ? 'Caricamento...' : 'Cerca'}
        </Button>
      </div>

      <div className="flex gap-4 mb-4">
        <Button variant={type === 'posts' ? 'default' : 'outline'} onClick={() => setType('posts')}>
          Post
        </Button>
        <Button variant={type === 'users' ? 'default' : 'outline'} onClick={() => setType('users')}>
          Utenti
        </Button>
      </div>

      {error && <p className="text-red-500">Errore: {error}</p>}

      <div className="space-y-4">
        {data.length === 0 && !loading && !error && <p>Nessun risultato trovato.</p>}

        {data.map((item) => (
          <Card key={item.id} className="shadow-md">
            <CardContent className="p-4">
              {type === 'posts' ? (
                <>
                  <h2 className="font-bold text-xl">{item.title.rendered}</h2>
                  <p className="text-sm text-gray-500">ID: {item.id}</p>
                  <div
                    className="mt-2 text-gray-700"
                    dangerouslySetInnerHTML={{ __html: item.excerpt.rendered }}
                  />
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
                    Leggi di più
                  </a>
                </>
              ) : (
                <>
                  <h2 className="font-bold text-xl">{item.name}</h2>
                  <p className="text-sm text-gray-500">ID: {item.id}</p>
                  <p>Email: {item.email || 'N/A'}</p>
                  <p>Ruolo: {item.roles?.join(', ') || 'N/A'}</p>
                </>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
