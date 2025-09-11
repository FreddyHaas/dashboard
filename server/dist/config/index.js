"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const envFound = dotenv_1.default.config();
if (envFound.error) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    // ToDo fix port assertion
    port: parseInt(process.env.PORT, 10),
    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI, // ToDo
    /**
     * Agendash config
     */
    agendash: {
        user: 'agendash',
        password: '123456',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
};
