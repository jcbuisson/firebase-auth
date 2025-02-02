import 'dotenv/config'
import express from 'express'
import admin from "firebase-admin"

const app = express()

// Initialize Firebase Admin SDK
admin.initializeApp({
   credential: admin.credential.cert("service-account.json"),
})


app.use(express.json())

// Middleware to verify token
const verifyToken = async (req, res, next) => {
   console.log('req.body.token', req.body.token)
   try {
      const token = req.body.token
      if (!token) return res.status(401).json({ error: "No token provided" })

      const decodedToken = await admin.auth().verifyIdToken(token)
      req.user = decodedToken
      next()
   } catch (error) {
      res.status(401).json({ error: "Invalid token" })
   }
}

// Example protected route
app.post("/auth", verifyToken, (req, res) => {
   console.log("User authenticated", req.user)
   res.sendStatus(200)
})


const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})