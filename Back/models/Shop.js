const { Schema, model } = require('mongoose');

const shopSchema = new Schema({
    id: String,
    name: String,
    ownerId: String,
    ownerName: String,
    templateId: String
});

module.exports = model('shop', shopSchema);