const Shop = require('../models/Shop');

const getStore = async (req, res) => {
    const { username, store } = req.params;

    const storeData = await Shop.findOne({ ownerName: username, name: store });
    if (!storeData) return res.status(404).json({ message: 'This store doesn\'t exist.' });

    const data = storeData.toJSON();
    delete data.__v;
    delete data._id;

    return res.status(200).json(data);
}

module.exports = {
    getStore
};