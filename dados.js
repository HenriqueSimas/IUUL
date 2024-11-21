
export class Paciente {
    constructor(cpf, nome, dataNascimento) {
        this.cpf = cpf;
        this.nome = nome;
        this.dataNascimento = dataNascimento;
    }
}

export class Consulta {
    constructor(paciente, data, horaInicio, horaFim) {
        this.paciente = paciente;
        this.data = data;
        this.horaInicio = horaInicio;
        this.horaFim = horaFim;
    }
}

export class Consultorio {
    constructor() {
        this.pacientes = [];
        this.consultas = [];
    }
}