import { userService } from "../services/user-service.js";

class UserController {
  constructor(service) {
    this.service = service;
  }

  register = async (req, res, next) => {
    try {
      const response = await this.register(req.body);
      res.json(response);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await this.service.login(email, password);
      const token = this.service.generateToken(user);
      res
        .cookie("token", token, { httpOnly: true })
        // .header("Authorization", token)
        .json({ message: "Login OK!" });
    } catch (error) {
      next(error);
    }
  };

  profile = async (req, res, next) => {
    try {
      res.json(req.user)
    } catch (error) {
      next(error)
    }
  }
}

export const userController = new UserController(userService);
