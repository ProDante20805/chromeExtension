let intervalId;

document.getElementById('startButton').addEventListener('click', function() {
  const url = document.getElementById('url').value;

  if (url) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      const activeTabId = tabs[0].id;
      intervalId = setInterval(() => {
        chrome.tabs.update(activeTabId, { url: url });
      }, 10000);
    });
  } else {
    alert('Please enter a valid URL');
  }
});

document.getElementById('stopButton').addEventListener('click', function() {
  clearInterval(intervalId);
});