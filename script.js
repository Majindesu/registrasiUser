// Konstruktor untuk objek Pendaftar
function Pendaftar(nama, umur, uang) {
    this.nama = nama;
    this.umur = umur;
    this.uang = uang;
}

// Konstruktor untuk objek PendaftarList
function PendaftarList() {
    this.pendaftarData = [];

    this.addPendaftar = function (pendaftar) {
        this.pendaftarData.push(pendaftar);
    };

    this.displayPendaftar = function () {
        const pendaftarList = document.getElementById('pendaftarList');
        const resumePendaftar = document.getElementById('resumePendaftar');

        // Hapus data sebelumnya
        pendaftarList.innerHTML = '';
        resumePendaftar.textContent = '';

        // Tampilkan data pendaftar
        this.pendaftarData.forEach((data) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.nama}</td>
                <td>${data.umur}</td>
                <td>${data.uang}</td>
            `;
            pendaftarList.appendChild(row);
        });

        // Tampilkan resume rata-rata pendaftar
        resumePendaftar.innerHTML = `<p>Rata-rata pendaftar memiliki uang sangu sebesar <span class="datapenting">${this.calculateAverageUangSangu()}</span> dengan rata-rata umur <span class="datapenting">${this.calculateAverageUmur()}</span></p>`;
    };

    this.calculateAverageUangSangu = function () {
        const totalUangSangu = this.pendaftarData.reduce((sum, data) => sum + data.uang, 0);
        return this.pendaftarData.length > 0 ? (totalUangSangu / this.pendaftarData.length).toFixed(2) : 0;
    };

    this.calculateAverageUmur = function () {
        const totalUmur = this.pendaftarData.reduce((sum, data) => sum + data.umur, 0);
        return this.pendaftarData.length > 0 ? (totalUmur / this.pendaftarData.length).toFixed(2) : 0;
    };
}

// Handle submit form
document.getElementById('registrasiForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Validasi form
    const nama = document.getElementById('nama').value;
    const umur = parseInt(document.getElementById('umur').value);
    const uang = parseInt(document.getElementById('uang').value);

    if (nama.length < 10) {
        alert('Nama harus lebih dari 10 karakter.');
        return;
    } else if (umur < 25) {
        alert('Umur harus diatas 25 tahun.');
        return;
    } else if (uang < 100000) {
        alert('Uang sangu minimal 100000.');
        return;
    } else if (uang > 1000000) {
        alert('Uang sangu tidak bisa diatas 1000000.');
        return;
    }

    // Buat objek Pendaftar
    const pendaftar = new Pendaftar(nama, umur, uang);

    // Tambahkan objek Pendaftar ke PendaftarList
    pendaftarList.addPendaftar(pendaftar);

    // Reset form
    this.reset();

    // Tampilkan data pendaftar
    pendaftarList.displayPendaftar();
});

// Buat objek PendaftarList
const pendaftarList = new PendaftarList();
