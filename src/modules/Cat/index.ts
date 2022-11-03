import CatController from "./Cat.controller";
import CatService from "./Cat.service";

const service = new CatService();
const controller = new CatController(service);

export default controller;
