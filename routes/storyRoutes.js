const express = require("express");
const router = express.Router();
const storyController = require("../controllers/storyController");
const authenticateToken = require("../middleware/authMiddleware");

router.post("/stories", authenticateToken, storyController.createStory);
router.get("/stories/:storyId", storyController.getStory);
router.put("/stories/:storyId", authenticateToken, storyController.updateStory);
router.delete("/stories/:storyId", authenticateToken, storyController.deleteStory);
router.post("/stories/:storyId/comments", authenticateToken, storyController.addComment);
router.post("/stories/:storyId/likes", authenticateToken, storyController.addLike);

module.exports = router;
