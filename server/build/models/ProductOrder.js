"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Product_1 = __importDefault(require("./Product"));
const Order_1 = __importDefault(require("./Order"));
class ProductOrder extends sequelize_typescript_1.Model {
}
exports.default = ProductOrder;
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Order_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Object)
], ProductOrder.prototype, "OrderId", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => Product_1.default),
    sequelize_typescript_1.Column,
    __metadata("design:type", Object)
], ProductOrder.prototype, "ProductId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Order_1.default, 'ProductId'),
    __metadata("design:type", Product_1.default)
], ProductOrder.prototype, "product", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => Product_1.default, 'OrderId'),
    __metadata("design:type", Order_1.default)
], ProductOrder.prototype, "order", void 0);
