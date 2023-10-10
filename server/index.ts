import express, {request, response} from 'express';
import dotenv from 'dotenv';
import { sequelize} from './connection/db';
import routerProduct from './routes/product.routes';
import routerPurchase from './routes/cart.routes'
import morgan from 'morgan'


dotenv.config()
const app = express()
app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use((req = request, res = response, next :()=> void ) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept',
    );
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
app.use(express.json());
app.use('/store', routerProduct);
app.use('/store', routerPurchase)


sequelize.sync({force:false})
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log(`El puerto ${process.env.PORT}`);
            console.log('Conion a base de datos')
        })
    })
    .catch(error => {
        console.log('Error a conextion')
        console.log(error)
})