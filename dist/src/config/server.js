"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const core_1 = require("@overnightjs/core");
const logger_1 = require("../utils/logger/logger");
const modules_1 = __importDefault(require("../modules"));
class MyServer extends core_1.Server {
    constructor() {
        super(process.env.NODE_ENV === "development");
        dotenv_1.default.config();
        this.showLogs = true;
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, morgan_1.default)("combined"));
        this.setupController();
    }
    setupController() {
        logger_1.logger.info("Setting up controllers");
        super.addControllers(modules_1.default);
    }
    start(port) {
        this.app.listen(port, () => {
            logger_1.logger.info(`Listening on ${port}`);
            logger_1.logger.info(`Environment is ${process.env.NODE_ENV}`);
        });
    }
}
exports.default = MyServer;
//# sourceMappingURL=server.js.map