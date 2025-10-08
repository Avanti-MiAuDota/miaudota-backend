import { PrismaClient } from "@prisma/client";

async function updateImages() {
  const prisma = new PrismaClient({
    log: ["error"],
  });

  try {
    console.log("🔄 Atualizando URLs das imagens...");

    // Lista dos pets com seus arquivos de imagem
    const updates = [
      { nome: "Anakin", arquivo: "anakin-gato.jpg" },
      { nome: "Belota", arquivo: "belota-gata.jpg" },
      { nome: "Dobby", arquivo: "dobby-cachorro.jpg" },
      { nome: "Felix", arquivo: "felix-cachorro.jpg" },
      { nome: "Hermione", arquivo: "hermione-gata.jpg" },
      { nome: "Jarvis", arquivo: "jarvis-gato.jpg" },
      { nome: "Lili", arquivo: "lili-cachorra.jpg" },
      { nome: "Luna", arquivo: "luna-gata.jpg" },
      { nome: "Marley", arquivo: "marley-cachorro.jpg" },
      { nome: "Meg", arquivo: "Meg-cachorra.jpg" },
      { nome: "Missy", arquivo: "missy-cachorra.jpg" },
      { nome: "Misty", arquivo: "misty-gata.jpg" },
      { nome: "Nick", arquivo: "nick-gato.jpg" },
      { nome: "Perseu", arquivo: "perseu-cachorro.jpg" },
      { nome: "Pichano", arquivo: "pichano-gato.jpg" },
      { nome: "Pitoco", arquivo: "pitoco-gato.jpg" },
      { nome: "Rex", arquivo: "rex-cachorro.jpg" },
      { nome: "Snow", arquivo: "snow-gato.jpg" },
      { nome: "Toby", arquivo: "toby-cachorro.jpg" },
      { nome: "Wandinha", arquivo: "wandinha-gata.jpg" },
      { nome: "Lola", arquivo: "lola-cachorra.jpg" },
    ];

    const baseUrl =
      "https://snmbzxfgjzkxvvsiluld.supabase.co/storage/v1/object/public/pet-images";

    for (const item of updates) {
      const newUrl = `${baseUrl}/${item.arquivo}`;

      try {
        const result = await prisma.pet.updateMany({
          where: { nome: item.nome },
          data: { foto: newUrl },
        });

        if (result.count > 0) {
          console.log(`✅ ${item.nome}: ${newUrl}`);
        } else {
          console.log(`⚠️ ${item.nome}: pet não encontrado`);
        }
      } catch (err) {
        console.log(`❌ ${item.nome}: erro - ${err.message}`);
      }
    }

    console.log("🎉 Atualização concluída!");
  } catch (error) {
    console.error("❌ Erro geral:", error.message);
  } finally {
    await prisma.$disconnect();
  }
}

updateImages();
