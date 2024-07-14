const utils = require('../utils');
const Shop = require('../models/Shop');

const getShops = async (req, res) => {
    const shops = await Shop.find({ ownerId: req.user.id }) || [];

    return res.status(200).json(shops.map(({ id, name, ownerId, ownerName, templateId, products }) => ({ id, name, ownerId, ownerName, templateId, products })));
}

const createShop = async (req, res) => {
    const { name, templateId } = req.body;

    if (!name) return res.status(400).json({ message: 'The shop name is required.' });
    if (!templateId) return res.status(400).json({ message: 'The template id is required.' });
    
    const nameRegex = /^[a-zA-Z][a-zA-Z0-9_-]{2,24}$/;
    if (!nameRegex.test(name)) return res.status(400).json({ message: 'The provided shop name is not valid.' });
    
    const existing = await Shop.findOne({ name, ownerId: req.user.id });
    if (existing) return res.status(400).json({ message: 'You already have a shop with this name.' });
    
    if (!['1', '2'].includes(templateId)) return res.status(400).json({ message: 'The template id is not valid.' });

    const shop = (await new Shop({
        id: utils.generateString(24),
        name,
        ownerId: req.user.id,
        ownerName: req.user.username,
        templateId
    }).save()).toJSON();

    delete shop._id;
    delete shop.__v;

    return res.status(200).json(shop);
}

module.exports = {
    getShops,
    createShop
};