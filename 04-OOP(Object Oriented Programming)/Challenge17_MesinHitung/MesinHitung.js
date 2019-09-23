class MesinHitung {
    constructor(){
        this.x = 1;        
    }

    add(angka){
        this.x += angka;
        return this;
    }

    subtract(angka){
        this.x -= angka;
        return this;
    }

    multiply(angka){
        this.x *= angka;
        return this;
    }

    divide(angka){
        this.x /= angka;
        return this;
    }

    exponent(angka){
        this.x = Math.pow(this.x,angka); //pangkat
        return this;
    }

    square(){
        this.x = Math.pow (this.x, 2); //kuadrat 
        return this;
    }

    squareRoot(){
        this.x = Math.sqrt (this.x);
        return this;
    }

    result(){
        console.log(this.x);
    }
}

export default MesinHitung;