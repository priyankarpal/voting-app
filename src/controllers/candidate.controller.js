import Candidate from '../model/candidate.model.js';
import User from "../model/user.model.js";


// check it is admin or not
const checkAdmin=async (userId) => {
  try {
    const user=await User.findById(userId);
    if (user.role==='admin') {
      return true;
    }
  } catch (error) {
    return error;
  }
};


// create a candidate
const createCandidate=async (req, res) => {
  try {
    if (!(await checkAdmin(req.user.id))) {
      return res.status(403).json({ error: "User has no access to admin role" });
    }
    const getCandidate=req.body;
    const newCandidate=new Candidate(getCandidate);
    const response=await newCandidate.save();

    res.status(200).json({ message: 'data saved to the db', response });
  } catch (error) {
    console.log('candidate create problem', error);
    res.status(403).json({ error: 'Internal error' });
  }
};

// update the candidate
const updateCandidate=async (req, res) => {
  try {

    if (!(await checkAdmin(req.user.id))) {
      return res.status(403).json({ error: "User has no access to admin role" });
    }

    const candidateId=req.params.candidateId;
    const updateCandidate=req.body;
    const response=await Candidate.findByIdAndUpdate(candidateId, updateCandidate, {
      new: true,
      runValidators: true
    });

    if (!response) {
      return res.status(403).json({ message: "candidate not found" });

    }

    res.status(200).json({ message: 'candidate updated', response });
  } catch (error) {
    console.log('problem', error);
    res.staus(500).json({ error: 'Internal error' });
  }
};

// vote candidate

const voteCandidate=async (req, res) => {
  const candidateId=req.params.candidateId;
  const userId=req.user.userData.id; // Accessing user ID from req.user.userData

  try {
    // Find the Candidate document with the specified candidateID
    console.log('User:', req.user);
    const candidate=await Candidate.findById(candidateId);
    const user=await User.findById(userId);

    if (!candidate) {
      return res.status(404).json({ error: 'Candidate not found' });
    }
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (user.role==='admin') {
      return res.status(403).json({ error: 'Admin is not allowed' });
    }
    if (user.isVoted) {
      return res.status(400).json({ error: 'You have already voted' });
    }

    // Update the Candidate document to record the vote
    candidate.votes.push({ user: userId });
    candidate.voteCount++;
    await candidate.save();

    // Update the user document
    user.isVoted=true;
    await user.save();

    return res.status(200).json({ message: 'Vote recorded successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};


// vote count 
const voteCount=async (req, res) => {

  try {
    const candidate=await Candidate.find().sort({ voteCount: "desc" }); // we can get all details from the candidates
    const record=candidate.map((data) => {
      return {
        party: data.party,
        voteCount: data.voteCount
      };
    });
    res.status(200).json({ record });

  } catch (error) {
    console.log('problem', error);
    res.status(500).json({ error: 'Internal error' });
  }

};

// get all candidates
const getallCandidate=async (req, res) => {
  try {
    const data=await Candidate.find();
    res.status(200).json(data);
  } catch (error) {
    console.log('problem', error);
    res.status(500).json({ error: 'Internal error' });
  }
};

export { createCandidate, getallCandidate, updateCandidate, voteCandidate, voteCount };

