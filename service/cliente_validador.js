function validaCpfCnpj(cpfCnpj) {
    if(!cpfCnpj)
        throw "CPF/CNPJ é obrigatório";
    if(cpfCnpj.trim().length < 9)
        throw "CPF/CNPJ deve ter no minimo 9 caracteres";
}

function validaTipoPessoa(tipoPessoa) {
    if(!tipoPessoa)
        throw "O tipo de pessoa é obrigatório";
    if(tipoPessoa.toUpperCase() !== "F" && tipoPessoa.toUpperCase() !== "J")
        throw "O tipo pessoa deve aceitar apenas 'F' para físico e 'J' para jurídico";
}

function validaNome(nome) {
    if(!nome)
        throw "O nome é obrigatório";
    //Só permite letras (a-z), números (0-9) e as letras com acentos e espaço no final
    // /^ e $/ inicia e termina o regex
    //+ permite mais de um desses caracter 
    //i no final (aceita maiusculas ou minusculas)
    let regex = /^[a-z0-9áéíóúâêôç ]+$/i;
    if(!regex.test(nome))
        throw "O nome deve conter apenas letras, números e acentuação";
}

function validaEmail(email) {
    if(!email)
        throw "O e-mail é obrigatório";
    if(email.search('@') < 0 || email.indexOf('.') < 0)
        throw "O e-mail deve ter um único '@' e pelo menos um '.'";
}

function validaDataNascimento(dataNasc) {
    if(!dataNasc)
        return true;

    let [dia, mes, ano] = dataNasc.split('/');
    //Converte para int (mes comeca com 0 e vai ate 11)
    [dia, mes, ano] = [parseInt(dia), parseInt(mes)-1, parseInt(ano)];

    const data = new Date(ano, mes, dia);
    
    if (data.getFullYear() !== ano ||
        data.getMonth() !== mes ||
        data.getDate() !== dia) {
        throw "A data de nascimento deve ser uma data válida."
    }

    if(data > new Date()) {
        throw "A data de nascimento não pode ser uma data futura."
    }
}

function validaCliente(cliente) {
    if(!cliente) throw "Cliente é obrigatório";

    validaCpfCnpj(cliente.cpfCnpj);
    validaTipoPessoa(cliente.tipoPessoa);
    validaNome(cliente.nome);
    validaEmail(cliente.email);
    validaDataNascimento(cliente.dataNascimento);
}

module.exports = {
    validaCpfCnpj,
    validaCliente
}
