const getMe = async (req, res) => {
    return res.status(200).json(req.user);
}

const getShops = async (req, res) => {
    return res.status(200).json([]);
}

module.exports = {
    getMe,
    getShops
};