document.getElementById('startButton').addEventListener('click', () => {
    const url = document.getElementById('urlInput').value;
    const css = document.getElementById('css').value;
    const duration = document.getElementById('duration').value * 1000;
    if(url && duration) {
        chrome.runtime.sendMessage({ action: 'start', url: url, duration: duration });
    } else {
        alert('Please enter a valid URL or Enter second');
    }
});

document.getElementById('stopButton').addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'stop' });
});