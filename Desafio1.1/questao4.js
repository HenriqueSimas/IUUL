class Aluno {
    constructor(matricula, nome) {
      this.matricula = matricula;
      this.nome = nome;
      this.P1 = null;
      this.P2 = null;
    }
  
    getNotaFinal() {
      if (this.P1 !== null && this.P2 !== null) {
        return ((this.P1 + this.P2) / 2).toFixed(1);
      } else if (this.P1 !== null) {
        return (this.P1 / 2).toFixed(1);
      } else if (this.P2 !== null) {
        return (this.P2 / 2).toFixed(1);
      }
      return '0.0';
    }
  }
  
  class Turma {
    constructor() {
      this.alunos = [];
    }
  
    inserirAluno(aluno) {
      if (!this.alunos.some(a => a.matricula === aluno.matricula)) {
        this.alunos.push(aluno);
      } else {
        console.log(`Aluno com matrícula ${aluno.matricula} já existe.`);
      }
    }
  
    removerAluno(matricula) {
      this.alunos = this.alunos.filter(a => a.matricula !== matricula);
    }
  
    lancarNota(matricula, prova, nota) {
      const aluno = this.alunos.find(a => a.matricula === matricula);
      if (aluno) {
        if (prova === 'P1') aluno.P1 = nota;
        else if (prova === 'P2') aluno.P2 = nota;
      } else {
        console.log(`Aluno com matrícula ${matricula} não encontrado.`);
      }
    }
  
    imprimirAlunos() {
      console.log('---------------------------------------');
      console.log('Matrícula  Nome             P1   P2   NF');
      console.log('---------------------------------------');
      this.alunos
        .sort((a, b) => a.nome.localeCompare(b.nome))
        .forEach(aluno => {
          console.log(
            `${aluno.matricula}   ${aluno.nome.padEnd(15)} ${aluno.P1 || '-'}    ${aluno.P2 || '-'}   ${aluno.getNotaFinal()}`
          );
        });
      console.log('---------------------------------------');
    }
  }
  

  const turma = new Turma();
  turma.inserirAluno(new Aluno('12345', 'Ana de Almeida'));
  turma.inserirAluno(new Aluno('23456', 'Bruno Carvalho'));
  turma.inserirAluno(new Aluno('34567', 'Fernanda Abreu'));
  turma.inserirAluno(new Aluno('45678', 'Joao Santos'));
  
  turma.lancarNota('12345', 'P1', 8.0);
  turma.lancarNota('12345', 'P2', 9.5);
  turma.lancarNota('23456', 'P1', 7.0);
  turma.lancarNota('34567', 'P2', 8.5);
  
  turma.imprimirAlunos();
  