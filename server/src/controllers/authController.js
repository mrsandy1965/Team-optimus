const bcrypt = require("bcrypt");
const { prisma } = require("../config/db.js");
const jwt = require("jsonwebtoken");


const registerUser = async (req, res) => {
    try {
      const { name, email, password, phone } = req.body;
      const exists = await prisma.user.findUnique({ where: { email } });
      if (exists) return res.status(400).json({ message: "User already exists" });
  
      const hashed = await bcrypt.hash(password, 10);
      const user = await prisma.user.create({
        data: { name, email, password: hashed, phone },
      });
      res.status(201).json({user,message: "User registered successfully" });
    } catch (err) {
      res.status(500).json({ "error": err.message });
    }
  };


const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user){ return res.status(404).json({ message: "User not found" })};
  
      const match = await bcrypt.compare(password, user.password);
      if (!match){return res.status(401).json({ message: "Invalid credentials" })};
  
      const token = jwt.sign({ id: user.id  }, process.env.JWT_SECRET, { expiresIn: "30d" });
      res.json({ token, user });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };
  

module.exports = { registerUser, loginUser };