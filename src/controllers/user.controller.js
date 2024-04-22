import { generateJwtToken } from '../middlewares/jwt.js';
import User from '../model/user.model.js';

// signup user
const signupUser=async (req, res) => {
  try {
    const getUser=req.body;
    const newUser=new User(getUser);
    const response=await newUser.save();

    const payload={
      id: response.id,
    };
    //jwt
    const token=generateJwtToken(payload);

    // console.log('data saved', response);
    res.status(200).json({ message: 'data saved to the db', response, token });
  } catch (error) {
    console.log('signup problem', error);
    res.status(500).json({ error: 'Internal error' });
  }
};
// login users
const loginUser=async (req, res) => {
  try {
    // i will get aadhar number from the body
    const { aadharCardNumber, password }=req.body;
    const user=await User.findOne({
      aadharCardNumber: aadharCardNumber,
    });

    if (!user||!(await user.comparePassword(password))) {
      return res.status(401).json({ message: 'invalid username or password' });
    }

    const payload={
      id: user.id,
    };
    const token=generateJwtToken(payload);
    res.status(200).json({ token });
  } catch (error) {
    console.log('signin problem', error);
    res.staus(500).json({ error: 'Internal error' });
  }
};
// get user profile
const userProfile=async (req, res) => {
  try {
    const userData=req.user.id;
    const user=await User.findById(userData);
    res.status(200).json({ user });
  } catch (error) {
    console.log('problem', error);
    res.staus(500).json({ error: 'Internal error' });
  }
};
// change user password
const userPassword=async (req, res) => {
  try {
    const userId=req.user.id;
    const { currentPassword, newPassword }=req.body; // to change the password we need old password

    const user=await User.findById(userId);
    if (!(await user.comparePassword(currentPassword))) {
      return res.status(401).json({ message: 'invalid password' });
    }
    user.password=newPassword;
    await user.save();

    res.status(200).json({ message: 'password updated' });
  } catch (error) {
    console.log('problem', error);
    res.staus(500).json({ error: 'Internal error' });
  }
};




export { loginUser, signupUser, userPassword, userProfile };

