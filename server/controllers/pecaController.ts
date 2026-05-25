import { Request, Response } from "express";

export function listarPecas(req: Request, res: Response) {
  res.json({
    mensagem: "Lista de peças",
  });
}

export function criarPeca(req: Request, res: Response) {
  res.json({
    mensagem: "Peça criada",
  });
}

export function deletarPeca(req: Request, res: Response) {
  res.json({
    mensagem: `Peça ${req.params.id} deletada`,
  });
}

export function atualizarPeca(req: Request, res: Response) {
  res.json({
    mensagem: `Peça ${req.params.id} atualizada`,
  });
}

export default {
  listarPecas,
  criarPeca,
  deletarPeca,
  atualizarPeca,
};
