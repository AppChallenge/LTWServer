module.exports = {
  pretzeldb: {
  	name: "pretzeldb",
    connector: 'mysql',
    hostname: process.env.MYSQL_PORT_3306_TCP_ADDR || "localhost" ,
    port: 3306,
    user: process.env.MYSQL_USERNAME || "root",
    password: process.env.MYSQL_PASSWORD || "test123",
    database: process.env.MYSQL_INSTANCE_NAME || "pretzeldb"
  }
};


