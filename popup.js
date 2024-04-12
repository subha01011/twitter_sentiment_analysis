
  
// document.addEventListener('DOMContentLoaded', function() {
//   document.getElementById('analyzeBtn').addEventListener('click', function() {

//     chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {

//       chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzeSentiment' });
//     });
//   });


//   chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

//     if (request.action === 'updateTweet' ) {

//       const resultTweet = document.getElementById('tweet');
//       resultTweet.innerText = `${request.tweet}`;

//     } 
//     else if (request.action === 'updateResult') {
//       const resultElement = document.getElementById('result');
//       resultElement.innerText = `Sentiment: ${request.sentiment}`;
//     }
//   });
// });


 // Wait for the DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Add a click event listener to the "Analyze" button
  document.getElementById('analyzeBtn').addEventListener('click', function() {
    // Query the active tab in the current window
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      // Send a message to the content script of the active tab to trigger sentiment analysis
      chrome.tabs.sendMessage(tabs[0].id, { action: 'analyzeSentiment' });
    });
  });

  // Add a listener for messages from the content script or background script
  chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // Update the tweet element with the extracted tweet text
    if (request.action === 'updateTweet') {
      // Find the tweet element in the popup
      const resultTweet = document.getElementById('tweet');
      // Set the inner text of the tweet element to the extracted tweet text
      resultTweet.innerText = request.tweet;
    } 
    // Update the result element with the sentiment received in the message
    else if (request.action === 'updateResult') {
      const resultElement = document.getElementById('result');
      resultElement.innerText = `Sentiment: ${request.sentiment}`;
      // Remove existing sentiment classes
      resultElement.classList.remove('positive', 'negative', 'neutral');
      // Add class based on sentiment
      if (request.sentiment === 'Positive') {
        resultElement.style.color = '#28a745'; // Green color for positive sentiment
      } else if (request.sentiment === 'Negative') {
        resultElement.style.color = '#dc3545'; // Red color for negative sentiment
      } else {
        resultElement.style.color = '#ffc107'; // Yellow color for neutral sentiment
      }
    }
  });
});


