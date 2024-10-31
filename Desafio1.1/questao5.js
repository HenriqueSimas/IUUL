import promptSync from 'prompt-sync';
import { DateTime } from 'luxon';
const prompt = promptSync();

function entradaCliente() {
  let nome, cpf, dataNascimento, renda, estadoCivil, dependentes;

  while (true) {
    nome = prompt('Nome: ');
    if (nome.length >= 5) break;
    console.log('Erro: Nome deve ter pelo menos 5 caracteres.');
  }

  while (true) {
    cpf = prompt('CPF (somente números): ');
    if (/^\d{11}$/.test(cpf)) break;
    console.log('Erro: CPF deve ter exatamente 11 dígitos.');
  }

  while (true) {
    dataNascimento = prompt('Data de nascimento (DD/MM/AAAA): ');
    const [dia, mes, ano] = dataNascimento.split('/');
    const data = DateTime.fromObject({ day: +dia, month: +mes, year: +ano });
    if (data.isValid && DateTime.now().diff(data, 'years').years >= 18) break;
    console.log('Erro: Data inválida ou cliente deve ter pelo menos 18 anos.');
  }

  while (true) {
    renda = prompt('Renda mensal: ').replace(',', '.');
    renda = parseFloat(renda);
    if (renda >= 0 && !isNaN(renda)) break;
    console.log('Erro: Renda deve ser um valor positivo.');
  }

  while (true) {
    estadoCivil = prompt('Estado Civil (C, S, V, D): ').toUpperCase();
    if (['C', 'S', 'V', 'D'].includes(estadoCivil)) break;
    console.log('Erro: Estado civil deve ser C, S, V ou D.');
  }

  while (true) {
    dependentes = parseInt(prompt('Dependentes (0 a 10): '), 10);
    if (dependentes >= 0 && dependentes <= 10) break;
    console.log('Erro: Dependentes devem estar entre 0 e 10.');
  }

  const cpfFormatado = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  const rendaFormatada = renda.toFixed(2).replace('.', ',');
  const dataFormatada = dataNascimento;

  console.log('\nDados do Cliente:');
  console.log(`Nome: ${nome}`);
  console.log(`CPF: ${cpfFormatado}`);
  console.log(`Data de Nascimento: ${dataFormatada}`);
  console.log(`Renda Mensal: R$ ${rendaFormatada}`);
  console.log(`Estado Civil: ${estadoCivil}`);
  console.log(`Dependentes: ${dependentes}`);
}

entradaCliente();

