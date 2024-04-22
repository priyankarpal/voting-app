import express from 'express';
import { createCandidate, deleteCandidate, updateCandidate } from "../controllers/candidate.controller.js";
import {
  loginUser,
  signupUser,
  userPassword,
  userProfile
} from '../controllers/user.controller.js';
import { jwtAuth } from "../middlewares/jwt.js";

const router=express.Router();
// user creation
router.post('/signup', signupUser);
router.post('/login', loginUser);

/// voting
router.get('/candidates',);
router.post('/vote/:candidateId');

// vote counts
router.get('/vote/counts');

// user profile routes
router.get('/profile', jwtAuth, userProfile);
router.put('/profile/password', jwtAuth, userPassword);

// routes for admins
router.post('/', jwtAuth, createCandidate); // create a new candidate
router.put('/:candidateId', jwtAuth, updateCandidate); // Update the candidate
router.delete('/:candidateId ', jwtAuth, deleteCandidate); // delete the candidate

export default router;
