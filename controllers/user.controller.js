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
  createUser({ body }, res) {
    User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
},
  // update user by ID
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
},
  // Delete user by ID
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
},
  // add friends
  addFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $push: { friends: params.friendId } },
        { new: true, runValidators: true }
    )
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => res.json(err));
},
  // delete friends
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
        { _id: params.userId },
        { $pull: { friends: params.friendId } },
        { new: true }
    )
    .then(dbUserData => res.json(dbUserData))
    .catch(err => res.json(err));
}



}; // end user control

module.exports = userController;
