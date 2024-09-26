import jwt from 'jsonwebtoken'

const generateToken = (userId, email) => {
  const token = jwt.sign({ userId, email }, process.env.JWT_SECRET, {
    expiresIn: '2h',
  })
  return token
}

export default generateToken