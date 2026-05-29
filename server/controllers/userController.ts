import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../middleware/auth";

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

    const senhaHash = await bcrypt.hash(senha, 10);

    const funcionario = await prisma.user.create({
      data: {
        nome,
        telefone,
        endereco,
        usuario,
        role,
        senha: senhaHash,

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
    const data = { ...req.body };

    if (data.senha) {
      data.senha = await bcrypt.hash(data.senha, 10);
    }

    const usuario = await prisma.user.update({
      where: {
        id: parseInt(req.params.id),
      },
      data,
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

export async function login(req: Request, res: Response) {
  try {
    const { usuario, senha } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        usuario,
      },
    });

    if (!user) {
      return res.status(404).json({
        error: "Usuário não encontrado",
      });
    }

    const senhaCorreta = await bcrypt.compare(senha, user.senha);

    if (!senhaCorreta) {
      return res.status(401).json({
        error: "Senha inválida",
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        usuario: user.usuario,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      },
    );

    res.json({
      mensagem: "Login realizado",
      token,
      usuario: {
        id: user.id,
        nome: user.nome,
        usuario: user.usuario,
        role: user.role,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao fazer login",
    });
  }
}

export async function perfil(req: AuthRequest, res: Response) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },

      select: {
        id: true,
        nome: true,
        usuario: true,
        telefone: true,
        endereco: true,
        role: true,
        createdAt: true,
      },
    });

    res.json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Erro ao buscar perfil",
    });
  }
}

export default {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
  validarUsuario,
  perfil,
  login,
};
