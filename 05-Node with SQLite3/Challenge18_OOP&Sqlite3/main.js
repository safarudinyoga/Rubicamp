const readline = require('readline');
const Table = require('cli-table');
const sqlite3 = require('sqlite3').verbose();

// =======================connect database============================ //
const universitydb = __dirname + "/university.db";
let db = new sqlite3.Database(universitydb, sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        throw err;
    }
});

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// =======================login menu============================== //
function loginMenu() {
    console.log("===================================================================");
    console.log("Welcome to Politeknik Elektronika Negeri Surabaya");
    console.log("Jl. Raya ITS");
    console.log("===================================================================");
    rl.question("Username: ", (username) => {
        console.log("===================================================================");
        rl.question("Password: ", (password) => {
            console.log("===================================================================");
            db.serialize(() => {
                let sql = `SELECT * FROM user WHERE user.username='${username}' AND user.pass='${password}'`;
                db.get(sql, (err, row) => {
                    if (err) {
                        throw err;
                    }
                    if (row) {
                        console.log(`Welcome, '${row.username}'. Your access level is: '${row.userrole}'`);
                        console.log("===================================================================");
                        mainMenu();
                    } else {
                        console.log("Maaf Anda tidak terdaftar, Login Gagal!!");
                        loginMenu();
                    }
                });
            })
        });
    });
}

// ====================================mainmenu================================= //
function mainMenu() {
    console.log("===================================================================");
    console.log("Silahkan pilih opsi di bawah ini =");
    console.log("[1] Mahasiswa");
    console.log("[2] Jurusan");
    console.log("[3] Dosen");
    console.log("[4] Mata Kuliah");
    console.log("[5] Kontrak");
    console.log("[6] Keluar");
    console.log("===================================================================");
    rl.question("Masukkan salah satu no. dari opti diatas:", (num) => {
        switch (num) {
            case "1":
                menuMahasiswa();
                break;
            case "2":
                menuJurusan();
                break;
            case "3":
                menuDosen();
                break;
            case "4":
                menuMatkul();
                break;
            case "5":
                menuKontrak();
                break;
            case "6":
                menuKeluar();
                break;
            default:
                console.log("Pilihan tidak dipilih!");
                mainMenu();
                break;
        }
    });
}
// ==============================menu mahasiswa================================ //
function menuMahasiswa() {
    console.log("===================================================================");
    console.log("Silahkan pilih opsi di bawah ini =");
    console.log("[1] Daftar Murid");
    console.log("[2] Cari Murid");
    console.log("[3] Tambah Murid");
    console.log("[4] Hapus Murid");
    console.log("[5] Kembali");
    console.log("===================================================================");
    rl.question("Masukkan salah satu no. dari opti diatas:", (num) => {
        switch (num) {
            case "1":
                listMahasiswa();
                break;
            case "2":
                cariMahasiswa();
                break;
            case "3":
                addMahasiswa();
                break;
            case "4":
                deleteMahasiswa();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Pilihan tidak dipilih!");
                mainMenu();
                break;
        }
    });
}
// ==============================menu jurusan================================ //
function menuJurusan() {
    console.log("===================================================================");
    console.log("Silahkan pilih opsi di bawah ini =");
    console.log("[1] Daftar Jurusan");
    console.log("[2] Cari Jurusan");
    console.log("[3] Tambah Jurusan");
    console.log("[4] Hapus Jurusan");
    console.log("[5] Kembali");
    console.log("===================================================================");
    rl.question("Masukkan salah satu no. dari opti diatas:", (num) => {
        switch (num) {
            case "1":
                listJurusan();
                break;
            case "2":
                cariJurusan();
                break;
            case "3":
                addJurusan();
                break;
            case "4":
                deleteJurusan();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Pilihan tidak dipilih!");
                mainMenu();
                break;
        }
    });
}
// ==============================menu dosen================================ //
function menuDosen() {
    console.log("===================================================================");
    console.log("Silahkan pilih opsi di bawah ini =");
    console.log("[1] Daftar Dosen");
    console.log("[2] Cari Dosen");
    console.log("[3] Tambah Dosen");
    console.log("[4] Hapus Dosen");
    console.log("[5] Kembali");
    console.log("===================================================================");
    rl.question("Masukkan salah satu no. dari opti diatas:", (num) => {
        switch (num) {
            case "1":
                listDosen();
                break;
            case "2":
                cariDosen();
                break;
            case "3":
                addDosen();
                break;
            case "4":
                deleteDosen();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Pilihan tidak dipilih!");
                mainMenu();
                break;
        }
    });
}
// ==============================menu mata kuliah================================ //
function menuMatkul() {
    console.log("===================================================================");
    console.log("Silahkan pilih opsi di bawah ini =");
    console.log("[1] Daftar Mata Kuliah");
    console.log("[2] Cari Mata Kuliah");
    console.log("[3] Tambah Mata Kuliah");
    console.log("[4] Hapus Mata Kuliah");
    console.log("[5] Kembali");
    console.log("===================================================================");
    rl.question("Masukkan salah satu no. dari opti diatas:", (num) => {
        switch (num) {
            case "1":
                listMatkul();
                break;
            case "2":
                cariMatkul();
                break;
            case "3":
                addMatkul();
                break;
            case "4":
                deleteMatkul();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Pilihan tidak dipilih!");
                mainMenu();
                break;
        }
    });
}
// ==============================menu kontrak================================ //
function menuKontrak() {
    console.log("===================================================================");
    console.log("Silahkan pilih opsi di bawah ini =");
    console.log("[1] Daftar Kontrak");
    console.log("[2] Cari Kontrak");
    console.log("[3] Tambah Kontrak");
    console.log("[4] Hapus Kontrak");
    console.log("[5] Kembali");
    console.log("===================================================================");
    rl.question("Masukkan salah satu no. dari opti diatas:", (num) => {
        switch (num) {
            case "1":
                listKontrak();
                break;
            case "2":
                cariKontrak();
                break;
            case "3":
                addKontrak();
                break;
            case "4":
                deleteKontrak();
                break;
            case "5":
                mainMenu();
                break;
            default:
                console.log("Pilihan tidak dipilih!");
                mainMenu();
                break;
        }
    });
}
// ==============================menu keluar================================ //
function menuKeluar() {
    console.log("===================================================================");
    console.log("Anda telah Keluar.");
    loginMenu();
}

