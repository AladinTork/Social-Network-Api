const { Thought, User } = require('../models');

// Get all thoughts
const getThoughts = async (req, res) => {
    try {
      const thoughts = await Thought.find();
      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Get a single thought by ID
  const getSingleThought = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Create a new thought
  const createThought = async (req, res) => {
    try {
      const thought = await Thought.create(req.body);
      await User.findByIdAndUpdate(
        req.body.userId,
        { $push: { thoughts: thought._id } },
        { new: true }
      );
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Update a thought by ID
  const updateThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true, runValidators: true });
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Delete a thought by ID
  const deleteThought = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndDelete(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }
      await User.findByIdAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }
      );
      res.json({ message: 'Thought deleted!' });
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Add a reaction to a thought
  const addReaction = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };
  
  // Remove a reaction from a thought
  const removeReaction = async (req, res) => {
    try {
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: { reactionId: req.body.reactionId } } },
        { new: true }
      );
      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  };

// Export all methods
module.exports = {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
};