"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./config"));
async function startServer() {
    const app = (0, express_1.default)();
    app
        .listen(config_1.default.port, () => {
        console.log(`Server listening on port: ${config_1.default.port}`);
    })
        .on('error', (err) => {
        console.log(err);
        process.exit(1);
    });
}
startServer();
