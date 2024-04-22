import express from 'express';
import { createCandidate, getallCandidate, updateCandidate, voteCandidate, voteCount } from "../controllers/candidate.controller.js";
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
router.get('/', getallCandidate); // get all candidates
router.post('/vote/:candidateId', jwtAuth, voteCandidate); // to give vote to a particuular candidate

// vote counts
router.get('/vote/counts', voteCount); // to get all vote counts

// user profile routes
router.get('/profile/:id', jwtAuth, userProfile);
router.put('/profile/password', jwtAuth, userPassword);

// routes for admins
router.post('/', jwtAuth, createCandidate); // create a new candidate
router.put('/:candidateId', jwtAuth, updateCandidate); // Update the candidate
// router.delete('/:candidateId ', jwtAuth, deleteCandidate); // delete the candidate

export default router;
