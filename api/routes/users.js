const express = require("express");
const {
  updateUser,
  deleteUser,
  getUser,
  getUsers,
} = require("../controllers/user");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const router = express.Router();

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("hello user u are authenticated");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello, you are a valid user and can delete your account");
// });

// router.get("/checkAdmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello Admin, you are a valid user and can delete all accounts");
// });

router.put("/:id", verifyUser, updateUser);

router.delete("/:id", verifyUser, deleteUser);

router.get("/:id", verifyUser, getUser);

router.get("/", verifyAdmin, getUsers);

module.exports = router;
