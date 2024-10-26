import catchAsync from "../helpers/catchAsync.js";
import HttpError from "../helpers/HttpError.js";
import { 
  signupUser, 
  loginUser, 
  generateHash, 
  findUserById,
  addToWishlist,
  removeFromWishlist,
  getWishlist
} from "../services/userServices.js";
import { User } from "../models/user.js";

export const registerUser = catchAsync(async (req, res) => {
  const { email, password } = req.body;

  const hashedPassword = await generateHash(password);

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new HttpError(409, "Email is already in use");
  }

  const result = await signupUser({ ...req.body, password: hashedPassword });

  res.status(201).json({
    user: {
      email: result.newUser.email,
      subscription: result.newUser.subscription,
    },
  });
});

export const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await loginUser({ email, password });

  await User.findByIdAndUpdate(user.id, { token });

  res.status(200).json({
    token,
    user: {
      email: user.email,
      subscription: user.subscription,
    },
  });
});


export const getCurrent = catchAsync(async (req, res) => {
    const { email, subscription } = req.user;
    res.status(200).json({
      email,
      subscription,
    });

});

export const logoutUser = catchAsync(async (req, res) => {
  const { id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });
  res.status(204).send();
});

export const addToWishlistController = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { bookId } = req.body;
  const wishlist = await addToWishlist(userId, bookId);
  res.status(200).json({ wishlist });
});

export const removeFromWishlistController = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const { bookId } = req.body;
  const wishlist = await removeFromWishlist(userId, bookId);
  res.status(200).json({ wishlist });
});

export const getWishlistController = catchAsync(async (req, res) => {
  const { id: userId } = req.user;
  const wishlist = await getWishlist(userId);
  res.status(200).json({ wishlist });
});
