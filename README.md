### voting app
it's a simple voting app made using expressjs,mongodb & added jwt authentication. 

## Function

- user's need to login using aadhar number & phone number

- signup then signin

- see the list of candidates

- user can vote one candidate

- live vote count & a route where we can see candidates

- admin can manage candidates but admin can't vote to any party

- users can manage their profile 

## Routes

### users

- `/signup: POST` - create a new user account

- `/login: POST` - login to an exsting user

### voting

- `/candidates : GET` - get all list of candidates

- `/vote/:candidateId : GET` - vote for a specific candidate

### vote counts

- `/vote/counts : GET` - get all vote counts

### user Profile

`/profile/:id GET` - get the details of the user 

## Admins

- `/createcandidate: POST` - create a new candidate

- ` /candidate/:candidateId : PUT` - Update the candidate
