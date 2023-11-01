const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:{
        type : String,
        required :true
    },
    thumbnail:{
        // type : String,
        // required :true,
        data: String,
        contentType : String
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: function(value) {
                return value >= 1; // Check if price is greater than or equal to 1
            },
            message: 'Price must be greater than or equal to 1'
        }
    },
    description: {
        type : String,
        required :true
    },
    quantity: {
        type : Number,
        required :true
    }

});

module.exports = mongoose.model("Product",productSchema);
