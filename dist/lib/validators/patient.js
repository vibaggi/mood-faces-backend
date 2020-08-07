"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("@hapi/joi"));
const patientSchema = joi_1.default.object({
    name: joi_1.default
        .string()
        .required(),
    age: joi_1.default
        .number()
        .required(),
    city: joi_1.default
        .string()
        .required(),
    infectionDate: joi_1.default
        .date()
        .required()
});
exports.default = patientSchema;
