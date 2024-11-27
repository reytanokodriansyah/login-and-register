document.addEventListener('DOMContentLoaded', () => {
    const loginTab = document.getElementById('loginTab');
    const registerTab = document.getElementById('registerTab');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const switchToRegister = document.getElementById('switchToRegister');
    const switchToLogin = document.getElementById('switchToLogin');

    function showLogin() {
        loginTab.classList.add('active');
        registerTab.classList.remove('active');
        loginForm.classList.remove('hidden');
        registerForm.classList.add('hidden');
    }

    function showRegister() {
        registerTab.classList.add('active');
        loginTab.classList.remove('active');
        registerForm.classList.remove('hidden');
        loginForm.classList.add('hidden');
    }

    loginTab.addEventListener('click', showLogin);
    registerTab.addEventListener('click', showRegister);
    switchToRegister.addEventListener('click', showRegister);
    switchToLogin.addEventListener('click', showLogin);

    // Login form submission
    document.getElementById('login').addEventListener('submit', async (e) => {
        e.preventDefault();
        const whatsapp = document.getElementById('loginWhatsapp').value;
        const password = document.getElementById('loginPassword').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ whatsapp, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Login berhasil: ' + data.message);
                // Redirect atau lakukan aksi setelah login berhasil
            } else {
                alert('Login gagal: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat login');
        }
    });

    // Register form submission
    document.getElementById('register').addEventListener('submit', async (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const username = document.getElementById('username').value;
        const whatsapp = document.getElementById('whatsapp').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirmPassword').value;

        if (password !== confirmPassword) {
            alert('Password dan konfirmasi password tidak cocok');
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ fullName, username, whatsapp, email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Pendaftaran berhasil: ' + data.message);
                showLogin(); // Beralih ke form login setelah pendaftaran berhasil
            } else {
                alert('Pendaftaran gagal: ' + data.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat mendaftar');
        }
    });
});

