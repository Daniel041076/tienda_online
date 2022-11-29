const { application } = require('express');
const mongoose = require('mongoose');
const request = require('supertest');

const app = require('../../app');
const { deleteMany } = require('../../models/product.model');
const product = require('../../models/product.model')

//desarrollamos pruebas
//dos metodos:
//describe: agrupa pruebas
//it : lanza la prueba
describe('Api de products', () => {
    //conectamos a la base de datos antes de hacer las prurbas

    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/tienda_online')
    });

    afterAll(async () => {
        await mongoose.disconnect();
    })




    describe('GET /api/products', () => {
        //se ejecuta antes de las pruebas
        let response;
        beforeAll(async () => {
            response = await request(app)
                .get('/api/products')
                .send();
        });

        it('deberia devolver status 200', () => {
            //le pasamos como parametro la app de express sobre la que hacemos la peticion
            //metodo get y ponemos la url sobre la que hacemos la peticion Get
            //despues la funcion send

            expect(response.statusCode).toBe(200);
            //devuelve 404 por que mo lo hemos declarado la ruta
        });

        it('deberia devolver la resp en format JSON', () => {
            //lanzo el get sobre api products
            //const response = await request(app)
            ///.get('/api/products')
            // .send();
            //aqui ponemos lo que queremos probar
            expect(response.headers['content-type'])
                .toContain('application/json')
        });

        it('deberia devovler un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });



    });

    describe('POST /api/products', () => {

        let response;
        const newProduct = { name: 'Producto de prueba', description: 'esto es una prueba', price: 100, category: 'test', available: true, stock: 10, image: 'url de la imagen' };
        beforeAll(async () => {
            response = await request(app)
                .post('/api/products')
                //como parametro se mandan los datos de la entidad que hemos solicitado(req.body)
                .send(newProduct);
        });

        afterAll(async () => {
            await product.deleteMany({ category: 'test' });
        })

        it('deberia existir la URL en la aplicacion', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto devuelto deberia tener _id', () => {
            expect(response.body._id).toBeDefined();
        });

        it('el nombre del producto se ha insertado correctamente', () => {
            expect(response.body.name).toBe(newProduct.name);
        });

    });

    describe('PUT /api/products/productId', () => {

        const newProduct = { name: 'Producto de prueba', description: 'esto es una prueba', price: 100, category: 'test', available: true, stock: 10, image: 'url de la imagen' };

        let productToEdit;
        let response;
        beforeAll(async () => {

            productToEdit = await product.create(newProduct);
            //lanzar la prueba
            response = await request(app)
                .put(`/api/products/${productToEdit._id}`)
                .send({ stock: 200, price: 199 });
        });

        afterAll(async () => {
            await product.findOneAndDelete(productToEdit._id);
        });

        it('deberia existir la URL en la aplicacion', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('Los datos deberian actualizarse', () => {
            console.log(response.body);
            expect(response.body.stock).toBe(200);
            expect(response.body.price).toBe(199);
        });



    });

    describe('DELETE /api/products/PRODUCTID', () => {

        const newProduct = { name: 'Producto de prueba', description: 'esto es una prueba', price: 100, category: 'test', available: true, stock: 10, image: 'url de la imagen' };

        let productToDelete;
        let response;

        beforeAll(async () => {
            productToDelete = await product.create(newProduct);
            response = await request(app)
                .delete(`/api/products/${productToDelete._id}`)
                .send();

        });


        afterAll(async () => {
            await product.findByIdAndDelete(productToDelete._id);
        });

        it('deberia existir la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('el producto deberia borrarse de la bd', async () => {
            const p = await product.findById(productToDelete._id);
            expect(p).toBeNull();
        })

    });





});
