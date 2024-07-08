document.addEventListener('DOMContentLoaded', (event) => {
    const inputField = document.getElementById('inputField');

    inputField.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            // Perform your action here
            alert('Enter key pressed. Performing action...');
        }
    });
});