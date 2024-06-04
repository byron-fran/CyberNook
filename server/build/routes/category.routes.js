"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const category_controller_1 = require("../controllers/category.controller");
const mark_controller_1 = require("../controllers/mark.controller");
const router = (0, express_1.Router)();
router.post('/category', category_controller_1.createCategory);
router.get('/category', category_controller_1.getCategories);
router.post('/mark', mark_controller_1.createMark);
router.get('/mark', mark_controller_1.getAllMarks);
exports.default = router;