const socket = io();

// Menangkap elemen HTML untuk menampilkan suhu terkini
const temperatureDisplay = document.getElementById('temperature');

// Inisialisasi chart menggunakan Chart.js
const ctx = document.getElementById('temperatureChart').getContext('2d');
const temperatureChart = new Chart(ctx, {
  type: 'line', // Gunakan 'line' untuk area chart
  data: {
    labels: [], // Array waktu yang akan diperbarui
    datasets: [{
      label: 'Temperature (°C)',
      data: [],
      backgroundColor: 'rgba(75, 192, 192, 0.2)', // Warna area chart
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
      fill: true, // Untuk mengisi area chart
    }]
  },
  options: {
    responsive: true,
    scales: {
      x: {
        title: { display: true, text: 'Time' },
      },
      y: {
        title: { display: true, text: 'Temperature (°C)' },
        beginAtZero: true,
      }
    }
  }
});

// Mendengarkan data suhu dari server dan memperbarui chart
socket.on('temperatureUpdate', (temperature) => {
  const currentTime = new Date().toLocaleTimeString();

  // Memperbarui tampilan suhu terkini
  temperatureDisplay.innerText = temperature;

  // Menambah data ke chart
  if (temperatureChart.data.labels.length > 10) {
    temperatureChart.data.labels.shift(); // Menghapus label pertama jika lebih dari 10 data
    temperatureChart.data.datasets[0].data.shift(); // Menghapus data pertama jika lebih dari 10 data
  }
  
  // Menambahkan data baru
  temperatureChart.data.labels.push(currentTime);
  temperatureChart.data.datasets[0].data.push(temperature);
  
  // Update chart
  temperatureChart.update();
});
