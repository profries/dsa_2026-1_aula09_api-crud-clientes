let listaClientes = [];

async function listar() {
    return listaClientes;
}

async function buscarPorCpfCnpj(cpfCnpj) {
    return (listaClientes.find(
        function(cliente) {
            return (cliente.cpfCnpj === cpfCnpj);
        }
    ));
}

async function inserir(cliente) {
    if(!cliente || !cliente.cpfCnpj || !cliente.tipoPessoa 
        || !cliente.nome || !cliente.email) {
            return;
    }
    listaClientes.push(cliente);
    return cliente;
}

module.exports = {
    listar,
    inserir,
    buscarPorCpfCnpj,
}