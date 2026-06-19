const express = require('express'); 
const cors = require('cors'); 
const sequelize = require('./config/database'); 

// === Configuración de Swagger ===
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./docs/swagger.yaml');

var app = express(); 
 
//middlewares 
app.use(express.json()); 
app.use(cors({origin: 'http://localhost:4200'})); 
 
// Interfaz de Swagger expuesta en la raíz /api-docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Cargamos el modulo de direccionamiento de rutas 
// P1 Socios
app.use('/api/socio', require('./src/routes/p1/socio.route'));
app.use('/api/local', require('./src/routes/p1/local.route'))
// P2 Transacciones
app.use('/api/transaccion', require('./src/routes/p2/transaccion.route'));

//P3 Empleados y Publicaciones
app.use('/api/empleado', require('./src/routes/p3/empleado.route'));
app.use('/api/publicacion', require('./src/routes/p3/publicacion.route'));
 
//setting 
app.set('port', process.env.PORT || 3000); 
 
// Sincronizar Base de Datos y arrancar el servidor 
sequelize.sync({ force: false, alter: true})
    .then(() => {
        console.log('Tablas de PostgreSQL sincronizadas');
        app.listen(app.get('port'), () => {
            console.log(`Servidor corriendo en http://localhost:${app.get('port')}`);
            console.log(`Documentación interactiva Swagger: http://localhost:${app.get('port')}/api-docs`);
            console.log(`Socios: http://localhost:${app.get('port')}/api/socio`);
            console.log(`Transacciones: http://localhost:${app.get('port')}/api/transaccion`);
            console.log(`Empleados: http://localhost:${app.get('port')}/api/empleado`);
            console.log(`Publicaciones: http://localhost:${app.get('port')}/api/publicacion`);
        });
    })
    .catch(err => {
        console.error('Error al sincronizar: ', err);
    });