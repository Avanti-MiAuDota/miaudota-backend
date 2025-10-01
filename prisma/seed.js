import e from "cors";
import prisma from "../src/config/database.js";
import bcrypt from "bcrypt";

async function main() {

  const senhaHash = await bcrypt.hash("admin123", 10);

  const adminExists = await prisma.usuario.findUnique({
    where: { email: "admin@admin.com" },
  });

  if (!adminExists) {
    await prisma.usuario.create({
      data: {
        nomeCompleto: "Administrador do Abrigo",
        email: "admin@admin.com",
        senhaHash,
        role: "ADMIN",
      },
    });
    console.log("Admin criado com sucesso!");
  } else {
    console.log("Admin já existe.");
  }

  
  const petsData =
    [
    {
      nome: "Anakin",
      especie: "GATO",
      sexo: "MACHO",
      dataNascimento: new Date("2022-03-15T00:00:00.000Z"),
      descricao: "Um gato muito esperto e carinhoso, adora um bom carinho na barriga.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/anakin-gato.jpg",
    },
    {
      nome: "Belote",
      especie: "GATO",
      sexo: "MACHO",
      dataNascimento: new Date("2021-11-20T00:00:00.000Z"),
      descricao: "Um gato tranquilo e observador, companheiro para todas as horas.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/belote-gato.jpg",
    },
    {
      nome: "Dobby",
      especie: "CAO", 
      sexo: "MACHO",
      dataNascimento: new Date("2023-01-10T00:00:00.000Z"),
      descricao: "Um cachorrinho leal e brincalhão, sempre pronto para uma nova aventura.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/dobby-cachorro.jpg",
    },
    {
      nome: "Felix",
      especie: "CAO", 
      sexo: "MACHO",
      dataNascimento: new Date("2020-07-05T00:00:00.000Z"),
      descricao: "Felix é um cachorro amigável e cheio de energia, ótimo para famílias ativas.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/felix-cachorro.jpg",
    },
    {
      nome: "Hermione",
      especie: "GATO",
      sexo: "FEMEA",
      dataNascimento: new Date("2022-09-01T00:00:00.000Z"),
      descricao: "Uma gata muito inteligente e independente, mas que adora um colo no fim do dia.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/hermione-gato.jpg",
    },
    {
      nome: "Jennis",
      especie: "GATO",
      sexo: "FEMEA",
      dataNascimento: new Date("2023-02-22T00:00:00.000Z"),
      descricao: "Jennis é uma gatinha curiosa e divertida, que vai alegrar o seu lar.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/jennis-gato.jpg",
    },
    {
      nome: "Lilo",
      especie: "CAO", 
      sexo: "FEMEA",
      dataNascimento: new Date("2021-06-18T00:00:00.000Z"),
      descricao: "Lilo é uma cachorra dócil e companheira, perfeita para longas caminhadas.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/lilo-cachorro.jpg",
    },
    {
      nome: "Lune",
      especie: "GATO",
      sexo: "FEMEA",
      dataNascimento: new Date("2022-05-14T00:00:00.000Z"),
      descricao: "Uma gata de pelagem macia e olhar encantador, muito tranquila e carinhosa.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/lune-gata.jpg",
    },
    {
      nome: "Marley",
      especie: "CAO", 
      sexo: "MACHO",
      dataNascimento: new Date("2020-12-01T00:00:00.000Z"),
      descricao: "Marley é um cachorro brincalhão e cheio de amor para dar, adora correr ao ar livre.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/marley-cachorro.jpg",
    },
    {
      nome: "Meg",
      especie: "CAO", 
      sexo: "FEMEA",
      dataNascimento: new Date("2022-08-30T00:00:00.000Z"),
      descricao: "Meg é uma cachorrinha doce e gentil, que se dá bem com todos.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/meg-cachorra.jpg",
    },
    {
      nome: "Missy",
      especie: "CAO", 
      sexo: "FEMEA",
      dataNascimento: new Date("2023-04-12T00:00:00.000Z"),
      descricao: "Uma cachorrinha aventureira e cheia de vida, pronta para explorar o mundo com você.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/missy-cachorra.jpg",
    },
    {
      nome: "Misty",
      especie: "GATO",
      sexo: "FEMEA",
      dataNascimento: new Date("2021-02-17T00:00:00.000Z"),
      descricao: "Misty é uma gata elegante e misteriosa, que aprecia um ambiente calmo.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/misty-gata.jpg",
    },
    {
      nome: "Nick",
      especie: "GATO",
      sexo: "MACHO",
      dataNascimento: new Date("2022-10-05T00:00:00.000Z"),
      descricao: "Nick é um gato extrovertido e brincalhão, que adora fazer novos amigos.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/nick-gato.jpg",
    },
    {
      nome: "Peseu",
      especie: "CAO", 
      sexo: "MACHO",
      dataNascimento: new Date("2020-04-25T00:00:00.000Z"),
      descricao: "Peseu é um cachorro de porte imponente e coração gentil, um verdadeiro guardião.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/peseu-cachorro.jpg",
    },
    {
      nome: "Pichano",
      especie: "GATO",
      sexo: "MACHO",
      dataNascimento: new Date("2023-03-08T00:00:00.000Z"),
      descricao: "Um gatinho curioso e cheio de personalidade, que vai te divertir com suas travessuras.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/pichano-gato.jpg",
    },
    {
      nome: "Pitoco",
      especie: "GATO",
      sexo: "MACHO",
      dataNascimento: new Date("2022-01-20T00:00:00.000Z"),
      descricao: "Pitoco é um gato dócil e muito apegado, que adora um bom cochilo no colo.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/pitoco-gato.jpg",
    },
    {
      nome: "Rex",
      especie: "CAO", 
      sexo: "MACHO",
      dataNascimento: new Date("2021-09-15T00:00:00.000Z"),
      descricao: "Rex é um cachorro fiel e corajoso, um grande amigo para toda a família.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/rex-cachorro.jpg",
    },
    {
      nome: "Snow",
      especie: "GATO",
      sexo: "MACHO",
      dataNascimento: new Date("2022-06-10T00:00:00.000Z"),
      descricao: "Um gato branco como a neve, muito calmo e carinhoso.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/snow-gato.jpg",
    },
    {
      nome: "Toby",
      especie: "CAO", 
      sexo: "MACHO",
      dataNascimento: new Date("2019-11-11T00:00:00.000Z"),
      descricao: "Toby é um cachorro sênior, muito sábio e tranquilo, em busca de um lar amoroso para seus últimos anos.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/toby-cachorro.jpg",
    },
    {
      nome: "Wandinha",
      especie: "GATO",
      sexo: "FEMEA",
      dataNascimento: new Date("2023-05-02T00:00:00.000Z"),
      descricao: "Uma gatinha de personalidade forte e olhar marcante, mas que tem seu lado doce.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/wandinha-gata.jpg",
    },
    {
      nome: "Jennie",
      especie: "GATO",
      sexo: "FEMEA",
      dataNascimento: new Date("2021-04-04T00:00:00.000Z"),
      descricao: "Uma gata dócil e elegante, que adora ser o centro das atenções com sua beleza.",
      status: "DISPONIVEL",
      foto: "/prisma/pet_images_seed/jennie-gato.jpg",
    },
];

for (const pet of petsData) {
    const petExists = await prisma.pet.findFirst({
      where: { nome: pet.nome, 
               especie: pet.especie,
               dataNascimento: pet.dataNascimento
      },
    });

    if (!petExists) {
      await prisma.pet.create({
        data: petData,
      });
      console.log(`- Pet '${petData.nome}' criado com sucesso!`);
    } else {
      console.log(`- Pet '${petData.nome}' já existe no banco de dados.`);
    }
  }

  await prisma.pet.createMany({
    data: petsData,
    skipDuplicates: true,
  });

  console.log(`${petsData.length} pets criados com sucesso!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
