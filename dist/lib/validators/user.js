"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const userSchema = joi_1.default.object({
    name: joi_1.default
        .string()
        .required(),
    email: joi_1.default
        .string()
        .required(),
    details: joi_1.default
        .object({
        location: joi_1.default
            .string()
            .required()
    })
});
exports.default = userSchema;
