"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@overnightjs/core");
const Cat_service_1 = __importDefault(require("./Cat.service"));
let CatController = class CatController {
    constructor(service) {
        this.service = service;
    }
    get(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { word } = req.params;
            const result = yield this.service.getSearchBreeds(word);
            res.json(result);
            return;
        });
    }
    getInitial(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.get4Breeds();
            res.json(result);
            return;
        });
    }
    getAllBreeds(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { page } = req.query;
            const result = yield this.service.getAllBreeds(+page);
            res.json(result);
            return;
        });
    }
    getBreed(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { breed_id } = req.params;
            const result = yield this.service.getBreed(breed_id);
            res.json(result);
            return;
        });
    }
    getImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { breed, page } = req.query;
            const result = yield this.service.getAllImages(breed.toString(), +page);
            res.json(result);
            return;
        });
    }
    getMostSearched(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.service.getMostSearched();
            res.json(result);
            return;
        });
    }
    post(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () { });
    }
};
__decorate([
    (0, core_1.Get)("search/:word"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "get", null);
__decorate([
    (0, core_1.Get)("initial"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "getInitial", null);
__decorate([
    (0, core_1.Get)("breeds"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "getAllBreeds", null);
__decorate([
    (0, core_1.Get)("breed/:breed_id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "getBreed", null);
__decorate([
    (0, core_1.Get)("images"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "getImages", null);
__decorate([
    (0, core_1.Get)("most-searched"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Function]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "getMostSearched", null);
__decorate([
    (0, core_1.Post)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "post", null);
__decorate([
    (0, core_1.Delete)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CatController.prototype, "delete", null);
CatController = __decorate([
    (0, core_1.Controller)("api/cat"),
    __metadata("design:paramtypes", [Cat_service_1.default])
], CatController);
exports.default = CatController;
//# sourceMappingURL=Cat.controller.js.map