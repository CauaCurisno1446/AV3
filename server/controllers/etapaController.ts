import { Request, Response } from "express";

export function listarEtapas(req: Request, res: Response) {
  res.json({
    mensagem: "Lista de etapas",
  });
}

export function criarEtapa(req: Request, res: Response) {
  res.json({
    mensagem: "Etapa criada",
  });
}

export function deletarEtapa(req: Request, res: Response) {
  res.json({
    mensagem: `Etapa ${req.params.id} deletada`,
  });
}

export function atualizarEtapa(req: Request, res: Response) {
  res.json({
    mensagem: `Etapa ${req.params.id} atualizada`,
  });
}

export default {
  listarEtapas,
  criarEtapa,
  deletarEtapa,
  atualizarEtapa,
};
