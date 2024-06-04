"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = require("./connection/db");
const product_routes_1 = __importDefault(require("./routes/product.routes"));
const order_routes_1 = __importDefault(require("./routes/order.routes"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const category_routes_1 = __importDefault(require("./routes/category.routes"));
const address_routes_1 = __importDefault(require("./routes/address.routes"));
const payment_routes_1 = __importDefault(require("./routes/payment.routes"));
const reviews_routes_1 = __importDefault(require("./routes/reviews.routes"));
const question_routes_1 = __importDefault(require("./routes/question.routes"));
const specs_routes_1 = __importDefault(require("./routes/specs.routes"));
const favorites_routes_1 = __importDefault(require("./routes/favorites.routes"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, morgan_1.default)('dev'));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)({ origin: ['https://cyber-nook-8wwr.vercel.app', 'http://localhost:5173'], credentials: true, }));
// app.set('trust proxy', 1)
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.json());
app.use('/store', product_routes_1.default);
app.use('/', order_routes_1.default);
app.use('/', user_routes_1.default);
app.use('/', category_routes_1.default);
app.use('/', address_routes_1.default);
app.use('/', reviews_routes_1.default);
app.use('/', specs_routes_1.default);
app.use('/', favorites_routes_1.default);
app.use('/cart', payment_routes_1.default);
app.use('/', question_routes_1.default);
db_1.sequelize.sync({ force: false })
    .then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`El puerto ${process.env.PORT}`);
        console.log('Conexion a base de datos');
    });
})
    .catch(error => {
    console.log('Error a conextion');
    console.log(error);
});
