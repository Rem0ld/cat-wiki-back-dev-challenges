import { ClassErrorMiddleware, Controller, Get } from "@overnightjs/core";
import { NextFunction, Request, Response } from "express";
import errorHandler from "../../services/errorHandler";
import CatService from "./Cat.service";

@Controller("api/cat")
@ClassErrorMiddleware(errorHandler)
export default class CatController {
  constructor(private service: CatService) {}

  @Get("search/:word")
  private async get(req: Request, res: Response, next: NextFunction) {
    try {
      const { word } = req.params;
      const result = await this.service.getSearchBreeds(word);

      res.json(result);
    } catch (error) {
      next(error);
    }
    return;
  }

  @Get("initial")
  private async getInitial(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await this.service.get4Breeds();

      res.json(result);
    } catch (error) {
      next(error);
    }
    return;
  }

  @Get("breeds")
  private async getAllBreeds(req: Request, res: Response, next: NextFunction) {
    try {
      const { page } = req.query;
      const result = await this.service.getAllBreeds(+page);

      res.json(result);
    } catch (error) {
      next(error);
    }
    return;
  }

  @Get("breed/:breed_id")
  private async getBreed(req: Request, res: Response, next: NextFunction) {
    try {
      const { breed_id } = req.params;
      const result = await this.service.getBreed(breed_id);

      res.json(result);
    } catch (error) {
      next(error);
    }
    return;
  }

  @Get("images/:breed_id")
  private async getImages(req: Request, res: Response, next: NextFunction) {
    try {
      const { breed_id } = req.params;
      const { page } = req.query;
      const result = await this.service.getAllImages(breed_id, +page || 0);

      res.json(result);
    } catch (error) {
      next(error);
    }
    return;
  }

  @Get("most-searched")
  private async getMostSearched(
    _req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const result = await this.service.getMostSearched();

      res.json(result);
    } catch (error) {
      next(error);
    }
    return;
  }
}
