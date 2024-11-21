// controllers.js
import { DateTime } from 'luxon';

const consultorio = {
    pacientes: [],
    consultas: []
};

// Função para validar CPF
function validarCPF(cpf) {
    // Remove caracteres não numéricos
    cpf = cpf.replace(/[^\d]+/g, '');
    
    // Verifica se o CPF possui 11 dígitos
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false;
    }

    // Cálculo do primeiro dígito verificador
    let soma = 0;
    for (let i = 0; i < 9; i++) {
        soma += parseInt(cpf[i]) * (10 - i);
    }
    let resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf[9])) {
        return false;
    }

    // Cálculo do segundo dígito verificador
    soma = 0;
    for (let i = 0; i < 10; i++) {
        soma += parseInt(cpf[i]) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) {
        resto = 0;
    }
    if (resto !== parseInt(cpf[10])) {
        return false;
    }

    return true;
}

// Função para cadastrar paciente
export function cadastrarPaciente(cpf, nome, dataNascimento) {
    if (!validarCPF(cpf)) {
        return "Erro: CPF inválido.";
    }
    if (consultorio.pacientes.some(p => p.cpf === cpf)) {
        return "Erro: CPF já cadastrado.";
    }

    const dataNasc = DateTime.fromFormat(dataNascimento, 'dd/MM/yyyy');
    const idade = DateTime.now().diff(dataNasc, 'years').years;

    if (idade < 13) {
        return "Erro: paciente deve ter pelo menos 13 anos.";
    }
    consultorio.pacientes.push({ cpf, nome, dataNascimento });
    return "Paciente cadastrado com sucesso!";
}

// Função para excluir paciente
export function excluirPaciente(cpf) {
    const index = consultorio.pacientes.findIndex(p => p.cpf === cpf);
    if (index === -1) {
        return "Erro: paciente não cadastrado.";
    }
    // Verifica se o paciente tem consultas agendadas
    const consultasAgendadas = consultorio.consultas.filter(c => c.cpf === cpf && DateTime.fromISO(c.data) > DateTime.now());
    if (consultasAgendadas.length > 0) {
        return "Erro: paciente está agendado.";
    }
    consultorio.pacientes.splice(index, 1);
    return "Paciente excluído com sucesso!";
}

// Função para agendar consulta
export function agendarConsulta(cpf, dataConsulta, horaInicio, horaFim) {
    if (!validarCPF(cpf)) {
        return "Erro: CPF inválido.";
    }
    // Verifica se o paciente está cadastrado
    if (!consultorio.pacientes.some(p => p.cpf === cpf)) {
        return "Erro: paciente não cadastrado.";
    }

    const dataAgendamento = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
    const horaInicioAgendamento = DateTime.fromFormat(`${dataConsulta} ${horaInicio}`, 'dd/MM/yyyy HHmm');
    const horaFimAgendamento = DateTime.fromFormat(`${dataConsulta} ${horaFim}`, 'dd/MM/yyyy HHmm');
    // Verifica se a data e hora do agendamento são válidas
    if (dataAgendamento < DateTime.now() || (dataAgendamento.equals(DateTime.now()) && horaInicioAgendamento <= DateTime.now())) {
        return "Erro: agendamento deve ser para um horário futuro.";
    }
    if (horaFimAgendamento <= horaInicioAgendamento) {
        return "Erro: hora final deve ser maior que a hora inicial.";
    }

    // Verifica se o paciente já tem um agendamento futuro
    const agendamentosFuturos = consultorio.consultas.filter(c => c.cpf === cpf && DateTime.fromISO(c.data) > DateTime.now());
    if (agendamentosFuturos.length > 0) {
        return "Erro: paciente já possui um agendamento futuro.";
    }

    // Verifica se há agendamentos sobrepostos
    const sobreposicoes = consultorio.consultas.filter(c =>
        DateTime.fromISO(c.data) === dataAgendamento &&
        (
            (horaInicioAgendamento >= DateTime.fromFormat(c.horaInicio, 'HHmm') && horaInicioAgendamento < DateTime.fromFormat(c.horaFim, 'HHmm')) ||
            (horaFimAgendamento > DateTime.fromFormat(c.horaInicio, 'HHmm') && horaFimAgendamento <= DateTime.fromFormat(c.horaFim, 'HHmm')) ||
            (horaInicioAgendamento <= DateTime.fromFormat(c.horaInicio, 'HHmm') && horaFimAgendamento >= DateTime.fromFormat(c.horaFim, 'HHmm'))
        )
    );

    if (sobreposicoes.length > 0) {
        return "Erro: já existe uma consulta agendada nesse horário.";
    }

    // Se tudo estiver correto, adiciona a consulta
    consultorio.consultas.push({
        cpf,
        data: dataAgendamento.toISO(),
        horaInicio: horaInicio,
        horaFim: horaFim
    });
    return "Agendamento realizado com sucesso!";
}

// Função para cancelar agendamento
export function cancelarConsulta(cpf, dataConsulta, horaInicio) {
    if (!validarCPF(cpf)) {
        return "Erro: CPF inválido.";
    }

    const dataAgendamento = DateTime.fromFormat(dataConsulta, 'dd/MM/yyyy');
    const horaInicioAgendamento = DateTime.fromFormat(`${dataConsulta} ${horaInicio}`, 'dd/MM/yyyy HHmm');

    // Verifica se o agendamento é futuro
    if (dataAgendamento < DateTime.now() || (dataAgendamento.equals(DateTime.now()) && horaInicioAgendamento <= DateTime.now())) {
        return "Erro: o cancelamento só pode ser realizado para agendamentos futuros.";
    }

    const index = consultorio.consultas.findIndex(c => c.cpf === cpf && DateTime.fromISO(c.data) === dataAgendamento && c.horaInicio === horaInicio);
    if (index === -1) {
        return "Erro: agendamento não encontrado.";
    }

    consultorio.consultas.splice(index, 1);
    return "Agendamento cancelado com sucesso!";
}

// Funções para listar pacientes e agenda
export function listarPacientes(ordem) {
    const pacientesOrdenados = [...consultorio.pacientes].sort((a, b) => {
        if (ordem === 'cpf') {
            return a.cpf.localeCompare(b.cpf);
        } else {
            return a.nome.localeCompare(b.nome);
        }
    });
    return pacientesOrdenados;
}

export function listarAgenda() {
    return [...consultorio.consultas].sort((a, b) => {
        const dataA = DateTime.fromISO(a.data).toMillis();
        const dataB = DateTime.fromISO(b.data).toMillis();
        return dataA - dataB || a.horaInicio.localeCompare(b.horaInicio);
    });
}