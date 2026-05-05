const clienteRepository = require('../repository/cliente_repository')

async function listar() {
    return await clienteRepository.listar();
}

async function inserir(cliente) {
    if(cliente && cliente.cpfCnpj && cliente.tipoPessoa 
        && cliente.nome && cliente.email){
            return await clienteRepository.inserir(cliente);
    }
    else {
        throw { id: 400, msg: "cliente sem dados corretos"}
    }
}

async function buscarPorCpfCnpj(cpfCnpj) {
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