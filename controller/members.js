const { member } = require("../models");


class Member {
    static async listMembers(req, res, next) {
        try {
            const listmembers = await member.findAll();


          res.status(200).json(listmembers);
        } catch (error) {
          next(error);
        }
    }

}


module.exports = Member