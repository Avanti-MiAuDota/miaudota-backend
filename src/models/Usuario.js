export class UsuarioModel {
    constructor({ nomeCompleto, email, telefone, senha, role = "USUARIO", endereco }) {
        this.nomeCompleto = nomeCompleto;
        this.email = email;
        this.senha = senha; 
        this.role = role;
    }
}
