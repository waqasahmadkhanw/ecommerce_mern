import {Router }from "express"
import Register from "../controllers/user/Register.controller.js"
import Loginuser from "../controllers/user/Longin.controller.js"
import logoutuser from "../controllers/user/Logout.controller.js"
import changePassword from "../controllers/user/ChangePassword.controller.js"
import updateUserdetails from "../controllers/user/UpdateUserdetails.controller.js"
import refreshAccessToken from "../controllers/user/RefreshAccessToken.controller.js"
import AuthenticateUser from "../middlewares/auth.middleware.js"
const router=Router()

router.route("/register").post(Register)
router.route("/login").post(Loginuser)
router.route("/logout").delete(AuthenticateUser,logoutuser)
router.route("/cahnge-password").put(AuthenticateUser,changePassword)
router.route("/update-details").patch(AuthenticateUser,updateUserdetails)
router.route("//refresh-token").post(refreshAccessToken)
export default router