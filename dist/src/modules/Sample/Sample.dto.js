"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const baseDTO_1 = __importDefault(require("../../utils/baseDTO"));
class SampleDTO extends baseDTO_1.default {
    // Should have the type
    constructor(data) {
        super();
        for (const el in data) {
            if (data[el] !== null) {
                this[el] = data[el];
            }
        }
    }
}
exports.default = SampleDTO;
//# sourceMappingURL=Sample.dto.js.map