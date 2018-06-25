module.exports = function() {
    this.dbConnections = [];

    this.dbConnections["demoUser"] = {
        host: process.env.EndPoint_rdsDemoUser,
        port: process.env.Port_rdsDemoUser,
        user: process.env.User_rdsDemoUser,
        password: process.env.Password_rdsDemoUser,
        database: "demoUser"
    };
};