import { request, response } from 'express';
import Product from '../models/Product';
import { AxiosError } from 'axios';
import { Op, } from 'sequelize';
import Reviews from '../models/Reviews';
import Specs from '../models/Specs';
import { Product as ProductInterface } from '../interfaces/Product';

interface WhereClause {
    [key: string]: {
        [Op.like]: string;
    } | undefined;
}
const createProduct = async (req = request, res = response) => {

    try {

        const newProduct = await Product.create(req.body)

        if (!newProduct) { return res.status(404).json({ error: 'No saved product' }) };

        return res.status(200).json(newProduct)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

            return res.status(500).json({ error: (error as AxiosError).message });
        } else {

            return res.status(500).json({ error: error });
        }
    }

};


const getProductById = async (req = request, res = response) => {
    const { id } = req.params;
    try {
        const productFind = await Product.findByPk(id, {
            include: [Reviews, Specs]
        });
        if (!productFind) { return res.status(404).json({ error: `Product ${id} does not exist` }) };

        return res.status(200).json(productFind)

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

            return res.status(500).json({ error: (error as AxiosError).message });
        } else {

            return res.status(500).json({ error: error });
        }
    }

};

const getProductsBySearch = async (req = request, res = response) => {
    const { q, name } = req.query;


    try {

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {

            return res.status(500).json({ error: (error as AxiosError).message });
        } else {

            return res.status(500).json({ error: error });
        }
    }
}
const getAllProducts = async (req = request, res = response) => {
    try {
        const totalItems = await Product.count()
        const allProducts = await Product.findAll({
            order: [['discount', 'DESC']]
        });

        if (allProducts.length) {
            return res.status(200).json({ allProducts, totalItems})
        };

        return res.status(404).json('no products')

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }

};
const getProducts = async (req = request, res = response) => {

    const { category, mark, page } = req.query;
    const cleanedMark = mark?.toString().replace(/\+/g, '');
    const cleanedCategory = category?.toString().replace(/\+/g, '');

    try {
        const offset = (Number(page) - 1) * 10 || 0;
        const totalItems = await Product.count();
        let whereClause: WhereClause = {}; // Define el tipo de whereClause como WhereClause

        // Verifica si se proporcionó la categoría en el query
        if (cleanedCategory ) {
            whereClause.category = {
                [Op.like]: `%${cleanedCategory}%`
            };
        }

        // Verifica si se proporcionó la marca en el query
        if (cleanedMark ){
            whereClause.mark = {
                [Op.like]: `%${cleanedMark}%`
            };
        }

        // Realiza la consulta con las cláusulas WHERE dinámicas
        const products = await Product.findAll({
            limit: 10,
            where: whereClause,
            offset: offset,
            order: [['discount', 'DESC']] // Aplica las cláusulas WHERE construidas dinámicamente
        });

        // Retorna una lista vacía si no se encontraron productos
        if (!products || products.length === 0) {
            return res.status(200).json({
                products: [],
                totalPages : 0,

            });
        }
      
        const currentPage = page ? Number(page) : 1;
        const totalPages = Math.ceil(totalItems / (products.length === 10 ? 10 : totalItems));
        // Retorna los productos encontrados
        return res.status(200).json({
            products,
            totalItems,
            currentPage,
            totalPages,
            nextPage: currentPage < totalPages ? currentPage + 1 : 0,
            previousPage: currentPage > 1 ? currentPage - 1 : 0,

        });

    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: error })
        }
    }
};


const deleteProductById = async (req = request, res = response) => {
    const { id } = req.params
    try {

        const product = await Product.findByPk(id);
        if (!product) { return res.status(404).json({ message: "product not found" }) }
        await product.destroy();
        return res.status(204).json({ message: "delete Success" })
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
};

const updateProductById = async (req = request, res = response) => {
    const { name, price, stock, category, image, discount }: ProductInterface = req.body;
    const { id } = req.params;
    try {
        const productFound = await Product.findByPk(id);
        if (!productFound) { return res.status(404).json({ message: "Product not found" }) };
        productFound.name = name;
        productFound.price = price;
        productFound.stock = stock;
        productFound.category = category;
        productFound.image = image;
        productFound.discount = discount;
        await productFound.save()

        return res.status(200).json(productFound)
    }
    catch (error: unknown) {
        if (error instanceof AxiosError) {
            return res.status(500).json({ message: error.message })
        }
        else {
            return res.status(500).json({ message: 'Error unknown' })
        }
    }
}


export {
    createProduct,
    getProductById,
    getProducts,
    deleteProductById,
    updateProductById,
    getAllProducts,
    getProductsBySearch

}