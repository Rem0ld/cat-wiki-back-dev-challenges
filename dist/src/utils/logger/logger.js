"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
const winston_1 = require("winston");
exports.logger = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({
        format: "YYYY-MM-DD HH:mm:ss",
    }), winston_1.format.errors({ stack: true }), winston_1.format.splat(), winston_1.format.json()),
    transports: [
        //
        // - Write to all logs with level `info` and below to `quick-start-combined.log`.
        // - Write all logs error (and below) to `quick-start-error.log`.
        //
        new winston_1.transports.File({
            filename: `logs/${new Date()
                .toLocaleDateString()
                .split(" ")[0]
                .replace(/\//g, "-")}-error.log`,
            level: "error",
        }),
        new winston_1.transports.File({
            filename: `logs/${new Date()
                .toLocaleDateString()
                .split(" ")[0]
                .replace(/\//g, "-")}-combined.log`,
        }),
    ],
});
//
// If we're not in production then **ALSO** log to the `console`
// with the colorized simple format.
//
if (process.env.NODE_ENV !== "production") {
    exports.logger.add(new winston_1.transports.Console({
        format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
    }));
}
//# sourceMappingURL=logger.js.map