const express = require("express");
const app = express();
const {connect}=require("./mongo")
const nodemailer = require("nodemailer");
const env = require("dotenv");
const jwt = require("jsonwebtoken");
const cors = require("cors");;
// const otpGenerator = require("otp-generator");
const crypto = require("crypto");
const {user,repo}=require("./models")

env.config();
app.use(express.json());
app.use(cors());

function hash(password) {
  const hash = crypto.createHash("sha256");
  hash.update(password);
  return hash.digest("hex");
}

const transpoter=nodemailer.createTransport({
    service: "outlook",
    auth: {
      user: "mohanavamsi16@outlook.com",
      pass: process.env.PASS,
    },
  })
  
  function verifyToken(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) {
      res.status(403).json({ message: 'No token provided' });
    }
    
    jwt.verify(token, process.env.JWT, (err, decoded) => {
      if (err) {
        res.status(401).json({ message: 'Invalid token' });
      }
      console.log(decoded)
      next();
    });
  }
  
app.post("/sign", async (req, res) => {
    try {
      const { email, password, username, data } = req.body;
      const check = await user.findOne({ email: email });  
      if (check) {
        res.status(400).json({ message: "User in database, please login." });
      } else {
        await user.create({
          name: username,
          email: email,
          password: hash(password),
          photo: data,
          valid:false
        });
  
        var verify = {
          from:"mohanavamsi16@outlook.com" ,
          to: "mohanavamsi14@gmail.com",
          subject: "verification",
          html:`<div>
          <p>${username}</p>
          <p>${email}</p>
          <a href="http://localhost:8001/verify/${username}">verify</a>
          </div>`,
        };
       await transpoter.sendMail(verify)
        res.status(201).json({ message: "User Created!!", username: username, photo: data});
      }
    } catch (error) {
      console.log("Error in sign up:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  app.get("/verify/:name",async(req,res)=>{
    const check = await user.findOne({name:req.params.name})
    if(check){
        check.valid=true
        await check.save()
      res.send("done")
    }
  })
  app.post("/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const check = await user.findOne({ email: email });
      console.log(check)
      const check2=check.valid
        if (check && check2) {
          if (hash(password) === check.password) {
            const token = jwt.sign(
              { id: check._id, email: check.email, username: check.name },
              process.env.JWT,
              { expiresIn: '24h' }
            );
            res.json({ token: token, username: check.name, message: "ok", photo: check.photo });
          } else {
            res.status(400).json({ message: "Password is wrong" });
          }
        } else {
          res.status(404).json({ message: "User not in database or not verifyed yet" });
        }
    } catch (error) {
      console.error("Error in login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
  app.post("/repo",verifyToken,async(req,res)=>{
    const {name,des,photo,created_by}=req.body
    await repo.create({name,des,photo,created_by})
    res.json({status:"Done"})
  })
  app.get("/repo",verifyToken,async(req,res)=>{
    const data=await repo.find({})
    res.json(data)
  })
  app.get("/",(req,res)=>{
    res.send("erbij")
  })

app.listen(8001,async()=>{
    await connect()
    console.log("listing")
})
