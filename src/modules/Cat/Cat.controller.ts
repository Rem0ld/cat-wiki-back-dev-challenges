import { Controller, Delete, Get, Post } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import CatService from "./Cat.service";

@Controller("api/cat")
export default class CatController {
  constructor(private service: CatService) {}

  @Get("search/:word")
  private async get(req: Request, res: Response, next: NextFunction) {
    const { word } = req.params;
    const result = await this.service.getSearchBreeds(word);

    res.json(result);
    return;
  }

  @Get("initial")
  private async getInitial(req: Request, res: Response, next: NextFunction) {
    const result = await this.service.get4Breeds();

    res.json(result);
    return;
  }

  @Get("breeds")
  private async getAllBreeds(req: Request, res: Response, next: NextFunction) {
    const { page } = req.query;
    const result = await this.service.getAllBreeds(+page);

    res.json(result);
    return;
  }

  @Get("breed/:breed_id")
  private async getBreed(req: Request, res: Response, next: NextFunction) {
    const { breed_id } = req.params;
    const result = await this.service.getBreed(breed_id);

    res.json(result);
    return;
  }

  @Get("images/:breed_id")
  private async getImages(req: Request, res: Response, next: NextFunction) {
    const { breed_id } = req.params;
    const { page } = req.query;
    const result = await this.service.getAllImages(breed_id, +page || 0);

    res.json(result);
    return;
  }

  @Get("most-searched")
  private async getMostSearched(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const result = await this.service.getMostSearched();

    res.json(result);
    return;
  }

  @Post()
  private async post(req: Request, res: Response) {}

  @Delete()
  private async delete(req: Request, res: Response) {}
}
