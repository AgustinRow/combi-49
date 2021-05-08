const model = require("../lib/models");
const Op = require("sequelize").Op;

const listCities = async (req, res) => {
  model.Ciudad.findAll().then((response) => {
    try {
      res.status(200).json({ data: response });
    } catch (err) {
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

const create= async(req, res)=>{
    
}

module.exports = {
  listCities,
};
