"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Cat_controller_1 = __importDefault(require("./Cat.controller"));
const Cat_service_1 = __importDefault(require("./Cat.service"));
const service = new Cat_service_1.default();
const controller = new Cat_controller_1.default(service);
exports.default = controller;
//# sourceMappingURL=index.js.map