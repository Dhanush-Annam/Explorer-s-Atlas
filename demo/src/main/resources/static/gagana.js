const API_BASE_URL = 'https://explorer-s-atlas.onrender.com/api/blog';

let postData = {
    1: { likes: 0, dislikes: 0, saved: false },
    2: { likes: 0, dislikes: 0, saved: false },
    3: { likes: 0, dislikes: 0, saved: false }
};

async function makeApiCall(endpoint, method = 'POST') {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.text();
        return { success: true, message: result };
    } catch (error) {
        console.error('API call failed:', error);
        return { success: false, message: `Error: ${error.message}` };
    }
}

function updateCounters(postId) {
    const likeCountElement = document.getElementById(`likeCount${postId}-1`);
    const dislikeCountElement = document.getElementById(`dislikeCount${postId}-1`);
    
    if (likeCountElement) {
        likeCountElement.textContent = postData[postId].likes;
    }
    if (dislikeCountElement) {
        dislikeCountElement.textContent = postData[postId].dislikes;
    }
}

function showStatus(postId, message, isSuccess = true) {
    const statusElement = document.getElementById(`status${postId}-1`);
    if (statusElement) {
        statusElement.textContent = message;
        statusElement.style.color = isSuccess ? '#2e7d32' : '#d32f2f';
        
        setTimeout(() => {
            statusElement.textContent = '';
        }, 3000);
    }
}

async function likePost(postId) {
    showStatus(postId, 'Processing...', true);
    
    const result = await makeApiCall(`/like/${postId}`);
    
    if (result.success) {
        postData[postId].likes++;
        updateCounters(postId);
        showStatus(postId, '❤️ You liked this post!', true);
    } else {
        showStatus(postId, 'Failed to like post. Please try again.', false);
    }
}

async function dislikePost(postId) {
    showStatus(postId, 'Processing...', true);
    
    const result = await makeApiCall(`/dislike/${postId}`);
    
    if (result.success) {
        postData[postId].dislikes++;
        updateCounters(postId);
        showStatus(postId, '🙁 You disliked this post.', true);
    } else {
        showStatus(postId, 'Failed to dislike post. Please try again.', false);
    }
}

async function savePost(postId) {
    if (postData[postId].saved) {
        showStatus(postId, '🔖 Post already saved!', true);
        return;
    }

    showStatus(postId, 'Saving...', true);

    const result = await makeApiCall(`/save/${postId}`);

    if (result.success) {
        postData[postId].saved = true;
        showStatus(postId, '🔖 Post saved successfully!', true);

        const saveButton = document.querySelector(`button[onclick="savePost(${postId})"]`);
        if (saveButton) {
            saveButton.innerHTML = '✅ Saved';
            saveButton.style.backgroundColor = '#4caf50';
            saveButton.style.color = 'white';
            saveButton.disabled = true;
            saveButton.style.cursor = 'not-allowed';
        }
    } else {
        showStatus(postId, 'Failed to save post. Please try again.', false);
    }
}

async function loadPostData(postId) {
    try {
        const response = await fetch(`${API_BASE_URL}/get/${postId}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            postData[postId] = {
                likes: data.likes || 0,
                dislikes: data.dislikes || 0,
                saved: data.saved || false
            };
            updateCounters(postId);

            if (data.saved) {
                const saveButton = document.querySelector(`button[onclick="savePost(${postId})"]`);
                if (saveButton) {
                    saveButton.innerHTML = '✅ Saved';
                    saveButton.style.backgroundColor = '#4caf50';
                    saveButton.style.color = 'white';
                    saveButton.disabled = true;
                    saveButton.style.cursor = 'not-allowed';
                }
            }
        }
    } catch (error) {
        console.log(`Could not load data for post ${postId}:`, error.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blog post JavaScript loaded');

    // 🔄 Load data for each post from backend
    [1, 2, 3].forEach(postId => {
        loadPostData(postId);
    });

    document.querySelectorAll('.blogpost-buttons').forEach(button => {
        button.addEventListener('click', function(event) {
            console.log('Button clicked:', this.textContent);
        });
    });
});

window.addEventListener('online', function() {
    console.log('Connection restored');
});

window.addEventListener('offline', function() {
    console.log('Connection lost - some features may not work');
});

const CONFIG = {
    API_BASE_URL: API_BASE_URL,
    STATUS_DISPLAY_TIME: 3000,
    ENABLE_CONSOLE_LOGGING: true
};

function logMessage(message) {
    if (CONFIG.ENABLE_CONSOLE_LOGGING) {
        console.log(`[BlogPost] ${message}`);
    }
}