// ==============================MENAMPILKAN LIST================================ //
function listMahasiswa() {
    db.serialize(() => {
        let sql = "SELECT mahasiswa.nim,nama,alamat,umur, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON jurusan.idJurusan = mahasiswa.idJurusan";
        db.all(sql, (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                //cetak row
                let table = new Table({
                    head: ['NIM', 'Nama', 'Alamat', 'Umur', 'Jurusan'], //cetak nama kolom
                    colWidths: [20, 25, 20, 10, 20] //ukuran kolom
                })
                row.forEach((mahasiswa) => {
                    table.push(
                        [`${mahasiswa.nim}`, `${mahasiswa.nama}`, `${mahasiswa.alamat}`, `${mahasiswa.umur}`, `${mahasiswa.nama_jurusan}`]
                    );
                })
                console.log(table.toString());
                menuMahasiswa();
            } else {
                console.log("tidak ada mahasiswa terdaftar");
                menuMahasiswa();
            }
        })
    })
}

function listJurusan() {
    db.serialize(() => {
        let sql = "SELECT * FROM jurusan";
        db.all(sql, (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                //cetak row
                let table = new Table({
                    head: ['Id Jurusan', 'Nama Jurusan'], //cetak nama kolom
                    colWidths: [20, 25] //ukuran kolom
                })
                row.forEach((jurusan) => {
                    table.push(
                        [`${jurusan.idJurusan}`, `${jurusan.nama_jurusan}`]
                    );
                })
                console.log(table.toString());
                menuJurusan();
            } else {
                console.log("tidak ada jurusan terdaftar");
                menuJurusan();
            }
        })
    })
}

