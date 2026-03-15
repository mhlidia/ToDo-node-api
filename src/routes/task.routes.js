const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/task.controller");

router.post("/", asyncHandler(createTask));
router.get("/", asyncHandler(getTasks));
router.put("/:id", asyncHandler(updateTask));
router.delete("/:id", asyncHandler(deleteTask));

module.exports = router;