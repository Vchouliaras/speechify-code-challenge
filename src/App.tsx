import { useEffect, useState } from 'react';
import './App.css';

import { Controls } from './components/Controls';
import { CurrentlyReading } from './components/CurrentlyReading';
import { fetchContent, parseContentIntoSentences } from './lib/content';
import { useSpeech } from './lib/useSpeech';

function App() {
  const [sentences, setSentences] = useState<Array<string>>([]);

  const speech = useSpeech(sentences);

  useEffect(() => {
    retrieveContent()
  }, [])

  const retrieveContent = async () => {
    const response = await fetchContent()
    const sentences = parseContentIntoSentences(response);
    setSentences(sentences);
  }

  /**
   * When loading a new content reset sentence index
   * as well as word index, otherwise app will try
   * to render sentences that do not exist in the new response
   */
  const loadNewContent = () => {
    speech.setCurrentSentenceIdx(0)
    speech.setCurrentWordRange([0, 0])
    speech.cancel();

    retrieveContent();
  }


  return (
    <div className="main">
      <h1>Text to speech</h1>
      <div>
        <CurrentlyReading
          sentences={sentences}
          currentWordRange={speech.currentWordRange}
          currentSentenceIdx={speech.currentSentenceIdx}
        />
      </div>
      <div>
        <Controls
          play={speech.play}
          pause={speech.pause}
          state={speech.playbackState}
          loadNewContent={loadNewContent}
        />
      </div>
    </div>
  );
}

export default App;
