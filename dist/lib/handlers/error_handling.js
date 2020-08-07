"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, req, res, next) => {
    console.error(err);
    const status = err.status || 500;
    const message = err.message || `Something went wrong`;
    return res.status(status).send({ error: message });
};
exports.default = errorHandler;
