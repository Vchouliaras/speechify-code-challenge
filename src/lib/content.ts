const API_URL = "http://localhost:5174/content";

/**
 * Fetch the content from the api
 * In case of an error, return content as "<speak><s>There was an error</s></speak>"
 */
const fetchContent = async (url = API_URL): Promise<string> => {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      return "<speak><s>There was an error</s></speak>"
    }
    const data = await response.json()
    return data.content
  } catch (error) {
    return "<speak><s>There was an error</s></speak>"
  }
};

/**
 * Parse the content into sentences, and return an array of sentences. Look at the Readme for sample input and expected output.
 * Avoid using DOMParser for implementing this function.
 */
const parseContentIntoSentences = (content: string) => {
  if (!content.startsWith('<speak>')) {
    throw Error('Invalid SSML')
  }
  const sentences = content.match(/<s>(.*?)<\/s>/g)

  if (!sentences) {
    return []
  }

  return sentences.map(sentence => {
    const sentenceWithoutTag = sentence.match(/<s>(.*?)<\/s>/);
    return sentenceWithoutTag ? sentenceWithoutTag[1] : ''
  })
};

export { fetchContent, parseContentIntoSentences };
