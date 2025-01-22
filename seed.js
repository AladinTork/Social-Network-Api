const mongoose = require('mongoose');
const { User, Thought } = require('./models'); // Adjust path if necessary

const seedData = async () => {
  try {
    // Connect to the database
    await mongoose.connect('mongodb+srv://all:all@socialnetworkdb.4yipf.mongodb.net/?retryWrites=true&w=majority&appName=socialNetworkDB', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Thought.deleteMany({});
    console.log('Existing data cleared');

    // Seed users
    const users = [
      { username: 'user1', email: 'user1@example.com' },
      { username: 'user2', email: 'user2@example.com' },
      { username: 'user3', email: 'user3@example.com' },
    ];
    const createdUsers = await User.insertMany(users);
    console.log('Users seeded:', createdUsers);

    // Seed thoughts
    const thoughts = [
      { thoughtText: 'This is a thought from user1', username: 'user1' },
      { thoughtText: 'Another thought from user2', username: 'user2' },
    ];
    const createdThoughts = await Thought.insertMany(thoughts);
    console.log('Thoughts seeded:', createdThoughts);

    // Link thoughts to users
    await Promise.all(
      createdThoughts.map(async (thought, index) => {
        await User.findOneAndUpdate(
          { username: thought.username },
          { $push: { thoughts: thought._id } }
        );
      })
    );

    console.log('Thoughts linked to users');

    // Close the database connection
    mongoose.connection.close();
    console.log('Seeding complete!');
  } catch (err) {
    console.error('Error during seeding:', err);
    mongoose.connection.close();
  }
};

seedData();