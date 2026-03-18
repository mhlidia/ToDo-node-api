const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middlewares/auth.middleware");

const taskController = require("../controllers/task.controller");

router.get("/", authMiddleware, asyncHandler(taskController.index));
router.post("/", authMiddleware, asyncHandler(taskController.store));
router.put("/:id", authMiddleware, asyncHandler(taskController.update));
router.delete("/:id", authMiddleware, asyncHandler(taskController.destroy));

module.exports = router;