const Joi = require("joi");
const Employee = require("../Models/Employee");
const Sequelize = require('sequelize');
const Op = Sequelize.Op;


function validateEmployee(employee) {
    const schema = Joi.object({
        lastName: Joi.string()
            .max(30)
            .required()
            .messages({
                'string.max': 'Le nom ne peut pas dépasser {#limit} caractères',
                'any.required': 'Le nom est obligatoire'
            }),

        firstName: Joi.string()
            .max(30)
            .required()
            .messages({
                'string.max': 'Le prénom ne peut pas dépasser {#limit} caractères',
                'any.required': 'Le prénom est obligatoire'
            }),

        department: Joi.string()
            .max(30)
            .required()
            .messages({
                'string.max': 'Le department ne peut pas dépasser {#limit} caractères',
                'any.required': 'Le department est obligatoire'
            }),
    });

    return schema.validate(employee);
}

async function addEmployee(req, res) {
    const { lastName, firstName, department } = req.body;

    // Check if the inputs are valid 
    const { error } = validateEmployee(req.body);
    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }
    try {
        // Check if an employee already exists
        const existingEmployee = await Employee.findOne({
            where: {
                lastName,
                firstName,
            },
        });

        if (existingEmployee) {
            return res.status(404).json({message: "Employee exist Déja"});
        }

        // Create a new employee if not found
        const employee = await Employee.create({
            lastName,
            firstName,
            department,
        });

        res.status(200).json(employee);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout : " + error.message });
    }
}

async function getAllEmployee(req, res) {
    const { creationDate } = req.query;
    try {
        let employees;
        if (creationDate) {
            employees = await Employee.findAll({
                where: {
                    dateCreated: {
                        [Op.gte]: Sequelize.literal(`DATE('${creationDate}')`),
                        [Op.lt]: Sequelize.literal(`DATE_ADD('${creationDate}', INTERVAL 1 DAY)`),
                    },
                },
            });
        } else {
            employees = await Employee.findAll();
        }

        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout : " + error.message });
    }
}

module.exports = {
    addEmployee,
    getAllEmployee,
};