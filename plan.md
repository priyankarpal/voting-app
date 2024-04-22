### voting app

## Function

- user's need to login using aadhar number & phone number
- signup then signin
- see the list of candidates
- user can vote one candidate
- live vote count & a route where we can see candidates
- admin can manage candidates but admin can't vote to any party
- users can manage their profile ie. can change password

## Routes

#### users

-- /signup: POST -- create a new user account
-- /login: POST -- login to an exsting user

### voting

-- /candidates : GET -- get all list of candidates
-- /vote/:candidateId :POST -- vote for a specific candidate

### vote counts

/vote/counts : GET

### user Profile

/profile: GET
/profile/password: PUT

## Admins

/createcandidate: POST - create a new candidate
/candidate/:candidateId : PUT - Update the candidate
/candidate/:candidateId : DELETE - delete the candidate
