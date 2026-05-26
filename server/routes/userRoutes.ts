import { Router } from "express";

import {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
  validarUsuario,
} from "../controllers/userController";

const router = Router();

router.get("/", listarUsuarios);
router.post("/", criarUsuario);
router.put("/:id", atualizarUsuario);
router.delete("/:id", deletarUsuario);

router.post("/validar", validarUsuario);

export default router;
