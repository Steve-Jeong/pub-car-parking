import express from "npm:express@4.18.2";
import {
  ObjectId,
} from "https://deno.land/x/atlas_sdk@v1.0.3/mod.ts";
import { UsersModel } from "../models/users.ts";

const router = express.Router()

router.use(express.json())

// Getting All
router.get('/', async (req, res) => {
  console.log('get all : ');
  try {
    const users = await UsersModel.find()
    console.log('number of users : ', users.length)
    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

// Getting One
router.get('/:id', async (req, res) => {
  console.log('get one : ');
  console.log('req.params.id : ', req.params.id);
  let user
  try {
    user = await UsersModel.findOne({ _id: new ObjectId(req.params.id) })
    console.log('user : ', user);
    if (user == null) {
      return res.status(404).json({ message: 'Cannot find the user' })
    }
  } catch (err) {
    return res.status(500).json({ message: err.message })
  }
  req.user = user
  res.send(req.user)
})

// Creating One
router.post('/', async (req, res) => {
  console.log('post one :');
  const user = {
    name: req.body.name,
    email: req.body.email
  }
  try {
    const newUser = await UsersModel.insertOne(user)
    res.status(201).json(newUser)
  } catch (err) {
    res.status(400).json({ message: err.message })
  }

})

export { router as usersRouter }