"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const users_1 = __importDefault(require("../controllers/users"));
// import filesParser from '../lib/handlers/files_parser';
const router = express_1.Router();
router.post('/create', users_1.default.createUser);
router.get('/login', users_1.default.login);
// router.use(controller.authentication);
router.get('/users/listar/:texto', users_1.default.listarUsuarios);
exports.default = router;
