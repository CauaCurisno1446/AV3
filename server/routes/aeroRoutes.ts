import { Router } from "express";
import {
  listarAeronaves,
  criarAeronave,
  deletarAeronave,
  atualizarAeronave,
  registrarTestes,
} from "../controllers/aeroController";
import { authMiddleware } from "../middleware/auth";
import { gerarRelatorio } from "../controllers/relatorioController";

const router = Router();

router.use(authMiddleware);

router.get("/", listarAeronaves);
router.post("/", criarAeronave);

router.post("/:id/testes", registrarTestes);
router.get("/:id/relatorio", gerarRelatorio);

router.put("/:id", atualizarAeronave);
router.delete("/:id", deletarAeronave);

export default router;
