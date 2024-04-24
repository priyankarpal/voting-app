import mongoose from 'mongoose';

const candidateSchema=new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    party: {
      type: String,
      required: true,
    },
    votes: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId, // getting user id from the mongodb
          required: true,
          ref: 'User',
        },
        votedAt: {
          type: Date,
          required: true,
          default: Date.now(),
        },
      },
    ],
    voteCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Candidate=mongoose.model('Candidate', candidateSchema);

export default Candidate;
