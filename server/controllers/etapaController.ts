import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarEtapas(req: Request, res: Response) {
  try {
    const etapas = await prisma.etapa.findMany();
    res.json(etapas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar etapas" });
  }
}

export async function criarEtapa(req: Request, res: Response) {
  try {
    const etapa = await prisma.etapa.create({
      data: req.body,
    });
    res.json(etapa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar etapa" });
  }
}

export async function deletarEtapa(req: Request<{ id: string }>, res: Response) {
  try {
    await prisma.etapa.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ mensagem: `Etapa ${req.params.id} deletada` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar etapa" });
  }
}

export async function atualizarEtapa(req: Request<{ id: string }>, res: Response) {
  try {
    const etapa = await prisma.etapa.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(etapa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar etapa" });
  }
}

export default {
  listarEtapas,
  criarEtapa,
  deletarEtapa,
  atualizarEtapa,
};
