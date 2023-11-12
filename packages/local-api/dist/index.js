"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serve = void 0;
const serve = (port, filename, dir) => {
    console.log('serving traffic on port', port);
    console.log('saving/fetching cells from', filename);
    console.log('that file is in dir', dir);
};
exports.serve = serve;