function listDosen() {
    db.serialize(() => {
        let sql = "SELECT * FROM dosen";
        db.all(sql, (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                //cetak row
                let table = new Table({
                    head: ['Id Dosen', 'NIP', 'Nama Dosen'], //cetak nama kolom
                    colWidths: [10, 20, 25] //ukuran kolom
                })
                row.forEach((dosen) => {
                    table.push(
                        [`${dosen.idDosen}`, `${dosen.nip}`, `${dosen.nama}`]
                    );
                })
                console.log(table.toString());
                menuDosen();
            } else {
                console.log("tidak ada Dosen terdaftar");
                menuDosen();
            }
        })
    })
}

function listMatkul() {
    db.serialize(() => {
        let sql = "SELECT * FROM matkul";
        db.all(sql, (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                //cetak row
                let table = new Table({
                    head: ['Id Mata Kuliah', 'Nama Mata Kuliah', 'Jumlah SKS'], //cetak nama kolom
                    colWidths: [20, 25, 15] //ukuran kolom
                })
                row.forEach((matkul) => {
                    table.push(
                        [`${matkul.idMatkul}`, `${matkul.nama_matkul}`, `${matkul.sks}`]
                    );
                })
                console.log(table.toString());
                menuMatkul();
            } else {
                console.log("tidak ada Matkul terdaftar");
                menuMatkul();
            }
        })
    })
}

function listKontrak() {
    db.serialize(() => {
        let sql = "SELECT * FROM kontrak";
        db.all(sql, (err, row) => {
            if (err) {
                throw err;
            }
            if (row) {
                //cetak row
                let table = new Table({
                    head: ['NIM', 'NIP', "Mata Kuliah ID", "Nilai"], //cetak nama kolom
                    colWidths: [20, 15, 15, 10] //ukuran kolom
                })
                row.forEach((kontrak) => {
                    table.push(
                        [`${kontrak.nim}`, `${kontrak.nip}`, `${kontrak.idmatkul}`, `${kontrak.nilai}`]
                    );
                })
                console.log(table.toString());
                menuKontrak();
            } else {
                console.log("tidak ada kontrak terdaftar");
                menuKontrak();
            }
        })
    })
}

// ==============================MENCARI ITEM================================ //

function cariMahasiswa(){
    console.log("====================================================");
    rl.question("Masukkan NIM: ", (nim) => {
        console.log("====================================================");
        db.serialize( () => {
            let sql = "SELECT mahasiswa.nim,nama,alamat,umur, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON jurusan.idJurusan = mahasiswa.idJurusan WHERE nim=?";
            db.get(sql, [nim], (err, mahasiswa) => {
                if (err){
                    throw err;
                }
                if (mahasiswa) {
                    console.log("Nim        :" + nim);
                    console.log("Nama       :" + mahasiswa.nama);
                    console.log("Umur       :" + mahasiswa.umur);
                    console.log("Alamat     :" + mahasiswa.alamat);
                    console.log("Jurusan    :" + mahasiswa.idJurusan);
                //cetak kolom
                } else {
                    console.log(`Mahasiswa dengan NIM '${nim}' tidak terdaftar`);
                }
                menuMahasiswa();
            })
        })
    }) 
}

function cariJurusan(){
    console.log("====================================================");
    rl.question("Masukkan Nama Jurusan: ", (nama) => {
        console.log("====================================================");
        db.serialize( () => {
            let sql = "SELECT * FROM jurusan WHERE nama_jurusan=?";
            db.get(sql, [nama], (err, jurusan) => {
                if (err){
                    throw err;
                }
                if (jurusan) {
                    console.log("ID Jurusan        :" + jurusan.idJurusan);
                    console.log("Nama Jurusan      :" + jurusan.nama_jurusan);
                //cetak kolom
                } else {
                    console.log(`Jurusan dengan nama '${nama_n}' tidak terdaftar`);
                }
                menuJurusan();
            })
        })
    }) 
}

