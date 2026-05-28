import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function listarUsuarios(req: Request, res: Response) {
  try {
    const usuarios = await prisma.user.findMany({
      include: {
        etapas: true,
      },
    });
    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao listar usuários" });
  }
}

export async function criarUsuario(req: Request, res: Response) {
  try {
    const { nome, telefone, endereco, usuario, role, senha, etapas } = req.body;

    const funcionario = await prisma.user.create({
      data: {
        nome,
        telefone,
        endereco,
        usuario,
        role,
        senha,

        etapas: {
          connect: (etapas ?? []).map((id: number) => ({
            id,
          })),
        },
      },

      include: {
        etapas: true,
      },
    });

    res.json(funcionario);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao criar funcionário",
    });
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

export async function validarUsuario(req: Request, res: Response) {
  try {
    const { usuario, telefone } = req.body;

    const usuarioExiste = await prisma.user.findFirst({
      where: {
        usuario,
      },
    });

    const telefoneExiste = await prisma.user.findFirst({
      where: {
        telefone,
      },
    });

    res.json({
      usuarioDisponivel: !usuarioExiste,
      telefoneDisponivel: !telefoneExiste,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao validar funcionário",
    });
  }
}

export default {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
  validarUsuario,
};
