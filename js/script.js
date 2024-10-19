document.addEventListener("DOMContentLoaded", function() {
    console.log("Tooth Track website is ready!");

    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    const loginForm = document.querySelector('#loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.querySelector('#email').value;
            const password = document.querySelector('#password').value;

            if (email === '' || password === '') {
                alert('Please fill in all fields');
            } else {
                alert('Login successful!');
            }
        });
    }

    // Slider functionality
    let currentSlide = 0;

    function changeSlide(direction) {
        const slides = document.querySelectorAll('.slide');
        slides[currentSlide].classList.remove('active');

        currentSlide = (currentSlide + direction + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');

        // Adjust the slides' position
        const slideWidth = slides[0].clientWidth;
        document.querySelector('.slides').style.transform = `translateX(-${currentSlide * slideWidth}px)`;
    }

    // Automatically change slides every 5 seconds
    setInterval(() => {
        changeSlide(1);
    }, 5000);
});

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerText = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}
