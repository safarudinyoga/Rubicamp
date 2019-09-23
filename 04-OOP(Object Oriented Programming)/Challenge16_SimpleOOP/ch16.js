class CarFactory { //class
    constructor(){
        this.numOfCar = [Math.floor(Math.random() * 4)]; //random
        
    }
    buildStart(){
        // factory start build;
        const merekMobil = {Ferrari, BMW, Hyundai, Ford};
        const brandsCar = Object.keys(merekMobil);
        let carThisMonth = [];
        brandsCar.Ferrari = new Ferrari(2,2); // (pintu, kursi)
        brandsCar.BMW = new BMW(4,4);
        brandsCar.Hyundai = new Hyundai(4,8);
        brandsCar.Ford = new Ford(2,4);
        // push type car to array
        for (let i= 0; i < this.numOfCar; i++){
            carThisMonth.push(brandsCar.Ferrari.buildFerrari());
            carThisMonth.push(brandsCar.BMW.buildBMW());
            carThisMonth.push(brandsCar.Hyundai.buildHyundai());
            carThisMonth.push(brandsCar.Ford.buildFord());
        }
        console.log(this.numOfCar * 1);
        console.log(carThisMonth);
    }
}

class Car {
    // adding properties of car
    constructor (numOfDoor, numOfChair){
        this.numOfDoor = numOfDoor;
        this.numOfChair = numOfChair;
        this.yearsBuild = 2019;
        this.tire = new Tire();
    }
    // method random warranties
    simulateWarranties(){
        let year = new Date();
        return (year.getFullYear() + (Math.floor(Math.random() * 4) + 2));
        //console.log(`Warranties for `);
    }
}

class Tire {
    constructor(){
        let typeTire = ["Michelin", "Dunlop", "Goodyear", "Bridgestone"];
        this.brandTire = typeTire[Math.floor(Math.random() * 4)]; // random  
    }
}

class Ferrari extends Car {
    buildFerrari(){
        let build = {
            carThisMonth: 'Ferrari',
            numOfDoor: `${this.numOfDoor}`,
            numOfChair: `${this.numOfChair}`,
            tire: `'Tire brand is ${this.tire.brandTire}'`,
            tireAge: `'This Tire expired in ${(Math.floor(Math.random()*4) + 1)} year'`,
            warranties: `${(this.simulateWarranties() - this.yearsBuild >= 0) ? 'Activate' : 'expired'}`
        }
        return build;
    }
}

class BMW extends Car {
    buildBMW(){
        let build = {
            carThisMonth: 'BMW',
            numOfDoor: `${this.numOfDoor}`,
            numOfChair: `${this.numOfChair}`,
            tire: `'Tire brand is ${this.tire.brandTire}'`,
            tireAge: `'This Tire expired in ${(Math.floor(Math.random()*4) + 1)} year'`,
            warranties: `${(this.simulateWarranties() - this.yearsBuild >= 0) ? 'Activate' : 'expired'}`
        }
        return build;
    }
}

class Hyundai extends Car {
    buildHyundai(){
        let build = {
            carThisMonth: 'Hyundai',
            numOfDoor: `${this.numOfDoor}`,
            numOfChair: `${this.numOfChair}`,
            tire: `'Tire brand is ${this.tire.brandTire}'`,
            tireAge: `'This Tire expired in ${(Math.floor(Math.random()*4) + 1)} year'`,
            warranties: `${(this.simulateWarranties() - this.yearsBuild >= 0) ? 'Activate' : 'expired'}`
        }
        return build;
    }
}

class Ford extends Car {
    buildFord(){
        let build = {
            carThisMonth: 'Ford',
            numOfDoor: `${this.numOfDoor}`,
            tire: `'Tire brand is ${this.tire.brandTire}'`,
            tireAge: `'This Tire expired in ${(Math.floor(Math.random()*4) + 1)} year'`,
            warranties: `${(this.simulateWarranties() - this.yearsBuild >= 0) ? 'Activate' : 'expired'}`
        }
        return build;
    }
}

let factory = new CarFactory();
factory.buildStart();