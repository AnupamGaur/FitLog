"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatebloginput = exports.createbloginput = exports.signininput = exports.signupinput = void 0;
const zod_1 = require("zod");
exports.signupinput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.signininput = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.createbloginput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string(),
    published: zod_1.z.boolean()
});
exports.updatebloginput = zod_1.z.object({
    title: zod_1.z.string(),
    content: zod_1.z.string()
});
