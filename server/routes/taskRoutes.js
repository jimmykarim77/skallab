import express from "express";
import { isAdminRoute, protectRoute } from "../middleware/authMiddleware.js";
import { createTask, dashboardStatistics, deleteRestoreTask, duplicateTask, getTasks, postTaskActivity, trashTask, updateTask } from "../controller/taskController.js";



const router = express.Router();
router.post("/create", protectRoute,  createTask);
router.post("/duplicate/:id", protectRoute, isAdminRoute, duplicateTask);
router.post("/activity/:id", protectRoute, postTaskActivity);
router.get("/dashbord", protectRoute, dashboardStatistics);
router.get("/", protectRoute, getTasks);
router.put("/update/:id", protectRoute, isAdminRoute, updateTask);
router.delete(
    "/delete-restore/:id?",
    protectRoute,
    isAdminRoute,
    deleteRestoreTask
  );
  router.put("/:id", protectRoute, isAdminRoute, trashTask);
export default router;