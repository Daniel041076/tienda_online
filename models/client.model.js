const { model, Schema } = require('mongoose');

const clientSchema = new Schema({
    name: String,
    email: String,
    address: String,
    age: Number,
    activate: Boolean,
    products: [{ type: Schema.Types.ObjectId, ref: 'product' }]
});


module.exports = model('client', clientSchema);


//GET /api/clients/IDCLIENT/product