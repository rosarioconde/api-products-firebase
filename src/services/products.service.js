import * as ProductModel from '../models/product.model.js';
import { AppError } from '../utils/AppError.js';

const validateProduct = (product, partial = false) => {
  if (!product || typeof product !== 'object' || Array.isArray(product)) {
    throw new AppError('El cuerpo debe contener un producto válido', 400);
  }

  const required = ['name', 'price', 'description'];
  if (!partial && required.some((field) => product[field] === undefined)) {
    throw new AppError('Los campos name, price y description son obligatorios', 400);
  }
  if (partial && Object.keys(product).length === 0) {
    throw new AppError('Debe indicar al menos un campo para actualizar', 400);
  }
  if (product.name !== undefined && (typeof product.name !== 'string' || !product.name.trim())) {
    throw new AppError('name debe ser un texto no vacío', 400);
  }
  if (product.price !== undefined && (typeof product.price !== 'number' || product.price < 0)) {
    throw new AppError('price debe ser un número mayor o igual a cero', 400);
  }
  if (product.description !== undefined && (typeof product.description !== 'string' || !product.description.trim())) {
    throw new AppError('description debe ser un texto no vacío', 400);
  }
};

export const getProducts = () => ProductModel.findAll();

export const getProductById = async (id) => {
  const product = await ProductModel.findById(id);
  if (!product) throw new AppError('Producto no encontrado', 404);
  return product;
};

export const createProduct = (data) => {
  validateProduct(data);
  return ProductModel.create({ ...data, name: data.name.trim() });
};

export const updateProduct = async (id, data) => {
  validateProduct(data, true);
  await getProductById(id);
  const cleanData = data.name === undefined ? data : { ...data, name: data.name.trim() };
  return ProductModel.update(id, cleanData);
};

export const deleteProduct = async (id) => {
  await getProductById(id);
  await ProductModel.remove(id);
};
