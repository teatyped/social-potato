const { User, Thought } = require("../models/index");

const userController = {
  //get all users
  getAllUser(req, res) {
    User.find({})
      .populate(
        {
          path: "thoughts",
          select: "-__v",
        },
        {
          path: "friends",
          select: "-__v",
        }
      )
      .select("-__v")
      .then(dbUserData => res.json(dbUserData))
      .catch(err =>{
          console.log(err);
          return res.status(400).json(err);
      });
  },

//   get single user by id 
  getUserById({ params }, res) {
      User.findOne({ _id: params.id })
      .populate(
        {
            path: "thoughts",
            select: "-__v",
          },
          {
            path: "friends",
            select: "-__v",
          }
      )
      .select('-__v')
      .then(dbUserData  => {
          if (!dbUserData) {
              res.status(404).json({message: 'No user found with this ID'});
              return;
          }
          return res.json(dbUserData);
      })
      .catch(err => {
          console.log(err);
          return res.status(400).json(err);
      });
  },

  // create new User

  // update user by ID

  // Delete user by ID

  // add friends

  // delete friends




};
