// auth.repository.js
const User = require("./auth.model");

const findByEmail = (email) => User.findOne({ email });

const findByEmailWithPassword = (email) =>
  User.findOne({ email }).select("+password");

const findById = (id) => User.findById(id);

const createUser = (data) => User.create(data);

const updateById = (id, update) =>
  User.findByIdAndUpdate(id, update, { new: true });

module.exports = {
  findByEmail,
  findByEmailWithPassword,
  findById,
  createUser,
  updateById,
};
