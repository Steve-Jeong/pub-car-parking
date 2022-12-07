import { Application, Router} from "https://deno.land/x/oak@v11.1.0/mod.ts";
import {
  ejsEngine,
  oakAdapter,
  viewEngine,
} from "https://deno.land/x/view_engine@v10.5.1/mod.ts";

// import {usersRouter} from './api/users.ts'
import { carParkRouter } from './api/carPark.ts'
import { staticFileMiddleware } from "./staticFileMiddleware.ts";

const app = new Application();
const router = new Router();

let runOnce = false

app.use(
  viewEngine(
    oakAdapter,
    ejsEngine,
    {
      viewRoot: "./views",
    },
  ),
);

app.use(staticFileMiddleware)

// app.use(express.json())

router
  .get('/test', (ctx) => {
    ctx.render('test.ejs', { name: "정상태" })
  })
  .get('/', (ctx) => {
    ctx.render('index.ejs', { runOnce })
  })
  .get('/about', (ctx) => {
    ctx.render('about.ejs', { name: "정상태" })
  })

// router.use('/api/users', usersRouter.routes())
router.use('/api/cars', carParkRouter.routes())

app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000
console.log(`server is listening on port http://localhost:${PORT}`)
await app.listen({ port: PORT })

