const express = require("express");
const dotenv = require("dotenv");
const app = express();
const listEndpoints = require('express-list-endpoints');
//const bodyParser = require('body-parser');
dotenv.config();

//import Models
const Employee = require('./Models/Employee');
const Presence = require('./Models/Presence');

/* Association */
/* ---Employee-Presence--- */ 
Employee.hasMany(Presence, { 
  onDelete: 'NO ACTION', 
  onUpdate: 'CASCADE',
  hooks: true ,
  foreignKey: 'IdEmployee'
});
Presence.belongsTo(Employee, {
  foreignKey: 'IdEmployee'
})

//import Routes
const EmployeeRoutes=require("./Routes/EmployeeRoutes");
const PresenceRoutes=require("./Routes/PresenceRoutes");

app.use(express.json());

app.use("/yassir/employee", EmployeeRoutes);
app.use("/yassir/presence", PresenceRoutes);

const port = process.env.PORT || 8080
console.log(listEndpoints(app)); 
app.listen(port, () => {
    console.log(`listening at port ${port}`)
});