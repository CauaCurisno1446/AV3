import { Request, Response } from "express";

export function listarUsuarios(req: Request, res: Response) {
  res.json({
    mensagem: "Lista de usuários",
  });
}

export function criarUsuario(req: Request, res: Response) {
  res.json({
    mensagem: "Usuário criado",
  });
}

export function deletarUsuario(req: Request, res: Response) {
  res.json({
    mensagem: `Usuário ${req.params.id} deletado`,
  });
}

export function atualizarUsuario(req: Request, res: Response) {
  res.json({
    mensagem: `Usuário ${req.params.id} atualizado`,
  });
}

export default {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
};
