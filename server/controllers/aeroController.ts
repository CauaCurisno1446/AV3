import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarAeronaves(req: Request, res: Response) {
  try {
    const aeronaves = await prisma.aeronave.findMany({
      include: {
        etapas: true,
        pecas: true,
        testes: true,
      },
    });
    res.json(aeronaves);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar aeronaves" });
  }
}

export async function criarAeronave(req: Request, res: Response) {
  try {
    const aeronave = await prisma.aeronave.create({
      data: req.body,
    });
    res.json(aeronave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar aeronave" });
  }
}

export async function deletarAeronave(req: Request<{ id: string }>, res: Response) {
  try {
    await prisma.aeronave.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ mensagem: `Aeronave ${req.params.id} deletada` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar aeronave" });
  }
}

export async function atualizarAeronave(req: Request<{ id: string }>, res: Response) {
  try {
    const aeronave = await prisma.aeronave.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(aeronave);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar aeronave" });
  }
}
export default {
  listarAeronaves,
  criarAeronave,
  deletarAeronave,
  atualizarAeronave,
};
