export class EnderecoModel {
  constructor({
    cep,
    logradouro,
    numero,
    complemento,
    bairro,
    cidade,
    estado,
    pais = "Brasil",
  }) {
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
