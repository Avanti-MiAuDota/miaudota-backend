export class EnderecoModel {
    constructor({ cep, logradouro, numero, complemento, bairro, cidade, estado, pais = "Brasil" }) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.estado = estado;
        this.pais = pais;
    }
}

export class UsuarioModel {
    constructor({ nomeCompleto, email, telefone, senha, role = "USUARIO", endereco }) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.telefone = telefone;
        this.senha = senha; 
        this.role = role;
        this.endereco = endereco ? new EnderecoModel(endereco) : null;
    }
}
