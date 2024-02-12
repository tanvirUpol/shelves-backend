const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const mongoose = require("mongoose");
const Role = require("../models/RolesModel");
// Register a new user
const register = async (req, res) => {
  try {
    const { email } = req.body;
    let userExist = Boolean(await UserModel.findOne({ email }));

    if (!userExist) {
      const salt = await bcrypt.genSalt(10);
      const passwordHash = await bcrypt.hash(req.body.password, salt);

      let user = await UserModel.create({
        ...req.body,
        password: passwordHash,
      });

      return res.status(201).send({
        status: true,
        message: "User created successfully!",
        token: jwt.sign(
          {
            name: user.name,
            email: user.email,
            role: user.role,
          },
          process.env.JWT
        ),
      });
    } else {
      return res.status(409).send({
        status: false,
        message: `User exist with ${email}`,
      });
    }
  } catch (err) {
    res.send({
      status: false,
      message: `Error in registration : ${err}`,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await UserModel.findOne({ email }).lean();
    const userExist = Boolean(user);

    if (!userExist) {
      return res.status(401).json({
        status: false,
        message: `User doesn't exist`,
      });
    }

    console.log(user);

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    

    // Fetching role from Role model
    const role = await Role.findOne({ role: user.role });
    if (!role) {
      return res.status(500).json({
        status: false,
        message: "User role not found",
      });
    }

    //     console.log(role.hasPermission);

    // Attaching role permissions to user
    user = {
      ...user,
      hasPermission: role?.hasPermission? role.hasPermission : [],
    };

    console.log("User object with role permissions:", user);

    // Generating JWT token
    let token = jwt.sign(
      {
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT,
      {
        expiresIn: "7d",
      }
    );
    // Remove the password field from the user object
    const { password: pass, ...userWithoutPassword } = user;

    res.send({
      status: true,
      message: "User logged in successfully!",
      token: `Bearer ${token}`,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

const changePass = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ _id: id }).select(
      "_id email password"
    );
    const userExist = Boolean(user);

    if (!userExist) {
      return res.status(401).json({
        status: false,
        message: `User doesn't exist`,
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: false,
        message: "Invalid email or password",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await UserModel.findOneAndUpdate(
      { _id: id },
      { password: hashedPassword },
      {
        new: true, // Return the modified document rather than the original
        projection: "_id email", // Specify the fields to return in the result
      }
    );

    res.send({
      status: true,
      message: "User logged in successfully!",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({
      status: false,
      message: "Internal server error",
    });
  }
};

// GET all users
// const users = async (req, res) => {
//   try {
//     const allUsers = await UserModel.find({ isDeleted: false });

//     res.status(200).json({
//       status: true,
//       users: allUsers,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: `${err}`,
//     });
//   }
// };

const users = async (req, res) => {
  try {
    const allUsers = await UserModel.find({ isDeleted: false })
      .select("-password")
      .lean();

    // Fetching role for each user and attaching role permissions concurrently
    for (let i = 0; i < allUsers.length; i++) {
      const user = allUsers[i];
      const role = await Role.findOne({
        role: { $regex: new RegExp(user.role, "i") },
      }).lean();
      if (role) {
        allUsers[i] = {
          ...user,
          hasPermission: role.hasPermission,
        };
      }
    }

    res.status(200).json({
      status: true,
      users: allUsers,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `${err}`,
    });
  }
};

// GET all deleted users
const deletedUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find({ isDeleted: true });

    res.status(200).json({
      status: true,
      users: allUsers,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `${err}`,
    });
  }
};

// GET all user preferences
const userPreferences = async (req, res) => {
  try {
    await UserModel.find({}, "role hasPermission")
      .exec()
      .then((users) => {
        const userRolesAndPermissions = {
          roles: [...new Set(users.map((user) => user.role))],
          permissions: [
            ...new Set(
              users.reduce((acc, user) => acc.concat(user.hasPermission), [])
            ),
          ],
        };

        res.status(200).json({
          status: true,
          preferences: userRolesAndPermissions,
        });
      })
      .catch((err) => {
        res.status(500).json({
          status: false,
          message: `${err}`,
        });
      });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `${err}`,
    });
  }
};

// GET user by Id
// const user = async (req, res) => {
//   const { id } = req.params;

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(404).json({
//       status: false,
//       message: `User Id Incorrect`,
//     });
//   }

//   try {
//     const singleUser = await UserModel.findById(id);

//     res.status(200).json({
//       status: true,
//       user: singleUser,
//     });
//   } catch (err) {
//     res.status(500).json({
//       status: false,
//       message: `${err}`,
//     });
//   }
// };

// GET user by Id
const user = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: false,
      message: `User Id Incorrect`,
    });
  }

  try {
    let singleUser = await UserModel.findById(id).select("-password").lean();

    if (!singleUser) {
      return res.status(404).json({
        status: false,
        message: `User not found`,
      });
    }

    // Fetching role from Role model
    const role = await Role.findOne({ role: singleUser.role });

    if (!role) {
      return res.status(500).json({
        status: false,
        message: "User role not found",
      });
    }

    // Attaching role permissions to user using spread operator
    singleUser = {
      ...singleUser,
      hasPermission: role.hasPermission,
    };

    res.status(200).json({
      status: true,
      user: singleUser,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      status: false,
      message: `${err}`,
    });
  }
};

// Update user by Id
const update = async (req, res) => {
  const { id } = req.params;
  let userDetails = {};

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      status: false,
      message: `User Id incorrect`,
    });
  }

  if (req.body.password) {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(req.body.password, salt);

    userDetails = {
      ...req.body,
      password: passwordHash,
      updatedAt: new Date(),
    };
  } else {
    userDetails = {
      ...req.body,
      updatedAt: new Date(),
    };
  }

  try {
    let updatedUser = await UserModel.findByIdAndUpdate(id, userDetails, {
      new: true,
      runValidators: true,
    });

    res.status(201).json({
      status: true,
      user: updatedUser,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: `${err}`,
    });
  }
};

module.exports = {
  register,
  login,
  users,
  deletedUsers,
  userPreferences,
  user,
  update,
  changePass
};
