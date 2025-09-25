export class PetModel {
  constructor({
    nome,
    especie,
    sexo,
    dataNascimento,
    descricao,
    status = "DISPONIVEL",
    foto,
    adocoes = [],
  }) {
    this.nome = nome;
    this.especie = especie;
    this.sexo = sexo;
    this.dataNascimento = dataNascimento;
    this.descricao = descricao;
    this.status = status;
    this.foto = foto;
    this.adocoes = adocoes;
  }
}
