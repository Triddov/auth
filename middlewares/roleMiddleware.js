import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

export default function (roles) {

  return (req, res, next) => {

          if (req.method === 'OPTIONS') {
              next()
          }

          try{
              // получаю (если есть заголовок) сам токен без типа "Bearer"
              const token = req.headers.authorization?.split(' ')[1]
              if (!token){
                  res.status(403).json({ message:"User Unauthorized" })
              }

              const {roles: userRoles} = jwt.verify(token, process.env.JWT_KEY)
              let hasRole = false
              userRoles.forEach(role => {
                  if (roles.includes(role)){
                      hasRole = true
                  }
              })

              if (!hasRole){
                  return res.status(403).json({ message: "Insufficient rights" })
              }
              next()

          } catch (err) {
              console.error(err)
              res.status(500).json({ message: "Server Error" })
          }
      }
}
