const knex = require('../../databases');
const Validator = require('fastest-validator');

const v = new Validator();

module.exports = {
    createFood: async (req, res) => {
        try {
            const { name, price, count, description } = req.body;
            const schema = {
                name: { type: "string", min: 3, max: 255, nullable: false },
                // price: { type: "number", nullable: false },
                // count: { type: "number", nullable: false },
                description: { type: "string", min: 3, max: 255, nullable: false },
                // image: { type: "string", min: 3, max: 255, nullable: false }
            }
            const validate = v.validate(req.body, schema);
            if (validate.length) return res.status(400).json({ status: "error validation", message: validate });
            await knex('foods').insert({
                name,
                price,
                count,
                description,
                image: req.file.filename,
                user_id: req.user.id
            });
            res.status(201).json({
                status: "success",
                message: "Food created successfully"
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    getsFood: async (req, res) => {
        try {
            const foods = await knex({f: 'foods'}).join({u: 'users'}, 'f.user_id', 'u.id');
            if (foods.length === 0) return res.status(404).json({ status: "error", message: "Food not found" });
            res.status(200).json({
                status: "success",
                data: foods
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    myFood: async (req, res) => {
        try {
            const foods = await knex('foods').where({ user_id: req.user.id });
            if (foods.length === 0) return res.status(404).json({ status: "error", message: "Food not found" });
            res.status(200).json({
                status: "success",
                data: foods
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    getFood: async (req, res) => {
        try {
            const { id } = req.params;
            const food = await knex('foods').where({ id }).first();
            if (!food) return res.status(404).json({ status: "error", message: "Food not found" });
            res.status(200).json({
                status: "success",
                data: food
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    },
    updateFood: async (req, res) => {
        try {
            const id = req.params.id;
            const { name, price, count, description } = req.body;
            const schema = {
                name: { type: "string", min: 3, max: 255, nullable: false },
                // price: { type: "number", nullable: false },
                // count: { type: "number", nullable: false },
                description: { type: "string", min: 3, max: 255, nullable: false },
                // image: { type: "string", min: 3, max: 255, nullable: false }
            }
            const validate = v.validate(req.body, schema);
            if (validate.length) return res.status(400).json({ status: "error validation", message: validate });
            const foods = await knex('foods').where({ id }).update({
                name,
                price,
                count,
                description,
                image: req.file.filename,
            });
            if (foods === 0) return res.status(404).json({ status: "error", message: "Food not found" });
            res.status(200).json({
                status: "success",
                message: "Food updated successfully"
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            })
        }
    },
    deleteFood: async (req, res) => {
        try {
            const { id } = req.params;
            await knex('foods').where({ id }).del();
            res.status(200).json({
                status: "success",
                message: "Food deleted successfully"
            });
        } catch (error) {
            res.status(500).json({
                status: "error",
                message: error.message
            });
        }
    }
}