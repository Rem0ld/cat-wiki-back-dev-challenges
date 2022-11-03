"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Sample_service_1 = __importDefault(require("./Sample.service"));
const Sample_controller_1 = __importDefault(require("./Sample.controller"));
const service = new Sample_service_1.default();
const controller = new Sample_controller_1.default(service);
exports.default = controller;
//# sourceMappingURL=index.js.map