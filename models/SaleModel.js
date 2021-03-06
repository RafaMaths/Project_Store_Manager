const { ObjectId } = require('mongodb');
const Connection = require('./connection');
// const ProductModel = require('./ProductModel');

const createSale = async (body) => {
  const salesCollection = await Connection.getConnection()
    .then((db) => db.collection('sales'));

    const { insertedId: id } = await salesCollection.insertOne({
      itensSold: [...body],      
    });
            
    return {
      _id: id,
      itensSold: [...body],
    };
  };

  const getAllSales = async () => {
    const salesCollection = await Connection.getConnection();
    return salesCollection.collection('sales').find().toArray();
  };

  const getSaleById = async (id) => {
    const salesCollection = await Connection.getConnection();
    const sale = await salesCollection.collection('sales').findOne(ObjectId(id));
    
    return sale;
  };

  const updateSale = async (id, sale) => {
    if (!ObjectId.isValid(id)) return null;
  
    const salesCollection = await Connection.getConnection();
    await salesCollection.collection('sales').updateOne({
       _id: ObjectId(id) }, { $set: { itensSold: sale } });
    
    return {
      _id: id,
      itensSold: sale,
    };
  };

  const deleteSale = async (id) => {
    if (!ObjectId.isValid(id)) return null;

    const salesCollection = await Connection.getConnection();
    const sales = await salesCollection.collection('sales').deleteOne({
      _id: ObjectId(id),
    });
    return sales;
  }; 

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
  };
