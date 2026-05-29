import { Router } from "express";
import {
  listarUsuarios,
  criarUsuario,
  deletarUsuario,
  atualizarUsuario,
  validarUsuario,
  perfil,
  login,
} from "../controllers/userController";
import { authMiddleware } from "../middleware/auth";

const router = Router();

// Rotas públicas
router.post("/login", login);
router.post("/validar", validarUsuario);

// Rotas protegidas
router.get("/perfil", authMiddleware, perfil);
router.get("/", authMiddleware, listarUsuarios);
router.post("/", authMiddleware, criarUsuario);
router.put("/:id", authMiddleware, atualizarUsuario);
router.delete("/:id", authMiddleware, deletarUsuario);

export default router;
