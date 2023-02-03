import { Request, Response, NextFunction } from "express";
import AppDataSource from "../data-source";
import { Properties } from "../entities/propeties.entities";

export const validateIdMiddleware =
  () => async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    console.log(id)

    res.status(404).json("CARALHO")
    // const schedulesPropertyIdRespository =
    //   AppDataSource.getRepository(Properties);

    // const property = await schedulesPropertyIdRespository.findOneBy({ id });

    // if (!property) {
    //   res.status(404).json({ message: "This ID dont exist" });
    // }

    // return next();
  };
