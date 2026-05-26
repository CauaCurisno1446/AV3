import { Router } from "express";

import { listarUsuarios, criarUsuario, deletarUsuario, atualizarUsuario } from "../controllers/userController";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

export default router;
