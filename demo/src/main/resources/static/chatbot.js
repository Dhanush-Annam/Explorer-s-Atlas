function Welcome() {
    const statement = [
        "Hello! I'm your friendly chatbot.",
        "How can I assist you today?"
    ];
    statement.forEach(i => { display("Bot", i)});
}
document.getElementById('userInput').addEventListener('keypress', function (k) { if (k.key === 'Enter') { send(); } });

function send() {
    var userInput = document.getElementById('userInput').value;
    if (userInput.trim() !== "") {
        display("User", userInput);
        processinput(userInput);
        document.getElementById('userInput').value = "";
    }
}

function display(sender, message) {
    var chatlog = document.getElementById('chatlog');
    var newmessage = document.createElement('div');
    newmessage.textContent = `${sender}: ${message}`;
    chatlog.appendChild(newmessage);
    chatlog.scrollTop = chatlog.scrollHeight;
}

function processinput(input) {
    input = input.toLowerCase();
    let message = "";

    if (input.includes("hello") || input.includes("hi")) {
        message = "Hello again!";
    }
    else if (input.includes("time") || input.includes("date")) {
        message =`The current time is ${new Date()}.`;
    }
    else if (input.includes("about us") || input.includes("aboutus")) {
        message = "Opening the About Us page";
        window.location.href = "aboutus.html";
    }
    else if (input.includes("contact us") || input.includes("contactus")) {
        message = "Opening the Contact Us page";
        window.location.href = "contactus.html";
    }
    else if (input.includes("clear")) {message ="Chat cleared"; clear();
    }
    else {
        display("Bot", "Let me think...");
        callgemini(input).then(response => {
            display("Bot", response);
            askagain();
        }).catch(error => {
            console.error(error);
            display("Bot", "Sorry, something went wrong.");
            askagain();
        });
        return;
    }
    

    setTimeout(function () {
        display("Bot", message);
        askagain();
    }, 1000);
}

function askagain(){
    display("Bot", "Is there anything else I can help with?");
}

function clear(){
    const chatlog = document.getElementById('chatlog');
    chatlog.innerHTML = "";
}

function minimize(){
    const chatbox = document.getElementById('chatbox');
    const chatlog = document.getElementById('chatlog');
    const userInput = document.getElementById('userInput');
    const sendButton = document.querySelector('button[onclick="send()"]');

    if (chatlog.style.display === "none") {
        chatlog.style.display = "block";
        userInput.style.display = "block";
        sendButton.style.display = "block";
        chatbox.style.height = "400px";
    } else {
        chatlog.style.display = "none";
        userInput.style.display = "none";
        sendButton.style.display = "none";
        chatbox.style.height = "47px";
    }
}

function openchat() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = "flex";
    Welcome();
}


function closechat(){
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = "none";
}

async function callgemini(userInput) {
    const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyAGsNSHKpQ5nShKprYXgHP1vS67D5lcTMM", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            contents: [
                {
                    role: "user",
                    parts: [{ text: userInput }]
                }
            ]
        })
    });

    const data = await response.json();
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn’t generate a response.";
    return reply;
}


