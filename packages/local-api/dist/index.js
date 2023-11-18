"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const express_1 = __importDefault(require("express"));
const serve = (port, filename, dir) => {
    const app = (0, express_1.default)();
    app.use(express_1.default.static('../../local-client/build'));
    /*
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        // Enable websockets support
        // Note: CRA by default uses websockets to tell the browser wheneven some development file is changed
        ws: true,
        logLevel: 'silent',
      }),
    );
    */
    return new Promise((resolve, reject) => {
        app.listen(port, resolve).on('error', reject);
    });
};
exports.serve = serve;
