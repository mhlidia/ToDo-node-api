const express = require("express");
const router = express.Router();

const asyncHandler = require("../utils/asyncHandler");

const {
  createTag,
  getTags,
  updateTag,
  deleteTag
} = require("../controllers/tag.controller");

router.post("/", asyncHandler(createTag));
router.get("/", asyncHandler(getTags));
router.put("/:id", asyncHandler(updateTag));
router.delete("/:id", asyncHandler(deleteTag));

module.exports = router;