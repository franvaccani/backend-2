import "dotenv/config";
import passport from "passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { userService } from "../../services/user-service.js";

const cookieExtractor = (req) => {
  return req.cookies.token;
};

const strategyConfigCookies = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: process.env.JWT_SECRET,
};

const verifyToken = async (jwt_payload, done) => {
    if (!jwt_payload) return done(null, false, { messages: "User not found" });
    return done(null, jwt_payload);
    //req.user ---> jwt_payload
};

passport.use("jwtCookies", new Strategy(strategyConfigCookies, verifyToken));

passport.serializeUser((user, done) => {
  //user ---> jwt_payload._id
  try {
    done(null, user._id);
  } catch (error) {
    done(error);
  }
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userService.getById(id);
    return done(null, user);
  } catch (error) {
    done(error);
  }
});
