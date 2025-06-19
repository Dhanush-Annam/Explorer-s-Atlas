let globalUserEmail=null;

function fetchUsername() {
    fetch('/username')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.text();
        })
        .then(data => {
            console.log('Retrieved Email (from /username endpoint):', data);
            const emailDisplayElement = document.getElementById('loggedInEmailDisplay');
            if (emailDisplayElement) {
                globalUserEmail = data;
            } else {
                console.warn("Element with ID 'loggedInEmailDisplay' not found to display email.");
            }
            return data;
        });
}
document.addEventListener('DOMContentLoaded', fetchUsername);
