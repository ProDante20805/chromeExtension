let intervalId;
let targetTabId;
let targetUrl;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        startAutoRefresh(request.url, request.duration);
    } else if (request.action === 'stop') {
        stopAutoRefresh();
    }
});

function startAutoRefresh(url, duration) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            targetTabId = tabs[0].id;
            targetUrl = url;

            if (intervalId) {
                clearInterval(intervalId);
            }

            intervalId = setInterval(() => {
                chrome.tabs.update(targetTabId, { url: targetUrl }, () => {
                    chrome.scripting.executeScript(
                        {
                            target: { tabId: targetTabId },
                            function: checkSoldout
                        },
                        (results) => {
                            if (results && results[0] && results[0].result === 'soldout') {
                                console.log('Soldout element found, continuing to refresh.');
                            } else {
                                console.log('Soldout element not found, stopping auto-refresh.');
                                stopAutoRefresh();
                            }
                        }
                    );
                });
            }, duration);
        } else {
            console.error('No active tab found.');
        }
    });
}

function stopAutoRefresh() {
    if (intervalId) {
        clearInterval(intervalId);
    }
}

function checkSoldout() {
    let soldoutElement = document.querySelector('div.soldout');
    return soldoutElement ? 'soldout' : 'not-soldout';
}