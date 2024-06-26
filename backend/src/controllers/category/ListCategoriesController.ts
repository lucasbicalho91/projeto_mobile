import { Request, Response } from "express";
import { ListCategoriesService } from "../../services/category/ListCategoriesService";

class ListCategoriesController {
  async handle(req: Request, res: Response) {
    const listCategoryService = new ListCategoriesService();

    const category = await listCategoryService.execute();

    return res.json(category);

  }
}

export { ListCategoriesController }