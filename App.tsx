import React, { useState, useEffect } from 'react';
import './App.css';

interface Verse {
  book: string;
  chapter: number;
  verse: number;
  text: string;
}

function App() {
  const [book, setBook] = useState('John');
  const [chapter, setChapter] = useState(3);
  const [verse, setVerse] = useState(16);
  const [verses, setVerses] = useState<Verse[]>([]);
  const [loading, setLoading] = useState(false);

  // Free Bible API
  const fetchBibleVerse = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://bible-api.com/${book}+${chapter}:${verse}?translation=kjv`
      );
      const data = await response.json();
      if (data.verses) {
        setVerses(data.verses);
      }
    } catch (error) {
      console.error('Error fetching verse:', error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBibleVerse();
  }, [book, chapter, verse]);

  return (
    <div className="App">
      <header className="app-header">
        <h1>📖 Bible Reader</h1>
      </header>

      <main className="app-main">
        <div className="controls">
          <input 
            type="text" 
            value={book} 
            onChange={(e) => setBook(e.target.value)}
            placeholder="Book name"
          />
          <input 
            type="number" 
            value={chapter} 
            onChange={(e) => setChapter(Number(e.target.value))}
            placeholder="Chapter"
          />
          <input 
            type="number" 
            value={verse} 
            onChange={(e) => setVerse(Number(e.target.value))}
            placeholder="Verse"
          />
          <button onClick={fetchBibleVerse}>Search</button>
        </div>

        <div className="verse-display">
          {loading ? (
            <p>Loading...</p>
          ) : verses.length > 0 ? (
            verses.map((v, idx) => (
              <div key={idx} className="verse-card">
                <span className="reference">
                  {v.book} {v.chapter}:{v.verse}
                </span>
                <p className="verse-text">{v.text}</p>
              </div>
            ))
          ) : (
            <p className="no-verse">Enter a verse to begin</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
