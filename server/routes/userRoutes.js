import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { activateUserProfile, changeUserPassword, deleteUserProfile, getTeamList, loginUser, logoutUser, registerUser, updateUserProfile } from "../controller/userController.js";



const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

router.get("/get-team", protectRoute, isAdminRoute, getTeamList);


router.put("/profile", protectRoute, updateUserProfile);

router.put("/change-password", protectRoute, changeUserPassword);

router
  .route("/:id")
  .put(protectRoute, isAdminRoute, activateUserProfile)
  .delete(protectRoute, isAdminRoute, deleteUserProfile);

export default router;