import 'dotenv/config'
import express from 'express'
import admin from "firebase-admin"
import bearerToken from 'express-bearer-token'

const app = express()

// Initialize Firebase Admin SDK
admin.initializeApp({
   credential: admin.credential.cert("service-account.json"),
})

app.use(express.json())
app.use(bearerToken({ cookie: true }))

// Protect below routes by checking JWT bearer token and attach .user to req
app.use('/', async (req, res, next) => {
   try {
      const token = req.token
      if (!token) return res.status(401).json({ error: "No token provided" })

      const decodedToken = await admin.auth().verifyIdToken(token)
      req.user = decodedToken
      console.log("User authenticated", req.user)
      next()
   } catch (error) {
      res.status(401).json({ error: "Invalid token" })
   }
})

// Example protected route
app.get("/api", (req, res) => {
   res.send({ a: 123, b: 234 })
})


const port = process.env.PORT || 3000

app.listen(port, function () {
  console.log(`app listening on port ${port}`)
})