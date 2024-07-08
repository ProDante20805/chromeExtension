// document.getElementById('startButton').addEventListener('click', () => {
//     const url = document.getElementById('urlInput').value;
//     const css = document.getElementById('css').value;
//     const duration = document.getElementById('duration').value * 1000;
//     if(url && duration) {
//         chrome.runtime.sendMessage({ action: 'start', url: url, duration: duration });
//     } else {
//         alert('Please enter a valid URL or Enter second');
//     }
// });

// document.addEventListener('DOMContentLoaded', () => {
//     const inputURL = document.getElementById('urlInput');
//     const inputCSS = document.getElementById('css');
//     const startButton = document.getElementById('startButton');

//     // Load the saved input values when the popup is opened
//     chrome.storage.sync.get(['savedURL', 'savedCSS'], function(result) {
//         if (result.savedURL) {
//             inputURL.value = result.savedURL;
//         }
//         if (result.savedCSS) {
//             inputCSS.value = result.savedCSS;
//         }
//     });

//     // Save the input values when the button is clicked
//     startButton.addEventListener('click', () => {
//         const url = inputURL.value;
//         const css = inputCSS.value;
//         chrome.storage.sync.set({ savedURL: url, savedCSS: css }, function() {
//             console.log('Inputs saved:', url, css);
//         });
//     });
// });

// document.getElementById('stopButton').addEventListener('click', () => {
//     chrome.runtime.sendMessage({ action: 'stop' });
// });

document.addEventListener('DOMContentLoaded', () => {
    const inputURL = document.getElementById('urlInput');
    const inputCSS = document.getElementById('css');
    const inputDURATION = document.getElementById('duration');
    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');

    // Load the saved input values when the popup is opened
    chrome.storage.sync.get(['savedURL', 'savedCSS', 'savedDURATION'], function(result) {
        if (result.savedURL) {
            inputURL.value = result.savedURL;
        }
        if (result.savedCSS) {
            inputCSS.value = result.savedCSS;
        }
        if (result.savedDURATION) {
            inputDURATION.value = result.savedDURATION;
        }
    });

    // Save the input values when the button is clicked
    startButton.addEventListener('click', () => {
        const url = inputURL.value;
        const css = inputCSS.value;
        const duration = inputDURATION.value;
        chrome.storage.sync.set({ savedURL: url, savedCSS: css, savedDURATION: duration }, function() {
            console.log('Inputs saved:', url, css, duration);
        });

        if(url && css && duration) {
            chrome.runtime.sendMessage({ action: 'start', url: url, css: css, duration: duration * 1000 });
        } else {
            alert('Please enter a valid URL or Enter second');
        }
    });

    stopButton.addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'stop' });
    });
});