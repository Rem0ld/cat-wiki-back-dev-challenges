"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (error, req, res, next) => {
    if (error.message.includes("exists")) {
        res.status(409).json(error.message);
        return;
    }
    if (error.message.includes("missing")) {
        res.status(400).json(error.message.replace(/\n/g, " "));
        return;
    }
    if (error.message.includes("internal")) {
        res.status(500).json(error.message);
        return;
    }
    if (error.message.includes("Invalid or expired") ||
        error.message.includes("invalid token")) {
        res.status(401).json("jwt invalid or expired");
        return;
    }
    res.status(500).json(error.message);
    return;
};
//# sourceMappingURL=errorHandler.js.map