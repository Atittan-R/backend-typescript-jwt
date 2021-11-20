import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";

import { User } from "../model/User";

export const checkRole = (roles: Array<string>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    //Get the user ID from previous midleware
    const id = res.locals.jwtPayload.userId;

    //Get user role from the database
    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(id);
      //Check if array of authorized roles includes the user's role
      roles.indexOf(user.role) > -1 && next();
    } catch (id) {
      res.status(401).send();
    }
  };
};
