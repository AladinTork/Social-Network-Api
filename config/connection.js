const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://all:all@socialnetworkdb.4yipf.mongodb.net/?retryWrites=true&w=majority&appName=socialNetworkDB",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
