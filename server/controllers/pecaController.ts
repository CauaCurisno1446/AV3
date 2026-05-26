import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarPecas(req: Request, res: Response) {
  try {
    const pecas = await prisma.peca.findMany();
    res.json(pecas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar peças" });
  }
}

export async function criarPeca(req: Request, res: Response) {
  try {
    const peca = await prisma.peca.create({
      data: req.body,
    });
    res.json(peca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar peça" });
  }
}

export async function deletarPeca(req: Request<{ id: string }>, res: Response) {
  try {
    await prisma.peca.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ mensagem: `Peça ${req.params.id} deletada` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar peça" });
  }
}

export async function atualizarPeca(req: Request<{ id: string }>, res: Response) {
  try {
    const peca = await prisma.peca.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(peca);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar peça" });
  }
}

export default {
  listarPecas,
  criarPeca,
  deletarPeca,
  atualizarPeca,
};
