import express, {request, response} from 'express';
import dotenv from 'dotenv';
import { sequelize} from './connection/db';
import routerProduct from './routes/product.routes';
import routerOrder from './routes/order.routes';
import routerUser from './routes/user.routes';
import routesCategory from './routes/category.routes';
import routersAddress from './routes/address.routes';
import routersPayment from './routes/payment.routes';
import routerReviews from './routes/reviews.routes'
import routesQuestion from './routes/question.routes'
import routesSpecs from './routes/specs.routes'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'

dotenv.config()
const app = express();

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
// app.use(
//     session({
//       secret: process.env.SESSION_SECRET!,
//       resave: false,
//       saveUninitialized: false,
//       cookie: {
//         httpOnly: true,
//         secure:true,
//         sameSite: 'none',
//         maxAge: 3600000,
//       },
//     })
//   );
app.use(cors({ origin: ' http://localhost:5173/', credentials: true }));
// app.set('trust proxy', 1)
app.use(cookieParser());
app.use(express.json());

app.use('/store', routerProduct);
app.use('/', routerOrder);
app.use('/', routerUser);
app.use('/', routesCategory);
app.use('/', routersAddress);
app.use('/', routerReviews);
app.use('/', routesSpecs);
app.use('/cart', routersPayment)
app.use('/', routesQuestion)


sequelize.sync({force : false})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`El puerto ${process.env.PORT}`);
            console.log('Conexion a base de datos')
        })
    })
    .catch(error => {
        console.log('Error a conextion')
        console.log(error)
})
