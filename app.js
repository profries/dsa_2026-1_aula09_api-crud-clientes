const express = require ("express")
const clienteService = require("./service/cliente_service")

const app = express();
app.use(express.json()) // for parsing application/json

app.get("/hello", (req, res) => {
    res.send("Hello World");
})

app.get("/api/clientes", async (req, res) =>{
    const listaClientes = await clienteService.listar();
    res.json(listaClientes);
})

app.get("/api/clientes/:cpfCnpj", async (req, res) =>{
    const cpfCnpj = req.params.cpfCnpj;
    try{
        const cliente = await clienteService.buscarPorCpfCnpj(cpfCnpj);
        res.json(cliente);
    }
    catch(err) {
        res.status(err.id).json({erro:err.msg});
    }
})

app.post("/api/clientes", async (req, res) =>{
    const cliente = req.body;
    try{
        const clienteInserido = await clienteService.inserir(cliente);
        res.status(201).json(clienteInserido);
    }
    catch(err) {
        res.status(err.id).json({erro:err.msg});
    }   
})

app.listen(3000, () => {
    console.log("Servidor está rodando na porta 3000");
})