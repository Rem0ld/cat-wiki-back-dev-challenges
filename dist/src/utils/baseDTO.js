"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class baseDTO {
    constructor() { }
    serialize() {
        const result = {};
        const parsed = JSON.parse(JSON.stringify(this));
        for (const el in parsed) {
            if (this[el] !== null) {
                result[el] = this[el];
            }
        }
        return result;
    }
    deserialize() {
        return this;
    }
}
exports.default = baseDTO;
//# sourceMappingURL=baseDTO.js.map