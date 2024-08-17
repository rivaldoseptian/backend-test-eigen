const { book, member, borrow, sequelize } = require("../models");
const moment = require('moment')


class Borrow {
    static async BorrowBook(req, res, next) {
        try {
            const { body } = req
            const { brw_bok_code,  brw_mbr_code, brw_borrowdate} = body;

            if(!brw_bok_code) {
                throw { name: 'book required'}
            }

            if(!brw_mbr_code) {
                throw { name: 'member required'}
            }

            if(!brw_borrowdate) {
                throw { name: 'borrow date required'}
            }

            const bookexist = await book.findOne({
                where: { bok_code: brw_bok_code}
            })

            const memberexist = await member.findOne({
                where: { mbr_code : brw_mbr_code}
            })

            if(!bookexist){
                throw {name: 'Book Not found'}
            }

            if (bookexist.bok_stock === 0) {
                throw { name : 'Out of stock'}
            }

            if (!memberexist) {
                throw {name: 'Member Not found'}
            }

            if (memberexist.mbr_haspenalized) {
                const today = moment();
                const penalizedDate = moment(memberexist.mbr_haspenalized, 'YYYY-MM-DD');
        
                const daysSincepenalized = today.diff(penalizedDate, 'days');

                if (daysSincepenalized <= 3) {
                    throw { name : 'penalized'}
                }
            }

            const validateborrow = await borrow.findAll({
                where: {
                    brw_mbr_code,
                    brw_returndate: null
                }
            })

            if (validateborrow.length >= 2){
                throw { name: 'can not borrow'}
            }


            const borrowdata = {
                brw_bok_code,
                brw_mbr_code,
                brw_borrowdate
            }

            await borrow.create(borrowdata)
            await book.update ({ bok_stock: sequelize.literal('bok_stock - 1') }, { where: { bok_code : brw_bok_code }} )

          res.status(200).json({ msg : 'Succes Borrow Book'});
        } catch (error) {
            console.log(error)
          next(error);
        }
    }

    static async returnBook(req, res, next) {
        try {

            const { body } = req
            const { brw_bok_code,  brw_mbr_code, brw_returndate} = body;

            if(!brw_bok_code) {
                throw { name: 'book required'}
            }

            if(!brw_mbr_code) {
                throw { name: 'member required'}
            }

            if(!brw_returndate) {
                throw { name: 'return date required'}
            }

            const borrowexist = await borrow.findOne({
                where: {
                    brw_mbr_code,
                    brw_bok_code,
                    brw_returndate: null
                }
            }) 

            if(!borrowexist) {
                throw { name: 'Members not borrow the book'}
            }


            const bookexist = await book.findOne({
                where: { bok_code: brw_bok_code}
            })

            const memberexist = await member.findOne({
                where: { mbr_code : brw_mbr_code}
            })

            if(!bookexist){
                throw {name: 'Book Not found'}
            }

            if (!memberexist) {
                throw {name: 'Member Not found'}
            }


            const dayborrow = moment(borrowexist.brw_borrowdate, 'YYYY-MM-DD');
            const dayreturn = moment(brw_returndate, 'YYYY-MM-DD');

            const daysDiff = dayreturn.diff(dayborrow, 'days');

            await book.update ({ bok_stock: sequelize.literal('bok_stock + 1') }, { where: { bok_code : brw_bok_code }} )
            await borrow.update ({ brw_returndate }, { where: { brw_bok_code, brw_mbr_code, brw_returndate: null}} )

            if (daysDiff > 7) {
                await member.update(
                    { mbr_haspenalized: moment().format('YYYY-MM-DD') },
                    { where: { mbr_code: brw_mbr_code } }
                  );
            }
           
          res.status(200).json({ msg: 'Succes Return Book'});
        } catch (error) {
            console.log(error, "==================")
          next(error);
        }
    }
    

}

module.exports = Borrow