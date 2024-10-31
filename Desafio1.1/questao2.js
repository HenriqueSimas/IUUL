import {Vertice} from './questao1'

class Triangulo {
    #v1;
    #v2;
    #v3;

    constructor(v1, v2, v3) {
        if (!Triangulo.#formaTriangulo(v1, v2, v3)) {
            throw new Error("Os vértices fornecidos não formam um triângulo válido.");
        }
        this.#v1 = v1;
        this.#v2 = v2;
        this.#v3 = v3;
    }

    get v1() {
        return this.#v1;
    }

    get v2() {
        return this.#v2;
    }

    get v3() {
        return this.#v3;
    }

    static #formaTriangulo(v1, v2, v3) {
        const a = v1.distancia(v2);
        const b = v2.distancia(v3);
        const c = v3.distancia(v1);
        return a + b > c && a + c > b && b + c > a;
    }

    equals(outroTriangulo) {
        return (this.#v1.equals(outroTriangulo.v1) && this.#v2.equals(outroTriangulo.v2) && this.#v3.equals(outroTriangulo.v3));
    }

    get perimetro() {
        const a = this.#v1.distancia(this.#v2);
        const b = this.#v2.distancia(this.#v3);
        const c = this.#v3.distancia(this.#v1);
        return a + b + c;
    }

    tipo() {
        const a = this.#v1.distancia(this.#v2);
        const b = this.#v2.distancia(this.#v3);
        const c = this.#v3.distancia(this.#v1);
        if (a === b && b === c) {
            return "equilátero";
        } else if (a === b || b === c || a === c) {
            return "isósceles";
        } else {
            return "escaleno";
        }
    }

    clone() {
        return new Triangulo(this.#v1, this.#v2, this.#v3);
    }

    get area() {
        const a = this.#v1.distancia(this.#v2);
        const b = this.#v2.distancia(this.#v3);
        const c = this.#v3.distancia(this.#v1);
        const s = this.perimetro / 2;
        return Math.sqrt(s * (s - a) * (s - b) * (s - c));
    }
}

function main() {
    const prompt = require('prompt-sync')();

    function criaVertice(numero) {
        console.log(`Digite as coordenadas do vértice ${numero} (x e y):`);
        const x = parseFloat(prompt(`x${numero}: `));
        const y = parseFloat(prompt(`y${numero}: `));
        return new Vertice(x, y);
    }

    const triangulos = [];
    for (let i = 1; i <= 3; i++) {
        console.log(`\nCriando o triângulo ${i}:`);
        const v1 = criaVertice(1);
        const v2 = criaVertice(2);
        const v3 = criaVertice(3);

        try {
            const triangulo = new Triangulo(v1, v2, v3);
            triangulos.push(triangulo);

            console.log(`Perímetro do triângulo ${i}: ${triangulo.perimetro.toFixed(2)}`);
            console.log(`Área do triângulo ${i}: ${triangulo.area.toFixed(2)}`);
            console.log(`Tipo do triângulo ${i}: ${triangulo.tipo()}`);

            const cloneTriangulo = triangulo.clone();
            console.log(`O triângulo ${i} e seu clone são iguais? ${triangulo.equals(cloneTriangulo) ? "Sim" : "Não"}`);
        } catch (error) {
            console.log(`Erro ao criar triângulo ${i}: ${error.message}`);
        }
    }

    console.log("\nComparação entre os triângulos:");
    for (let i = 0; i < triangulos.length; i++) {
        for (let j = i + 1; j < triangulos.length; j++) {
            console.log(`Triângulo ${i + 1} e Triângulo ${j + 1} ${triangulos[i].equals(triangulos[j]) ? "são iguais" : "não são iguais"}`);
        }
    }
}

main();
