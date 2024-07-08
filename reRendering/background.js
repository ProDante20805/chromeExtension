let intervalId;
let targetTabId;
let targetUrl;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'start') {
        startAutoRefresh(request.url, request.css, request.duration);
    } else if (request.action === 'stop') {
        stopAutoRefresh();
    }
});

function startAutoRefresh(url, css, duration) {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        if (tabs && tabs.length > 0) {
            targetTabId = tabs[0].id;
            targetUrl = url;

            if (intervalId) {
                clearInterval(intervalId);
            }

            intervalId = setInterval(() => {
                chrome.tabs.update(targetTabId, { url: targetUrl });

                // Listen for the tab update to be completed
                chrome.tabs.onUpdated.addListener(function tabUpdateListener(tabId, changeInfo) {
                    if (tabId === targetTabId && changeInfo.status === 'complete') {
                        // Remove the listener to avoid multiple triggers
                        chrome.tabs.onUpdated.removeListener(tabUpdateListener);

                        // Execute the script to check the element
                        chrome.scripting.executeScript(
                            {
                                target: { tabId: targetTabId },
                                function: checkElement,
                                args: [css]
                            },
                            (results) => {
                                if (results && results[0] && results[0].result === 'no') {
                                    console.log('no items, continuing to refresh.');
                                } else {
                                    console.log('items exist, stopping auto-refresh.');
                                    stopAutoRefresh();
                                }
                            }
                        );
                    }
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
        intervalId = null;
    }
}

function checkElement(css) {
    let selector = css.split(' ').map(className => `.${className}`).join('');
    let purchaseBTN = document.querySelector(selector);
    return purchaseBTN ? 'yes' : 'no';
}


// intervalId = setInterval(() => {
//     chrome.tabs.update(targetTabId, { url: targetUrl }, () => {
//         chrome.scripting.executeScript(
//             {
//                 target: { tabId: targetTabId },
//                 function: checkElement,
//                 args: [css]
//             },
//             (results) => {
//                 if (results && results[0] && results[0].result === 'no') {
//                     console.log('no items, continuing to refresh.');
//                 } else {
//                     console.log('items exist, stopping auto-refresh.');
//                     stopAutoRefresh();
//                 }
//             }
//         );
//     });
// }, duration);
