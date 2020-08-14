"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const teams_1 = __importDefault(require("../controllers/teams"));
const router = express_1.Router();
router.get('/test', teams_1.default.test);
router.post('/create', teams_1.default.criarEquipe);
router.get('/listar/:texto', teams_1.default.listarEquipes);
exports.default = router;
