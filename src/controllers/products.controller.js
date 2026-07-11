import * as ProductsService from '../services/products.service.js';

export const getAll = async (_req, res) => {
  const products = await ProductsService.getProducts();
  res.json(products);
};

export const getOne = async (req, res) => {
  const product = await ProductsService.getProductById(req.params.id);
  res.json(product);
};

export const create = async (req, res) => {
  const product = await ProductsService.createProduct(req.body);
  res.status(201).json(product);
};

export const update = async (req, res) => {
  const product = await ProductsService.updateProduct(req.params.id, req.body);
  res.json(product);
};

export const remove = async (req, res) => {
  await ProductsService.deleteProduct(req.params.id);
  res.status(204).send();
};
