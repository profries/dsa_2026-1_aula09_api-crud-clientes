const clienteRepository = require('../repository/cliente_repository')
const clienteValidador = require('./cliente_validador')

async function listar() {
    const listaClientes = await clienteRepository.listar();
    return listaClientes.map(cliente => { 
        return {
            cpfCnpj: cliente.cpfCnpj,
            tipoPessoa: cliente.tipoPessoa,
            nome: cliente.nome,
            email: cliente.email
        }
    });
}

async function inserir(cliente) {    
    try{
        clienteValidador.validaCliente(cliente) 
        if (await clienteEhUnico(cliente)){
            return await clienteRepository.inserir(cliente);
        }
        else {
            throw "O CPF/CNPJ deve ser único na base";
        }
    }
    catch (erro) {
        throw { id: 400, msg: erro };
    }
}

async function clienteEhUnico(cliente) {
    if(cliente && cliente.cpfCnpj) {
        const consulta = await clienteRepository.buscarPorCpfCnpj(cliente.cpfCnpj);
        return !consulta;
    }
    return false;
}

async function buscarPorCpfCnpj(cpfCnpj) {
    try{
        clienteValidador.validaCpfCnpj(cpfCnpj);
    }
    catch (erro) {
        throw { id: 400, msg: erro };
    }

    let cliente = await clienteRepository.buscarPorCpfCnpj(cpfCnpj);
    if(cliente) {
        return cliente;
    }
    else {
        throw { id: 404, msg: "cliente não encontrado!" }
    }
}

module.exports = {
    listar,
    inserir,
    buscarPorCpfCnpj,
}