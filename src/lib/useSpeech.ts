import { useState } from 'react';

import { PlayingState, createSpeechEngine } from './speech';

/*
  @description
  Implement a custom useSpeech hook that uses a speech engine defined in 'speech.ts'
  to play the sentences that have been fetched and parsed previously.

  This hook should return react friendly controls for playing, and pausing audio as well as provide information about
  the currently read word and sentence
*/
const useSpeech = (sentences: Array<string>) => {
  const [currentSentenceIdx, setCurrentSentenceIdx] = useState(0);
  const [currentWordRange, setCurrentWordRange] = useState<[number, number]>([0, 0]);
  const [playbackState, setPlaybackState] = useState<PlayingState>("paused");

  const onBoundary = (e: SpeechSynthesisEvent) => {
    setCurrentWordRange([e.charIndex, e.charIndex + e.charLength])
  }

  const onEnd = (e: SpeechSynthesisEvent) => {
    setCurrentWordRange([0, 0])
    if (currentSentenceIdx + 1 >= sentences.length ) {
      setCurrentSentenceIdx(0)
    } else {
      setCurrentSentenceIdx((index) => index + 1)
    }
  }

  const onStateUpdate = (state: PlayingState) => {
    setPlaybackState(state)
  }

  const engine = createSpeechEngine({ onBoundary, onEnd, onStateUpdate })

  const play = () => {
    engine.load(sentences[currentSentenceIdx])
    engine.play();
  };

  const pause = () => {
    engine.pause();
  };

  const cancel = () => {
    engine.cancel()
  }

  return {
    currentSentenceIdx,
    setCurrentSentenceIdx,
    currentWordRange,
    setCurrentWordRange,
    playbackState,
    play,
    pause,
    cancel,
  };
};

export { useSpeech };
