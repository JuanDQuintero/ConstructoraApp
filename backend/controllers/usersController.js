// Defines the methods for usersController
// ============================================================================
const db = require("../models");

module.exports = {
    signUp: (req, res) => {
        res.json("signup")
    },
    signIn: (req, res) => {
        res.json("signin")
    },
};