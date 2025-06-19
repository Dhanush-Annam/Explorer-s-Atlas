
        
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
                });
    
            document.querySelector('.email-form form').addEventListener('submit', function(e) {
            e.preventDefault();
            const button = this.querySelector('button');
            const input = this.querySelector('input');
    
            button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
            button.style.backgroundColor = '#28a745';
            input.value = '';
    
            setTimeout(() => {
                button.innerHTML = 'Subscribe';
                button.style.backgroundColor = '#7AB730';
            }, 2000);
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