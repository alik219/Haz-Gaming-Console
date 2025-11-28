const loginModal = document.getElementById('loginModal');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.querySelector('.close');

const gameLinks = document.querySelectorAll('.game-container a');

gameLinks.forEach(link => {
    link.style.pointerEvents = 'none';
    link.style.opacity = 0.5;
});


loginBtn.addEventListener('click', function() {
    loginModal.style.display = 'flex';
});

closeBtn.addEventListener('click', function() {
    loginModal.style.display = 'none';
});


const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', function(e) {
    e.preventDefault(); // Prevent page reload
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (password === "haz@yu24") {
        loginModal.style.display = 'none';
        const loginBox = document.querySelector('.login-box');
        loginBox.innerHTML = `<span>Welcome, ${username}!</span>`;

        gameLinks.forEach(link => {
        link.style.pointerEvents = 'auto';
        link.style.opacity = 1;
    });
    } else {
        const errorMsg = document.createElement('p');
        errorMsg.textContent = 'Invalid password!, (Password hint: haz@yu24)';
        errorMsg.style.color = 'red';
        errorMsg.style.marginTop = '10px';

        if (!document.querySelector('.modal-content p')) {
            loginForm.appendChild(errorMsg);
        }
    }
});

