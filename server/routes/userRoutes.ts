import { Router } from "express";

import { listarUsuarios, criarUsuario, deletarUsuario, atualizarUsuario } from "../controllers/userController";

const router = Router();

router.get("/listar", listarUsuarios);
router.post("/criar", criarUsuario);
router.put("/atualizar/:id", atualizarUsuario);
router.delete("/deletar/:id", deletarUsuario);

export default router;
