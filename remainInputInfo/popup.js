document.addEventListener('DOMContentLoaded', () => {
    const inputField1 = document.getElementById('inputField1');
    const inputField2 = document.getElementById('inputField2');
    const saveButton = document.getElementById('saveButton');

    // Load the saved input values when the popup is opened
    chrome.storage.sync.get(['savedInput1', 'savedInput2'], function(result) {
        if (result.savedInput1) {
            inputField1.value = result.savedInput1;
        }
        if (result.savedInput2) {
            inputField2.value = result.savedInput2;
        }
    });

    // Save the input values when the button is clicked
    saveButton.addEventListener('click', () => {
        const inputValue1 = inputField1.value;
        const inputValue2 = inputField2.value;
        chrome.storage.sync.set({ savedInput1: inputValue1, savedInput2: inputValue2 }, function() {
            console.log('Inputs saved:', inputValue1, inputValue2);
        });
    });
});