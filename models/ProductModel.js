const { ObjectId } = require('mongodb');
const Connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const productsCollection = await Connection.getConnection()
    .then((db) => db.collection('products'));
    
    const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });
    
    return {
      id,
      name,
      quantity,
    };
  };

const findProductByName = async (name) => {
  const productsCollection = await Connection.getConnection()
  .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });
  
  return product;
};

const getAllProducts = async () => {
  const db = await Connection.getConnection();
  const products = await db.collection('products')
    .find()
    .toArray();

  return products;
};

const findProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await Connection.getConnection();
  const products = await db.collection('products').findOne({ _id: ObjectId(id) });

  if (!products) return null;
  
  return products;
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  
  const db = await Connection.getConnection();
  const products = await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  
  if (!products) return null;

  return { id, name, quantity };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await Connection.getConnection();
  const products = await db.collection('products')
  .deleteOne({ _id: ObjectId(id) });

  if (!products) return null;

  return { id };
};

const refreshProduct = async (productId, quantity) => {
  const product = await Connection.getConnection();
  const response = await product.collection('products').updateOne(
    { _id: ObjectId(productId) }, { $inc: { quantity }, 
  },
);
  return response;
};

module.exports = {
  createProduct,
  findProductByName,
  getAllProducts,
  updateProduct,
  findProductById,
  deleteProduct,
  refreshProduct,
}; 