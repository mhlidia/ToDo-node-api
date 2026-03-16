const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");
const tagController = require("../controllers/tag.controller");

router.get("/", asyncHandler(tagController.index));
router.post("/", asyncHandler(tagController.store));
router.put("/:id", asyncHandler(tagController.update));
router.delete("/:id", asyncHandler(tagController.destroy));

module.exports = router;