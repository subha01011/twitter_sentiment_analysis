// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.action === 'analyzeSentiment') {
//     const tweetText = findTweetText();
//     const sentiment = analyzeSentiment(tweetText);

//     chrome.runtime.sendMessage({
//       action: 'updateTweet',
//       tweet: tweetText,
//     });
//     chrome.runtime.sendMessage({
//       action: 'updateResult',
//       sentiment: sentiment,
//     });
//   }
// });

// function findTweetText() {
//   const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
//   for (const tweetElement of tweetElements) {
//     const tweetTextElement = tweetElement.querySelector('[lang]');
//     if (tweetTextElement) {
//       return tweetTextElement.innerText;
//     }
//   }
//   return '';
// }

// function analyzeSentiment(text) {
//   // Placeholder sentiment analysis logic
//   // Replace with your actual sentiment analysis implementation
//   return 'Positive';
// }


// Listen for messages from the popup script or other parts of the extension
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  // Check if the message is to analyze sentiment
  if (request.action === 'analyzeSentiment') {
    // Find the tweet text on the current page
    const tweetText = findTweetText();
    // Analyze the sentiment of the tweet text
    const sentiment = analyzeSentiment(tweetText);

    // Send a message to the popup script with the tweet text
    chrome.runtime.sendMessage({
      action: 'updateTweet',
      tweet: tweetText,
    });
    // Send a message to the popup script with the sentiment analysis result
    chrome.runtime.sendMessage({
      action: 'updateResult',
      sentiment: sentiment,
    });
  }
});

// Function to find the tweet text on the current page
function findTweetText() {
  // Find all elements that represent tweets
  const tweetElements = document.querySelectorAll('[data-testid="tweet"]');
  // Loop through each tweet element
  for (const tweetElement of tweetElements) {
    // Find the element that contains the tweet text
    const tweetTextElement = tweetElement.querySelector('[lang]');
    // If the tweet text element is found, return the inner text (tweet text)
    if (tweetTextElement) {
      return tweetTextElement.innerText;
    }
  }
  // If no tweet text is found, return an empty string
  return '';
}

// Function to analyze the sentiment of a given text
function analyzeSentiment(text) {
  // Placeholder sentiment analysis logic
  // Replace with your actual sentiment analysis implementation
  return 'Positive'; // For demonstration purposes, always return 'Positive'
}

















