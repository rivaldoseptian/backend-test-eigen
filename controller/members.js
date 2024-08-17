const { member, borrow, sequelize } = require("../models");


class Member {
    static async listMembers(req, res, next) {
        try {
            const listmembers = await member.findAll({
                include: [
                    {
                        model: borrow,
                        as: "borrow",
                        attributes:[
                            'brw_bok_code'
                        ],
                        where: {
                            brw_returndate: null
                        },
                        required: false,
                    }
                ],
            });

            const listPlain = listmembers.map((item)=> item.get({ plain: true }))
            const result = listPlain.map((item) => {
                return {
                    ...item,
                    total_book: item.borrow.length
                }
            })


          res.status(200).json(result);
        } catch (error) {
            console.log(error)
          next(error);
        }
    }

}


module.exports = Member