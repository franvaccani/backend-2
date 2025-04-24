import { Router } from "express";
import { userController } from "../controllers/user-controller.js";
import { passportCall } from "../middlewares/passport-call.js";
import { checkRole } from "../middlewares/check-role.js";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/private-headers", passportCall("jwt"), userController.profile);

router.get(
  "/private-cookies",
  passportCall("jwtCookies"),
  userController.profile
);

router.get(
  "/private-cookies-admin",
  passportCall("jwtCookies"),
  checkRole("admin"),
  userController.profile
);

export default router;
