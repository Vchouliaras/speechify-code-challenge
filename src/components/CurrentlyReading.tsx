import { Fragment } from "react";

/**
 * Implement the CurrentlyReading component here
 * This component should have the following,
 * - A container tag with text containing all sentences supplied
 * - A p tag containing the current sentence with testID "current-sentence"
 * - A span tag inside the p tag containing the current word with testID "current-word"
 *
 * See example.gif for an example of how the component should look like, feel free to style it however you want as long as the testID exists
 */
export const CurrentlyReading = ({
  currentWordRange,
  currentSentenceIdx,
  sentences,
}: {
  currentWordRange: [number, number];
  currentSentenceIdx: number;
  sentences: string[];
}) => {

  const renderSelectedSentence = (sentence: string) => {
    const words = sentence?.split(' ')
    const selectedWord = sentence?.slice(currentWordRange[0], currentWordRange[1])
    return (
      <p data-testid="current-sentence" className="currently-reading-text">
        {
          words?.map((word, index) => (
            <Fragment key={word + index}>
              {
                word === selectedWord ?
                  <span data-testid="current-word" className="currentword">{word}</span> :
                  <span>{word}</span>
              }
              {index !== words.length - 1 && ' '}
            </Fragment>
          ))
        }
      </p>
    )
  }

  return (
    <div data-testid="currently-reading">
      <h3 className="currently-reading">{renderSelectedSentence(sentences[currentSentenceIdx])}</h3>
      <section>
        {
          sentences.map((sentence, index) => (<p key={ sentence + index }> {sentence} </p>))
        }
      </section>
    </div>
  );
};
