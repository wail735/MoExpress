// ============================================================================
// FICHIER : backend2/ai/ai.routes.js
// RÔLE : Express routes for NVIDIA Nemotron AI Assistant (/api/v1/ai)
// ============================================================================

import { Router } from "express";
import { handleAIChat } from "./ai.controller.js";

const router = Router();

router.post("/chat", handleAIChat);

export default router;
