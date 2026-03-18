const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middlewares/auth.middleware");

const categoryController = require("../controllers/category.controller");

router.get("/", authMiddleware, asyncHandler(categoryController.index));
router.post("/", authMiddleware, asyncHandler(categoryController.store));
router.put("/:id", authMiddleware, asyncHandler(categoryController.update));
router.delete("/:id", authMiddleware, asyncHandler(categoryController.destroy));

module.exports = router;