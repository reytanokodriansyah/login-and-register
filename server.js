const express = require('express');
const path = require('path'); // Untuk mengelola jalur direktori
const app = express();
const port = 3000;

// Melayani file statis dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Gunakan middleware untuk parsing JSON request
app.use(express.json());

// Simpan data pengguna (gunakan database sebenarnya dalam produksi)
const users = [];

// Rute untuk login
app.post('/api/login', (req, res) => {
    const { whatsapp, password } = req.body;
    const user = users.find(u => u.whatsapp === whatsapp && u.password === password);
    if (user) {
        res.json({ message: 'Login berhasil' });
    } else {
        res.status(401).json({ message: 'Nomor WhatsApp atau password salah' });
    }
});

// Rute untuk registrasi
app.post('/api/register', (req, res) => {
    const { fullName, username, whatsapp, email, password } = req.body;
    if (users.some(u => u.whatsapp === whatsapp || u.email === email)) {
        return res.status(400).json({ message: 'Nomor WhatsApp atau email sudah terdaftar' });
    }
    users.push({ fullName, username, whatsapp, email, password });
    res.json({ message: 'Pendaftaran berhasil' });
});

// Middleware untuk menangani 404 error
app.use((req, res) => {
    res.status(404).json({ message: 'Halaman tidak ditemukan' });
});

// Jalankan server
app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
