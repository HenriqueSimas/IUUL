// menu.js
import prompt from 'prompt-sync';
import {
    cadastrarPaciente,
    excluirPaciente,
    agendarConsulta,
    cancelarConsulta,
    listarPacientes,
    listarAgenda
} from './controllers.js';
import { DateTime } from 'luxon';

const input = prompt();

export function mostrarMenuPrincipal() {
    while (true) {
        console.log("\nMenu Principal");
        console.log("1 - Cadastro de pacientes");
        console.log("2 - Agenda");
        console.log("3 - Fim");
        const opcao = input("Escolha uma opção: ");

        if (opcao === '1') {
            mostrarMenuCadastroPacientes();
        } else if (opcao === '2') {
            mostrarMenuAgenda();
        } else if (opcao === '3') {
            console.log("Saindo do sistema. Até logo!");
            break;
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    }
}

function mostrarMenuCadastroPacientes() {
    while (true) {
        console.log("\nMenu do Cadastro de Pacientes");
        console.log("1 - Cadastrar novo paciente");
        console.log("2 - Excluir paciente");
        console.log("3 - Listar pacientes (ordenado por CPF)");
        console.log("4 - Listar pacientes (ordenado por nome)");
        console.log("5 - Voltar para o menu principal");
        const opcao = input("Escolha uma opção: ");

        if (opcao === '1') {
            const cpf = input("CPF: ");
            const nome = input("Nome: ");
            const dataNascimento = input("Data de nascimento (DD/MM/AAAA): ");
            console.log(cadastrarPaciente(cpf, nome, dataNascimento));
        } else if (opcao === '2') {
            const cpf = input("CPF do paciente a ser excluído: ");
            console.log(excluirPaciente(cpf));
        } else if (opcao === '3') {
            const pacientes = listarPacientes('cpf');
            console.table(pacientes.map(p => ({
                ...p,
                idade: Math.floor(DateTime.now().diff(DateTime.fromFormat(p.dataNascimento, 'dd/MM/yyyy'), 'years').years)
            }))); // Calcula a idade na listagem
        } else if (opcao === '4') {
            const pacientes = listarPacientes('nome');
            console.table(pacientes.map(p => ({
                ...p,
                idade: Math.floor(DateTime.now().diff(DateTime.fromFormat(p.dataNascimento, 'dd/MM/yyyy'), 'years').years)
            }))); // Calcula a idade na listagem
        } else if (opcao === '5') {
            break;
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    }
}

function mostrarMenuAgenda() {
    while (true) {
        console.log("\nMenu da Agenda");
        console.log("1 - Agendar consulta");
        console.log("2 - Cancelar agendamento");
        console.log("3 - Listar agenda");
        console.log("4 - Voltar para o menu principal");
        const opcao = input("Escolha uma opção: ");

        if (opcao === '1') {
            const cpf = input("CPF do paciente: ");
            const dataConsulta = input("Data da consulta (DD/MM/AAAA): ");
            const horaInicio = input("Hora inicial (HHMM): ");
            const horaFim = input("Hora final (HHMM): ");
            console.log(agendarConsulta(cpf, dataConsulta, horaInicio, horaFim));
        } else if (opcao === '2') {
            const cpf = input("CPF do paciente: ");
            const dataConsulta = input("Data da consulta (DD/MM/AAAA): ");
            const horaInicio = input("Hora inicial (HHMM): ");
            console.log(cancelarConsulta(cpf, dataConsulta, horaInicio));
        } else if (opcao === '3') {
            const agenda = listarAgenda();
            console.table(agenda);
        } else if (opcao === '4') {
            break;
        } else {
            console.log("Opção inválida. Tente novamente.");
        }
    }
}