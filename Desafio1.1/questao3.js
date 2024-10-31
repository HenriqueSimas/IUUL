import { Vertice } from './questao1.js';
import promptSync from 'prompt-sync';

const prompt = promptSync();

class Poligono {
    #vertices;

    constructor(vertices) {
        if (vertices.length < 3) {
            throw new Error("Um polígono precisa de pelo menos 3 vértices.");
        }
        this.#vertices = vertices;
    }

    addVertice(vertice) {
        if (this.#vertices.some(v => v.equals(vertice))) {
            return false;
        }
        this.#vertices.push(vertice);
        return true;
    }

    get perimetro() {
        let perimetro = 0;
        for (let i = 0; i < this.#vertices.length; i++) {
            const vAtual = this.#vertices[i];
            const vProx = this.#vertices[(i + 1) % this.#vertices.length];
            perimetro += vAtual.distancia(vProx);
        }
        return perimetro;
    }

    get qtdVertices() {
        return this.#vertices.length;
    }
}


function main() {
   
    const vertices = [];

    for (let i = 1; i <= 3; i++) {
        console.log(`Digite as coordenadas do vértice ${i} (x e y):`);
        const x = parseFloat(prompt(`x${i}: `));
        const y = parseFloat(prompt(`y${i}: `));
        vertices.push(new Vertice(x, y));
    }

    try {
        const poligono = new Poligono(vertices);
        console.log(`Perímetro do polígono: ${poligono.perimetro.toFixed(2)}`);
        console.log(`Quantidade de vértices: ${poligono.qtdVertices}`);

        
        console.log("Digite as coordenadas de um novo vértice:");
        const x = parseFloat(prompt("x: "));
        const y = parseFloat(prompt("y: "));
        const novoVertice = new Vertice(x, y);

        if (poligono.addVertice(novoVertice)) {
            console.log("Vértice adicionado com sucesso.");
        } else {
            console.log("O vértice já existe no polígono.");
        }
        console.log(`Novo perímetro do polígono: ${poligono.perimetro.toFixed(2)}`);
        console.log(`Nova quantidade de vértices: ${poligono.qtdVertices}`);
    } catch (error) {
        console.log(error.message);
    }
}

main();
