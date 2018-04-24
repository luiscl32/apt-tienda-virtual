'use-strict'
import mongoose from 'mongoose';

const Schema = mongoose.Schema;

/* dandole valor a schema */

const ProductSchema = Schema({
  name: String,
  price: {type: Number, default: 0},
  description: String,
  category: {type: String, enum: ['Computers','Phones','VideoGames']},
  brand: {type: String, enum: ['Apple','Sony','HP','Dell','Samsung','Microsoft','Nintendo']},
  reputation: {type: Number, default: 0},
  vendor: String,
  picture: String,
});


module.exports = mongoose.model('product',ProductSchema);
