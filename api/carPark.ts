import { Router } from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {
  ObjectId,
} from "https://deno.land/x/atlas_sdk@v1.0.3/mod.ts";
import { CarParkModel } from "../models/carPark.ts";

const router = new Router();

// Getting All
router
  .get('/', async (ctx) => {
    console.log('get all : ');
    try {
      const cars = await CarParkModel.find()
      console.log('number of car park : ', cars.length)
      console.log('cars : ', cars)
      ctx.response.status = 200
      ctx.response.body = cars
    } catch (err) {
      ctx.response.status = 500
      ctx.response.body = { message: err.message }
    }
  })

  // Getting One
  .get('/:id', async (ctx) => {
    console.log('get one : ');
    console.log('req.params.id : ', ctx.request.params.id);
    let car
    try {
      car = await CarParkModel.findOne({ _id: new ObjectId(req.params.id) })
      console.log('car : ', car);
      if (car == null) {
        ctx.response.status = 404
        ctx.response.body = { message: 'Cannot find the car' }
        return
      }
    } catch (err) {
      ctx.response.status = 500
      ctx.response.body = { message: err.message }
      return
    }
    ctx.request.user = car
    ctx.response.body = ctx.request.user
  })

  // Creating One
  .post('/', async (ctx) => {
    console.log('car post one :');
    const body = await ctx.request.body().value;
    const car = {
      name: body.name,
      printCreatedAt: (() => {
        const fullDate = new Date()
        const year = fullDate.getFullYear();
        const month = fullDate.getMonth() + 1;
        const date = fullDate.getDate();
        const time = fullDate.toLocaleString().split(', ')[1]
        return `${year}/${month}/${date}, ${time}`
      })(),
      createdAt: (() => Date.now())()
    }
    console.log('date : ', Date.now());
    try {
      const newCar = await CarParkModel.insertOne(car)
      ctx.response.status = 201
      ctx.response.body = newCar
    } catch (err) {
      ctx.response.status = 400
      ctx.response.body = { message: err.message }
    }
  })

export { router as carParkRouter }