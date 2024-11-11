const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Set EJS sebagai view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware untuk melayani file statis di folder public
app.use(express.static(path.join(__dirname, 'public')));

// Route utama untuk render halaman
app.get('/', (req, res) => {
  res.render('index', { title: 'Real-time Temperature Monitoring' });
});

// Generate data suhu secara random setiap 2 detik
setInterval(() => {
  const temperature = (Math.random() * 20 + 10).toFixed(2); // suhu antara 10-30 derajat Celsius
  io.emit('temperatureUpdate', temperature);
}, 2000);

// Jalankan server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});