function cariDosen(){
    console.log("====================================================");
    rl.question("Masukkan Nama Dosen: ", (nip) => {
        console.log("====================================================");
        db.serialize( () => {
            let sql = "SELECT * FROM dosen WHERE nip=?";
            db.get(sql, [nip], (err, dosen) => {
                if (err){
                    throw err;
                }
                if (dosen) {
                    console.log("ID Dosen        :" + dosen.idDosen);
                    console.log("NIP             :" + dosen.nip);
                    console.log("Nama Dosen      :" + dosen.nama);
                //cetak kolom
                } else {
                    console.log(`Dosen dengan nip '${nip}' tidak terdaftar`);
                }
                menuDosen();
            })
        })
    }) 
}

function cariMatkul(){
    console.log("====================================================");
    rl.question("Masukkan Nama Matkul: ", (nama) => {
        console.log("====================================================");
        db.serialize( () => {
            let sql = "SELECT * FROM matkul WHERE nama_matkul=?";
            db.get(sql, [nama], (err, matkul) => {
                if (err){
                    throw err;
                }
                if (matkul) {
                    console.log("ID Mata Kuliah      :" + matkul.idMatkul);
                    console.log("Nama Mata Kuliah    :" + matkul.nama_matkul);
                    console.log("Jumlah SKS          :" + matkul.sks);
                //cetak kolom
                } else {
                    console.log(`Matkul dengan nama '${nama}' tidak terdaftar`);
                }
                menuMatkul();
            })
        })
    }) 
}

function cariKontrak(){
    console.log("====================================================");
    rl.question("Masukkan Kontrak Nilai: ", (nilai) => {
        console.log("====================================================");
        db.serialize( () => {
            let sql = "SELECT * FROM kontrak WHERE nilai=?";
            db.get(sql, [nilai], (err, kontrak) => {
                if (err){
                    throw err;
                }
                if (kontrak) {
                    console.log("ID Mata Kuliah       :" + kontrak.idmatkul);
                    console.log("NIM                  :" + kontrak.nim);
                    console.log("Nilai Mata Kuliah    :" + kontrak.nilai);
                    console.log("NIP                  :" + kontrak.nip);
                //cetak kolom
                } else {
                    console.log(`Kontrak dengan nilai '${nilai}' tidak terdaftar`);
                }
                menuKontrak();
            })
        })
    }) 
}

// ==============================MENAMBAH ITEM (ADD)================================ //

function addMahasiswa() {
    console.log("lengkapi Data di bawah ini:");
    rl.question("NIM: ", (nim) => {
        rl.question("Nama: ", (nama) => {
            rl.question("Umur: ", (umur) => {
                rl.question("alamat: ", (alamat) => {
                    rl.question("Jurusan: ", (idJurusan) => {
                        db.serialize( () => {
                            let sql = `INSERT INTO mahasiswa (nim, nama, umur, alamat, idJurusan) VALUES ('${nim}', '${nama}', '${umur}', '${alamat}', '${idJurusan}')`
                            db.run (sql, (err) => {
                                if(err){
                                    throw err;
                                }
                                listMahasiswa();
                            })
                        })
                    })
                })
            })
        })
    })
}

function addJurusan() {
    console.log("lengkapi Data di bawah ini:");
    rl.question("ID Jurusan: ", (idJurusan) => {
        rl.question("Nama Jurusan: ", (nama_jurusan) => {
            db.serialize( () => {
                let sql = `INSERT INTO jurusan (idJurusan, nama_jurusan) VALUES ('${idJurusan}', '${nama_jurusan}')`
                db.run (sql, (err) => {
                    if(err){
                        throw err;
                    }
                    listJurusan();
                })
            })
        })
    })
}

function addDosen() {
    console.log("lengkapi Data di bawah ini:");
    rl.question("ID Dosen: ", (idDosen) => {
        rl.question("NIP: ", (nip) => {
            rl.question("Nama Dosen: ", (nama) => {
                db.serialize( () => {
                    let sql = `INSERT INTO dosen (idDosen, nip, nama) VALUES ('${idDosen}', '${nip}', '${nama}')`
                    db.run (sql, (err) => {
                        if(err){
                            throw err;
                        }
                        listDosen();
                    })
                })
            })
        })
    })
}

