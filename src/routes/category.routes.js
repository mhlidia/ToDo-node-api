const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/category.controller");

router.post("/", asyncHandler(createCategory));
router.get("/", asyncHandler(getCategories));
router.put("/:id", asyncHandler(updateCategory));
router.delete("/:id", asyncHandler(deleteCategory));

module.exports = router;