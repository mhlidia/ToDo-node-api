const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const tasksController = require("../controllers/task.controller");

router.post("/", asyncHandler(tasksController.store));
router.get("/", asyncHandler(tasksController.index));
router.put("/:id", asyncHandler(tasksController.update));
router.delete("/:id", asyncHandler(tasksController.destroy));

module.exports = router;