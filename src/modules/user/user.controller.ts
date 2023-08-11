import { Request, Response } from "express";
import { userService } from "./user.service";

const insertIntoDB = async (req: Request, res: Response) => {
  try {
    const result = await userService.insertIntoDB(req.body);
    res.send({
      success: true,
      message: "user created successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const insertOrUpdateProfile = async (req: Request, res: Response) => {
  try {
    const result = await userService.insertOrUpdateProfile(req.body);
    res.send({
      success: true,
      message: "profile created or updated successfully successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const result = await userService.getAllUsers();
    res.send({
      success: true,
      message: "users retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};
const getSingleUser = async (req: Request, res: Response) => {
  try {
    const result = await userService.getSingleUser(parseInt(req.params.id));
    res.send({
      success: true,
      message: "user retrieved successfully",
      data: result,
    });
  } catch (err) {
    res.send(err);
  }
};

export const userController = {
  insertIntoDB,
  insertOrUpdateProfile,
  getAllUsers,
  getSingleUser,
};
