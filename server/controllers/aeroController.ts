import { Request, Response } from "express";

export function listarAeronaves(req: Request, res: Response) {
  res.json({
    mensagem: "Lista de aeronaves",
  });
}

export function criarAeronave(req: Request, res: Response) {
  res.json({
    mensagem: "Aeronave criada",
  });
}

export function deletarAeronave(req: Request, res: Response) {
  res.json({
    mensagem: `Aeronave ${req.params.id} deletada`,
  });
}

export function atualizarAeronave(req: Request, res: Response) {
  res.json({
    mensagem: `Aeronave ${req.params.id} atualizada`,
  });
}

export default {
  listarAeronaves,
  criarAeronave,
  deletarAeronave,
  atualizarAeronave,
};
