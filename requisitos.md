# Recuperar todos los productos

- URL: GET /api/products
   - Responder con status 200(esta ok)
   - Respuesta debe tener foemato JSON(si no, esta mal)
   - Respuesta debe ser un array de productos

# crear un producto
 - URL: POST api/products
   - Responde con status 200
   - Respuesta en formaato jason
   - comprobar si _id
   -Comprobar si producto en BD tiene el mismo nombre con el que le damos de alta

# Actualizar producto
- Objetivo: lanzar peticion pasandole el ID del producto a editar

  - Previo : crear objet

  - crear la URL /api/products/:productId
  - metodo findByIdAndUpdate
  - de donde saco el Id
  - de donde saco el objeto a editar
  - responder con un json con lo que devuelva el metodo anterior
  - la última prueba falla

# CLIENTES
- creacion del modelo client(client.model.js)
    -name, email, address, age, (Number),active (Boolean)
- rutas para el manejo de clients
    -GET /api/clients - find
    - POST /api/clients -create
    - PUT /api/clients/:clientId -findByIdAndUpdate
    - DELETE /api/clients/:clientId - findByIdAndDelete

# conectar
 - api.js con fichero clients.js
 - pruebas a traves de peticiones.rest
     


     