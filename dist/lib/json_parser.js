"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
function jsonParser(jsonName) {
    const jsonPath = path_1.default.resolve(__dirname, '..', 'config', jsonName);
    const jsonParsed = JSON.parse(fs_1.default.readFileSync(jsonPath, 'utf8'));
    return jsonParsed;
}
exports.default = jsonParser;
