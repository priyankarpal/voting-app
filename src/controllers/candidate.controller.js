import Candidate from '../model/candidate.model.js';
import User from "../model/user.model.js";


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
      return res.status(403).json({ message: "User has no access to admin role" });
    }
    const getCandidate=req.body;
    const newCandidate=new Candidate(getCandidate);
    const response=await newCandidate.save();

    res.status(200).json({ message: 'data saved to the db', response });
  } catch (error) {
    console.log('candidate create problem', error);
    res.status(500).json({ error: 'Internal error' });
  }
};

// update the candidate
const updateCandidate=async (req, res) => {
  try {

    if (!(await checkAdmin(req.user.id))) {
      return res.status(403).json({ message: "User has no access to admin role" });
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
// delete
const deleteCandidate=async (req, res) => {

  try {
    if (!checkAdmin(req.user.id))
      return res.status(403).json({ message: 'user does not have admin role' });

    const candidateID=req.params.candidateID; // Extract the id from the URL parameter

    const response=await Candidate.findByIdAndDelete(candidateID);

    if (!response) {
      return res.status(404).json({ error: 'Candidate not found' });
    }

    console.log('candidate deleted');
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};




export { createCandidate, deleteCandidate, updateCandidate };

