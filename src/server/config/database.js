const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
    'pilahcerdas_db',        
    'root',                  
    '',                      
    {
        host: 'localhost',   
        dialect: 'mysql',   
        logging: false,      
        pool: {
            max: 5,
            min: 0,
            acquire: 30000,
            idle: 10000
        },
        timezone: '+07:00'
    }
);

async function testDbConnection() {
    try {
        await sequelize.authenticate();
        console.log('Koneksi ke database MySQL berhasil.');
    } catch (error) {
        console.error('Gagal terhubung ke database MySQL:', error);
        process.exit(1);
    }
}

testDbConnection();

module.exports = sequelize;