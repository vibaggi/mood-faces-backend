"use strict";
// NoSQL Credentials
Object.defineProperty(exports, "__esModule", { value: true });
exports.TOKEN_ACCESS_TIME_MINUTES = exports.NOSQL_DATABASE = exports.NOSQL_URL = void 0;
exports.NOSQL_URL = process.env.NOSQL_URL;
exports.NOSQL_DATABASE = process.env.NOSQL_DATABASE;
// System variables
exports.TOKEN_ACCESS_TIME_MINUTES = parseInt(process.env.TOKEN_ACCESS_TIME_MINUTES || '60') * 1000 * 60;
