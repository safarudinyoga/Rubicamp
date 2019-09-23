class CarFactory{
    constructor(){
        this.banyakMobil = [Math.floor(Math.random() * 3)];
    }
    startBuild(){
        let mobilBulanIni = [];
        let startBrio = new Brio(4,4);
        let startPajero = new Pajero(4,8);
        let startInnova = new Innova(4,5);
        for(let i = 0; i < this.banyakMobil; i++){
            mobilBulanIni.push(startInnova.buildInnova());
            mobilBulanIni.push(startBrio.buildBrio());
            mobilBulanIni.push(startPajero.buildPajero());
        }
        console.log(this.banyakMobil * 3);
        console.log(mobilBulanIni);
        
    }
}

class Car{
    //properties mobil
    constructor(banyakPintu, banyakKursi){
        this.Ban = new Tyre();
        this.banyakPintu = banyakPintu;
        this.banyakKursi = banyakKursi; 
        this.tahunHardcode = 2023;
    }
    //method random masa garansi
    batasGaransi(){
        let Year = new Date();
        return (Year.getFullYear() + (Math.floor(Math.random() * 4) + 3));
    }
}

class Tyre{
    constructor(){
        let arrBan = ["GoodYear", "Michellin", "Dunlop", "Bridgestone", "Pirelli"];
        this.merekBan = arrBan[Math.floor(Math.random() * 4)];
    }
    getMerek(){
        console.log("Ban bermerek: " + this.merekBan);
    }
    getAvgDuration(){
        let x = Math.floor(Math.random() * 4) + 1;
        console.log("Ban ini tahan hingga " + x + " tahun");
    }
}

class Innova extends Car{
    buildInnova(){
        let objBuild = {
            MerekMobil: "Innova",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.Ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.tahunHardcode >= 0) ? "Aktif" : "Habis"}`
        }
        return objBuild;
    }
}
class Pajero extends Car{
    buildPajero(){
        let objBuild = {
            MerekMobil: "Pajero",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.Ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.tahunHardcode >= 0) ? "Aktif" : "Habis"}`
        }
        return objBuild;
    }
}
class Brio extends Car{
    buildBrio(){
        let objBuild = {
            MerekMobil: "Brio",
            banyakPintu: `${this.banyakPintu}`,
            banyakKursi: `${this.banyakKursi}`,
            Ban:`${this.Ban.merekBan}`,
            statusGaransi:`${(this.batasGaransi() - this.tahunHardcode >= 0) ? "Aktif" : "Habis"}`
        }
        return objBuild;
    }
}

let Pabrik = new CarFactory();
Pabrik.startBuild();
