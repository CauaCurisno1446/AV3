import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarEtapas(req: Request, res: Response) {
  try {
    const etapas = await prisma.etapa.findMany({
      include: {
        aeronave: true,
        funcionarios: true, // funcionarios
      },
    });
    res.json(etapas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar etapas" });
  }
}

export async function criarEtapa(req: Request, res: Response) {
  try {
    const { nome, prazo, status, funcionarios, aeronave } = req.body;

    const etapa = await prisma.etapa.create({
      data: {
        nome,
        prazo: new Date(prazo),
        status,

        aeronave: {
          connect: {
            id: Number(aeronave),
          },
        },

        funcionarios: {
          connect: funcionarios.map((id: number) => ({
            id,
          })),
        },
      },

      include: {
        aeronave: true,
        funcionarios: true,
      },
    });

    res.json(etapa);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao criar etapa",
    });
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
    const { nome, prazo, status, funcionarios, aeronave } = req.body;

    const etapa = await prisma.etapa.update({
      where: {
        id: Number(req.params.id),
      },

      data: {
        nome,
        prazo: new Date(prazo),
        status,

        aeronave: {
          connect: {
            id: Number(aeronave),
          },
        },

        funcionarios: {
          set: funcionarios.map((id: number) => ({
            id,
          })),
        },
      },

      include: {
        aeronave: true,
        funcionarios: true,
      },
    });

    res.json(etapa);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao atualizar etapa",
    });
  }
}

export default {
  listarEtapas,
  criarEtapa,
  deletarEtapa,
  atualizarEtapa,
};
