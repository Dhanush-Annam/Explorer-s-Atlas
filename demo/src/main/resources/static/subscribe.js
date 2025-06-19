document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.1
    });
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    document.getElementById("newsletterForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const emailInput = document.getElementById("emailInput");
        const email = emailInput.value.trim(); 
        const responseMessage = document.getElementById("responseMessage");
        const submitButton = document.getElementById("charithabtn");

        console.log("Email to send:", email);

        if (!email) {
            responseMessage.innerHTML = "<p style='color:orange;'>Please enter your email address.</p>";
            return;
        }

        if (!email.includes('@') || !email.includes('.')) {
            responseMessage.innerHTML = "<p style='color:orange;'>Please enter a valid email address.</p>";
            return;
        }

        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending...';
        submitButton.disabled = true;

        fetch("http://localhost:8080/api/subscribe", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({ email: email })
        })
        .then(response => {
          
            if (!response.ok) {
                return response.text().then(text => { throw new Error(text) });
            }
            return response.text();
        })
        .then(data => {
            responseMessage.innerHTML = data;

            submitButton.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            submitButton.style.backgroundColor = '#28a745';
            emailInput.value = '';
            setTimeout(() => {
                submitButton.innerHTML = originalButtonText; 
                submitButton.style.backgroundColor = '#7AB730'; 
                submitButton.disabled = false; 
            }, 2000);
        })
        .catch(error => {
            console.error("Error during subscription:", error);
            responseMessage.innerHTML = `<p style='color:red;'>${error.message || 'Failed to send email. Please try again later.'}</p>`;
            
            submitButton.innerHTML = originalButtonText;
            submitButton.style.backgroundColor = '#7AB730';
            submitButton.disabled = false;
        });
    });

    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) rotate(8deg)';
        });
        icon.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) rotate(0)';
        });
    });
});