document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const tabButtons = document.querySelectorAll('.tab-button');

    // Function to switch between login and register forms
    window.showForm = function (formType) {
        if (formType === 'login') {
            loginForm.style.display = 'block';
            registerForm.style.display = 'none';
            tabButtons[0].classList.add('active');
            tabButtons[1].classList.remove('active');
        } else if (formType === 'register') {
            loginForm.style.display = 'none';
            registerForm.style.display = 'block';
            tabButtons[0].classList.remove('active');
            tabButtons[1].classList.add('active');
        }
    };

    // Default to showing the login form
    showForm('login');
});
