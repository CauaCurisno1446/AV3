import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await prisma.user.findMany();
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
}

export async function criarUsuario(req: Request, res: Response) {
  try {
    const usuario = await prisma.user.create({
      data: req.body,
    });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
}

export async function deletarUsuario(req: Request<{ id: string }>, res: Response) {
  try {
    await prisma.user.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    res.json({ mensagem: `Usuário ${req.params.id} deletado` });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao deletar usuário" });
  }
}

export async function atualizarUsuario(req: Request<{ id: string }>, res: Response) {
  try {
    const usuario = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data: req.body,
    });
    res.json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
}
export default {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
};
