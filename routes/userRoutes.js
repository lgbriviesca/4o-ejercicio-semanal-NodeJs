const express = require('express');

const { body } = require('express-validator');

const {
  userExists,
  protectToken,
  protectAccountOwner,
} = require('../middlewares/usersMiddleware');

const {
  createUserValidations,
  checkValidations,
} = require('../middlewares/validationsMiddlewares');

const {
  getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  login,
} = require('../controllers/userController');

const router = express.Router();

router.post('/login', login);

router.post('/', createUserValidations, checkValidations, createUser);

router.use(protectToken);

router.route('/').get(getAllUsers);

router
  .route('/:id')
  .get(getUserById)
  .patch(userExists, protectAccountOwner, updateUser)
  .delete(userExists, protectAccountOwner, deleteUser);

module.exports = { usersRouter: router };
