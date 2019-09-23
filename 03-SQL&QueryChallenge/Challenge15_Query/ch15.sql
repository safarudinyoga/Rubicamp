CREATE TABLE mahasiswa (
    nim            varchar(20) NOT NULL,
    nama           varchar(25) NOT NULL,
    umur           INTEGER  NOT NULL,
    alamat         varchar(25) NOT NULL,
    idJurusan        INTEGER NOT NULL,
    PRIMARY KEY (nim),
    FOREIGN KEY (idJurusan) REFERENCES jurusan(idJurusan)
);

CREATE TABLE jurusan (
    idJurusan       INTEGER  AUTO_INCREMENT,
    nama_jurusan    varchar(25) NOT NULL,
    PRIMARY KEY (idJurusan)
);
CREATE TABLE dosen (
    idDosen         INTEGER AUTO_INCREMENT,
    nip             varchar(25) NOT NULL,
    nama            varchar(25) NOT NULL,
    PRIMARY KEY (idDosen)
);

CREATE TABLE matkul (
    idMatkul        INTEGER AUTO_INCREMENT,
    nama_matkul     varchar(25) NOT NULL,
    sks             varchar(1) NOT NULL,
    PRIMARY KEY (idMatkul)
);

CREATE TABLE kontrak (
    id          INTEGER AUTO_INCREMENT,
    idmatkul    INTEGER NOT NULL,
    nilai       varchar(1)  NOT NULL,
    nim         varchar(25) NOT NULL,
    nip         varchar(25) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (idmatkul) REFERENCES matkul(idMatkul),
    FOREIGN KEY (nim) REFERENCES mahasiswa(nim),
    FOREIGN KEY (nip) REFERENCES dosen(nip)
);

INSERT INTO mahasiswa (nim, nama, umur, alamat, idJurusan)
VALUES ('1203161037','SupermanIsDead', 22, 'Pasar Maling', 1),
('1203161038', 'BatmanIsDead', 17, 'Pasar Kebun', 2),
('1203161039', 'IronManIsDead', 19, 'Pasar 3000', 3);

INSERT INTO jurusan (idJurusan, nama_jurusan)
VALUES (1, 'Perdukunan'),
(2, 'Persantetan'),
(3, 'Perobotan');

INSERT INTO dosen (nip, nama)
VALUES ('120120','Endang'),
('120121','Sukamti'),
('120122','Gakari');

INSERT INTO matkul (idMatkul, nama_matkul, sks)
VALUES (1, 'santet', '7'),
(2, 'santuy', '4'),
(3, 'data mining', '6');

INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (1, 'A', '1203161037', '120120');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (1, 'B', '1203161038', '120120');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (1, 'C', '1203161039', '120120');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (2, 'C', '1203161037', '120121');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (2, 'D', '1203161038', '120121');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (2, 'A', '1203161039', '120121');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (3, 'B', '1203161037', '120122');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (3, 'E', '1203161038', '120122');
INSERT INTO kontrak (idmatkul, nilai, nim, nip)
VALUES (3, 'A', '1203161039', '120122');

/* 1 Tampilkan data mahasiswa beserta nama jurusan*/
SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.umur, mahasiswa.alamat, jurusan.nama_jurusan FROM mahasiswa INNER JOIN jurusan ON mahasiswa.idJurusan=jurusan.idJurusan;

/* 2 tampilkan mahasiswa yang memiliki umur dibawah 20 tahun*/
SELECT * FROM mahasiswa WHERE umur < 20;

/* 3 tampilkan mahasiswa yang memiliki nilai 'B' ke atas*/
SELECT mahasiswa.nim, mahasiswa.nama, kontrak.nilai FROM mahasiswa INNER JOIN kontrak ON mahasiswa.nim = kontrak.nim WHERE nilai = 'A' OR nilai = 'B';

/* 4 tampilkan mahasiswa yang memiliki jumlah sks lebih dari 10*/
SELECT mahasiswa.nama, kontrak.nim, SUM(sks) FROM ((kontrak INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim) INNER JOIN matkul ON matkul.idMatkul = kontrak.idmatkul) GROUP BY kontrak.nim HAVING SUM(sks) > 10;

/* 5 menampilkan mahasiswa yang mengontrak mata kuliah 'data mining' */
SELECT mahasiswa.nama, mahasiswa.nim, matkul.nama_matkul FROM ((kontrak INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim) INNER JOIN matkul ON matkul.idMatkul = kontrak.idmatkul)  WHERE nama_matkul = 'data mining';

/* 6 tampilkan jumlah mahasiswa untuk setiap dosen */
SELECT dosen.nip, dosen.nama, count(mahasiswa.nama) FROM ((kontrak INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim) INNER JOIN dosen ON dosen.nip = kontrak.nip) GROUP BY kontrak.nip HAVING count(mahasiswa.nama);

/* 7 urutkan mahasiswa berdasarkan umurnya */
SELECT * FROM mahasiswa ORDER BY umur ASC;

/* 8 tampilkan kontrak matakuliah yang harus diulangi(nilai D dan E) serta menampilkan
data mahasiswa, jurusan dan dosen secara lengkap, gunakan mode JOIN dan WHERE 
(solusi terdiri dari 2 syntax SQL) */
SELECT mahasiswa.nim, mahasiswa.nama, mahasiswa.umur, mahasiswa.alamat, jurusan.nama_jurusan, dosen.nip, dosen.nama, matkul.nama_matkul, matkul.sks, kontrak.nilai FROM ((((kontrak INNER JOIN mahasiswa ON kontrak.nim = mahasiswa.nim) INNER JOIN dosen ON dosen.nip = kontrak.nip) INNER JOIN matkul ON matkul.idMatkul = kontrak.idmatkul) INNER JOIN jurusan ON mahasiswa.idJurusan = jurusan.idJurusan) WHERE nilai = 'D' OR nilai = 'E';

