export class Aluno {

    constructor() {
        console.log("teste");
        this.id = 0;
        this.nome = '';
        this.sobrenome = '';
        this.telefone = 0;
    }

    id: number;
    nome: string;
    sobrenome: string;
    telefone: number;

    imprimeTeste() {
        console.log("teste");
    }

}