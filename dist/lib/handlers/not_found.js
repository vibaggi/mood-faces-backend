"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const notFoundHandler = (req, res, next) => {
    return res.status(404).send({ error: `${req.path} was not found` });
};
exports.default = notFoundHandler;
