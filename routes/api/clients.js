const router = require('express').Router();

const client = require('../../models/client.model');

router.get('/', async (req, res) => {
    //recuperamos todos los clientes
    //find a secas recupera todos y devuelve una promesa
    try {
        const clients = await client.find().populate('products');
        //([])devuelve un array/(clients) devuelve array de clients
        res.json(clients);
    } catch (error) {
        res.json({ fatal: error.message });
    }

});



router.get('/:clientId/product/:productoId', async (req, res) => {
    //extraemos el req.params
    const { clientId, productId } = req.params;
    //recuperamos cliente
    const clientFound = await client.findById(clientId);
    //agrego producto al cliente
    clientFound.products.push(productId);
    //Guardo el cliente
    //actualiza la base de datos
    await clientFound.save();

    res.json({ message: 'producto agregado' });
});

router.post('/', async (req, res) => {
    try {
        const newClient = await client.create(req.body);
        res.json(newClient);
    } catch (error) {
        res.json({ fatal: error.message });
    }


});

router.put('/:clientId', async (req, res) => {
    const { clientId } = req.params;
    try {
        const clientEdit = await client.findByIdAndUpdate(clientId, req.body, { new: true });
        res.json(clientEdit);
    } catch (error) {
        res.json({ fatal: error.message });
    }


});

router.delete('/:clientId', async (req, res) => {
    try {
        const { clientId } = req.params;
        const deleteclient = await client.findByIdAndDelete(clientId);
        res.json(deleteclient);
    } catch (error) {
        res.json({ fatal: error.message })
    }

});



module.exports = router;