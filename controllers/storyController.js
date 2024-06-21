const { initializeFirebase } = require("../config/firebase-config");

async function getDbInstance() {
  const { db } = await initializeFirebase();
  return db;
}

// Create a new story
const createStory = async (req, res) => {
  const { title, description, content, author, coverImage, genre, tags } =
    req.body;
  try {
    const db = await getDbInstance();
    const newStoryRef = db.collection("stories").doc();
    await newStoryRef.set({
      title,
      description,
      content,
      author,
      coverImage,
      genre,
      tags,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    res
      .status(201)
      .json({ message: "Story created successfully", storyId: newStoryRef.id });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get a story by ID
const getStory = async (req, res) => {
  const { storyId } = req.params;
  try {
    const db = await getDbInstance();
    const storyDoc = await db.collection("stories").doc(storyId).get();
    if (!storyDoc.exists) {
      return res.status(404).json({ message: "Story not found" });
    }
    res.status(200).json(storyDoc.data());
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a story by ID
const updateStory = async (req, res) => {
  const { storyId } = req.params;
  const { title, description, content, author, coverImage, genre, tags } = req.body;
  try {
    const db = await getDbInstance();
    const storyRef = db.collection("stories").doc(storyId);
    await storyRef.update({
      title,
      description,
      content,
      author,
      coverImage,
      genre,
      tags,
      updatedAt: new Date(),
    });
    res.status(200).json({ message: "Story updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a story by ID
const deleteStory = async (req, res) => {
  const { storyId } = req.params;
  try {
    const db = await getDbInstance();
    const storyRef = db.collection("stories").doc(storyId);
    await storyRef.delete();
    res.status(200).json({ message: "Story deleted successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a comment to a story
const addComment = async (req, res) => {
  const { storyId } = req.params;
  const { userId, content } = req.body;
  try {
    const db = await getDbInstance();
    const newCommentRef = db
      .collection("stories")
      .doc(storyId)
      .collection("comments")
      .doc();
    await newCommentRef.set({
      userId,
      content,
      createdAt: new Date(),
    });
    res.status(201).json({
      message: "Comment added successfully",
      commentId: newCommentRef.id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Add a like to a story
const addLike = async (req, res) => {
  const { storyId } = req.params;
  const { userId } = req.body;
  try {
    const db = await getDbInstance();
    const newLikeRef = db
      .collection("stories")
      .doc(storyId)
      .collection("likes")
      .doc(userId);
    await newLikeRef.set({
      likedAt: new Date(),
    });
    res.status(201).json({ message: "Like added successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createStory,
  getStory,
  updateStory,
  deleteStory,
  addComment,
  addLike,
};
