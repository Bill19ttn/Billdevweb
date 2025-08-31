
        // Animation d'apparition au défilement
        const fadeElements = document.querySelectorAll('.fade-in');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        }, {
            threshold: 0.1
        });
        
        fadeElements.forEach(element => {
            observer.observe(element);
        });
        
        // Navigation fluide
        document.querySelectorAll('nav a, .hero-btns a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Fermer le menu mobile si ouvert
                document.getElementById('nav').classList.remove('active');
            });
        });

        // Menu mobile
        document.getElementById('menuToggle').addEventListener('click', function() {
            document.getElementById('nav').classList.toggle('active');
        });

        // Header scroll effect
        window.addEventListener('scroll', function() {
            const header = document.getElementById('header');
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // Envoi du formulaire
        document.getElementById("contact-form").addEventListener("submit", async function(event) {
            event.preventDefault();

            const status = document.getElementById("form-status");
            status.textContent = "Envoi en cours...";
            status.style.color = "#555";
            status.style.background = "#f5f5f5";

            const formData = {
                name: this.name.value,
                email: this.email.value,
                subject: this.subject.value,
                message: this.message.value
            };

            try {
                const response = await fetch("https://formspree.io/f/xgvlkvjv", {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(formData)
                });

                if (response.ok) {
                    status.textContent = "Votre message a été envoyé avec succès !";
                    status.style.color = "green";
                    status.style.background = "rgba(76, 175, 80, 0.1)";
                    this.reset();
                } else {
                    status.textContent = "Erreur : impossible d'envoyer le message. Réessayez.";
                    status.style.color = "red";
                    status.style.background = "rgba(244, 67, 54, 0.1)";
                }
            } catch (error) {
                status.textContent = "Une erreur réseau s'est produite. Vérifiez votre connexion.";
                status.style.color = "red";
                status.style.background = "rgba(244, 67, 54, 0.1)";
            }
        });
    