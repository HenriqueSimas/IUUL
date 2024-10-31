import promptSync from 'prompt-sync';

const prompt = promptSync();
export class Vertice {
    #x; 
    #y; 

    constructor(x, y) {
        this.#x = x;
        this.#y = y;
    }

    // Getters 
    get x() {
        return this.#x;
    }

    get y() {
        return this.#y;
    }

    // cálculo da distância euclidiana entre dois vértices
    distancia(outroVertice) {
        const dx = this.#x - outroVertice.x;
        const dy = this.#y - outroVertice.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    // move o vértice para uma nova posição (x, y)
    move(novoX, novoY) {
        this.#x = novoX;
        this.#y = novoY;
    }

    // verifica se dois vértices são iguais
    equals(outroVertice) {
        return this.#x === outroVertice.x && this.#y === outroVertice.y;
    }
}
// função que ler valores do usuário e criar os vértices
function main() {

    console.log("Digite as coordenadas do primeiro vértice (x e y):");
    const x1 = parseFloat(prompt("x1: "));
    const y1 = parseFloat(prompt("y1: "));
    const vertice1 = new Vertice(x1, y1);

    console.log("Digite as coordenadas do segundo vértice (x e y):");
    const x2 = parseFloat(prompt("x2: "));
    const y2 = parseFloat(prompt("y2: "));
    const vertice2 = new Vertice(x2, y2);

    console.log("Digite as coordenadas do terceiro vértice (x e y):");
    const x3 = parseFloat(prompt("x3: "));
    const y3 = parseFloat(prompt("y3: "));
    const vertice3 = new Vertice(x3, y3);

    // testa os métodos
    console.log(`Distância entre o primeiro e o segundo vértice: ${vertice1.distancia(vertice2).toFixed(2)}`);
    
    // solicita novas coordenadas para o terceiro vértice
    console.log("Digite as novas coordenadas para o terceiro vértice (x e y):");
    const novoX = parseFloat(prompt("novo x: "));
    const novoY = parseFloat(prompt("novo y: "));
    vertice3.move(novoX, novoY);
    console.log(`Nova posição do terceiro vértice: (${vertice3.x}, ${vertice3.y})`);
     // Verifica se o primeiro vértice é igual ao segundo
     const iguais = vertice1.equals(vertice2) ? "são iguais" : "não são iguais";
     console.log(`O primeiro vértice e o segundo vértice ${iguais}.`);
    
}

// chamada da função principal 
main();