function addMatkul() {
    console.log("lengkapi Data di bawah ini:");
    rl.question("ID Mata Kuliah: ", (idMatkul) => {
        rl.question("Nama Mata Kuliah: ", (nama_matkul) => {
            rl.question("Jumlah SKS: ", (sks) => {
                db.serialize( () => {
                    let sql = `INSERT INTO matkul (idMatkul, nama_matkul, sks) VALUES ('${idMatkul}', '${nama_matkul}', '${sks}')`
                    db.run (sql, (err) => {
                        if(err){
                            throw err;
                        }
                        listMatkul();
                    })
                })
            })
        })
    })
}

function addKontrak() {
    console.log("lengkapi Data di bawah ini:");
    rl.question("NIM Mahasiswa: ", (nim) => {
        rl.question("NIP Dosen: ", (nip) => {
            rl.question("ID Mata Kuliah: ", (idmatkul) => {
                rl.question("Nilai: ", (nilai) => {
                    db.serialize( () => {
                        let sql = `INSERT INTO kontrak (nim, nip, idmatkul, nilai) VALUES ('${nim}', '${nip}', '${idmatkul}', '${nilai}')`
                        db.run (sql, (err) => {
                            if(err){
                                throw err;
                            }
                            listKontrak();
                        })
                    })
                })
            })
        })
    })
}

// ============================MENGHAPUS ITEM (DELETE)============================== //

function deleteMahasiswa(){
    console.log("===============================================");
    rl.question("Masukkan NIM Mahasiswa yang akan dihapus: ", (nim) => {
        console.log("===============================================");
        db.serialize( () => {
            let sql = "DELETE FROM mahasiswa WHERE nim=?";
            db.run (sql, [nim], (err) => {
                if(err){
                    throw err;
                } else {
                    console.log(`Mahassiwa dengan NIM '${nim}' telah dihapus `);
                    console.log("===============================================");
                    listMahasiswa();
                }
            })
        })
    })
}

function deleteJurusan(){
    console.log("===============================================");
    rl.question("Masukkan Nama Jurusan yang akan dihapus: ", (nama) => {
        console.log("===============================================");
        db.serialize( () => {
            let sql = "DELETE FROM jurusan WHERE nama_jurusan=?";
            db.run (sql, [nama], (err) => {
                if(err){
                    throw err;
                } else {
                    console.log(`Jurusan dengan nama '${nama}' telah dihapus `);
                    console.log("===============================================");
                    listJurusan();
                }
            })
        })
    })
}

function deleteDosen(){
    console.log("===============================================");
    rl.question("Masukkan NIP Dosen Mata Kuliah yang akan dihapus: ", (nip) => {
        console.log("===============================================");
        db.serialize( () => {
            let sql = "DELETE FROM dosen WHERE nip=?";
            db.run (sql, [nip], (err) => {
                if(err){
                    throw err;
                } else {
                    console.log(`Dosen dengan NIP '${nip}' telah dihapus `);
                    console.log("===============================================");
                    listDosen();
                }
            })
        })
    })
}

function deleteMatkul(){
    console.log("===============================================");
    rl.question("Masukkan Nama Mata Kuliah yang akan dihapus: ", (nama) => {
        console.log("===============================================");
        db.serialize( () => {
            let sql = "DELETE FROM matkul WHERE nama_matkul=?";
            db.run (sql, [nama], (err) => {
                if(err){
                    throw err;
                } else {
                    console.log(`Mata Kuliah dengan nama '${nama}' telah dihapus `);
                    console.log("===============================================");
                    listMatkul();
                }
            })
        })
    })
}

function deleteKontrak(){
    console.log("===============================================");
    rl.question("Masukkan ID Kontrak yang akan dihapus: ", (id) => {
        console.log("===============================================");
        db.serialize( () => {
            let sql = "DELETE FROM kontrak WHERE idmatkul=?";
            db.run (sql, [id], (err) => {
                if(err){
                    throw err;
                } else {
                    console.log(`ID Kontrak dengan ID '${id}' telah dihapus `);
                    console.log("===============================================");
                    listKontrak();
                }
            })
        })
    })
}

loginMenu();


