"use strict";
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
const node_fetch_1 = __importDefault(require("node-fetch"));
const constants_1 = require("../../config/constants");
const databases_1 = require("../../config/databases");
class CatService {
    // if repo include repo here
    constructor() {
        this.breeds = "breeds";
        this.images = "images/search";
        this.limit = 10;
    }
    addBreedToCache() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(`${constants_1.CAT_API_BASE_URL}${this.breeds}`);
            const result = yield response.json();
            databases_1.cache.set("breed", result.map((el) => ({ id: el.id, name: el.name, count: 0 })));
        });
    }
    getMostSearched() {
        return __awaiter(this, void 0, void 0, function* () {
            const mostSearched = databases_1.cache.get("breed");
            if (!mostSearched) {
                return new Error("No most searched");
            }
            return mostSearched
                .sort((a, b) => {
                if (a.count > b.count) {
                    return -1;
                }
                else if (a.count === b.count) {
                    return 0;
                }
                return 1;
            })
                .slice(0, 10);
        });
    }
    getBreed(breed) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(`${constants_1.CAT_API_BASE_URL}${this.breeds}/${breed}`);
            const result = yield response.json();
            let mostSearched = databases_1.cache.get("breed");
            if (!mostSearched) {
                yield this.addBreedToCache();
                mostSearched = databases_1.cache.get("breed");
            }
            databases_1.cache.set("breed", mostSearched.map(el => {
                if (el.id === breed) {
                    el.count++;
                }
                return el;
            }));
            return result;
        });
    }
    get4Breeds() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, node_fetch_1.default)(constants_1.CAT_API_BASE_URL + this.breeds + "?limit=4");
            const result = yield response.json();
            return result;
        });
    }
    getAllBreeds(page) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${constants_1.CAT_API_BASE_URL}${this.breeds}?limit=${this.limit}&page=${page}&api_key=${process.env.CAT_API_KEY}`;
            const response = yield (0, node_fetch_1.default)(url);
            const result = yield response.json();
            return result;
        });
    }
    getAllImages(breed, page) {
        return __awaiter(this, void 0, void 0, function* () {
            const url = `${constants_1.CAT_API_BASE_URL}${this.images}?limit=${this.limit}&page=${page}&breed_ids=${breed}&api_key=${process.env.CAT_API_KEY}`;
            const response = yield (0, node_fetch_1.default)(url);
            const result = yield response.json();
            const urls = result.reduce((acc, el) => {
                acc.push(el.url);
                return acc;
            }, []);
            return urls;
        });
    }
    getSearchBreeds(word) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = databases_1.cache.get("breed");
            if (!result) {
                yield this.addBreedToCache();
            }
            result = databases_1.cache.get("breed");
            return result.filter(el => {
                if (el.name.toLowerCase().startsWith(word)) {
                    return true;
                }
                return false;
            });
        });
    }
}
exports.default = CatService;
//# sourceMappingURL=Cat.service.js.map