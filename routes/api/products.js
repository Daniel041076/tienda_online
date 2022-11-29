const router = require('express').Router();

//importamos el modelo de product
const product = require('../../models/product.model');


router.get('/', async (req, res) => {
    //recuperamos todos los productos
    //find a secas recupera todos y devuelve una promesa
    try {
        const products = await product.find();
        //([])devuelve un array/(products) devuelve array de productos 
        res.json(products);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});

//get / api/products/disp

router.get('/available', async (req, res) => {
    try {
        const products = await product.find({ available: true });
        res.json(products);
    } catch (error) {
        res.json({ fatl: error.message });
    }

});

router.get('/cat/:category', async (req, res) => {

    const products = await product.find({ category: req.params.category });
    res.json(products);




});

router.get('/min/:price', async (req, res) => {
    const products = await product.find({
        price: { $gt: req.params.price }
        //$gt para que filtre por mayor que
    });
    res.json(products);
});

//get/api/products/min/:min/max/:max

router.get('/min/:min/max/:max', async (req, res) => {
    const { min, max } = req.params;
    const products = await product.find({
        price: {
            $gt: min,
            $lt: max
        }
    });
    res.json(products);
});

router.get('/stock/:stock', async (req, res) => {
    const { stock } = req.params;
    const products = await product.find({
        stock: { $gt: stock },
        available: true

    });
    res.json(products);

});

router.get('/:productId', async (req, res) => {
    const { productId } = req.params;
    const prod = await product.findById(productId);
    res.json(prod);

});

router.post('/', async (req, res) => {
    //insertamos datos en la base de mongo db
    const newProduct = await product.create(req.body);
    res.json(newProduct);

});

router.put('/:productId', async (req, res) => {
    const { productId } = req.params;
    const productEdit = await product.findByIdAndUpdate(productId, req.body, { new: true });
    res.json(productEdit);

});
//api/products/:products
//metodo findByIdAndDelete(id del producto)
router.delete('/:productId', async (req, res) => {
    const { productId } = req.params;
    const p = await product.findByIdAndDelete(productId);
    res.json(p);
});


module.exports = router;