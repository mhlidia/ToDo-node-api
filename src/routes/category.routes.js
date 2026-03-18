const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const categoryController = require("../controllers/category.controller");

router.get("/", asyncHandler(categoryController.index));
router.post("/", asyncHandler(categoryController.store));
router.put("/:id", asyncHandler(categoryController.update));
router.delete("/:id", asyncHandler(categoryController.destroy));

module.exports = router;