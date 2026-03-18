const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const authMiddleware = require("../middlewares/auth.middleware");

const tagController = require("../controllers/tag.controller");

router.get("/", authMiddleware, asyncHandler(tagController.index));
router.post("/", authMiddleware, asyncHandler(tagController.store));
router.put("/:id",authMiddleware, asyncHandler(tagController.update));
router.delete("/:id",authMiddleware, asyncHandler(tagController.destroy));

module.exports = router;