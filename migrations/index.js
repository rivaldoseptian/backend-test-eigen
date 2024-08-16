const { rawQuery } = require('../models');
class DBVersionControl {
    static async migrate(DB_VERSION) {
        try {
            if (DB_VERSION === 0) {
                await this.createSetting();
                await this.inisialDBVersion();
                DB_VERSION++;
                await this.setDBVersion(DB_VERSION);
            }

            if (DB_VERSION === 1) {
                await this.createBook();
                DB_VERSION++;
                await this.setDBVersion(DB_VERSION);
            }

            if (DB_VERSION === 2) {
                await this.insertBook();
                DB_VERSION++;
                await this.setDBVersion(DB_VERSION);
            }

            if (DB_VERSION === 3) {
                await this.createMember();
                DB_VERSION++;
                await this.setDBVersion(DB_VERSION);
            }

            if (DB_VERSION === 4) {
                await this.createBorrow();
                DB_VERSION++;
                await this.setDBVersion(DB_VERSION);
            }

            if (DB_VERSION === 5) {
                await this.insertMember();
                DB_VERSION++;
                await this.setDBVersion(DB_VERSION);
            }


            await this.setDBVersion(DB_VERSION);
        } catch (error) {
            throw new Error(`[Error] : Failed to process auto revision database on version ${DB_VERSION} [Detail Error] : ${error}`);
        }
    }

    static async createSetting() {
        try {
            let sql = `DROP TABLE IF EXISTS setting`;
            await rawQuery(sql);

            sql = `CREATE TABLE setting(
                set_id CHAR(3) NOT NULL,
                set_seq INT NOT NULL,
                set_int1 INT NOT NULL DEFAULT 0,
                PRIMARY KEY(set_id, set_seq)
            )`;
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async inisialDBVersion() {
        try {
            const sql = `INSERT INTO setting(set_id, set_seq, set_int1) 
                        VALUES('ver', 1, 0)`;
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async setDBVersion(ver) {
        try {
            const sql = `UPDATE setting SET set_int1 = ${ver} 
                        WHERE set_id = 'ver' AND set_seq = 1`;
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

    static getDBVersion() {
        return new Promise(async (resolve, reject) => {
            try {
                let sql = `SHOW TABLES LIKE 'setting'`;
                let [result, metadata] = await rawQuery(sql);

                if (metadata.length > 0) {
                    sql = `SELECT set_id, set_seq, set_int1 
                            FROM setting
                            WHERE set_id = 'ver'
                            AND set_seq = 1`;
                    result = await rawQuery(sql, 'SELECT');

                    if (result.length > 0) {
                        resolve(result[0].set_int1);
                    } else {
                        resolve(0);
                    }
                } else {
                    resolve(0);
                }
            } catch (error) {
                reject(error);
            }
        });
    }

    static async createBook() {
        try {
            let sql = `DROP TABLE IF EXISTS book`;
            await rawQuery(sql);

            sql = `CREATE TABLE book(
                bok_code VARCHAR(10) NOT NULL,
                bok_title VARCHAR(100) NOT NULL,
                bok_author VARCHAR(100) NOT NULL,
                bok_stock INTEGER NOT NULL DEFAULT 0, 
                PRIMARY KEY(bok_code)
            )`
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async insertBook() {
        try {
            const sql = `
                INSERT INTO book (bok_code, bok_title, bok_author, bok_stock)
                VALUES 
                    ('JK-45', 'Harry Potter', 'J.K Rowling', 1),
                    ('SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1),
                    ('TW-11', 'Twilight', 'Stephenie Meyer', 1),
                    ('HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1),
                    ('NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1);
            `
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createMember(){
        try {
            let sql = `DROP TABLE IF EXISTS member`;
            await rawQuery(sql);

            sql = `CREATE TABLE member(
                mbr_code CHAR(4) NOT NULL,
                mbr_name VARCHAR(100) NOT NULL,
                mbr_haspenalized DATE,
                PRIMARY KEY(mbr_code)
            )`
            await rawQuery(sql);
        } catch (error) {
            await rawQuery(sql);
        }
    }

    static async insertMember() {
        try {
            const sql = `
            INSERT INTO member (mbr_code, mbr_name, mbr_haspenalized)
            VALUES 
                ('M001', 'Angga', NULL),
                ('M002', 'Ferry', NULL),
                ('M003', 'Putri', NULL);
            `
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

    static async createBorrow() {
        try {
            let sql = `DROP TABLE IF EXISTS borrow`;
            await rawQuery(sql);

            sql = `CREATE TABLE borrow(
                brw_id INTEGER NOT NULL AUTO_INCREMENT,
                brw_bok_code VARCHAR(10) NOT NULL,
                brw_mbr_code CHAR(4) NOT NULL,
                brw_borrowdate DATE,
                brw_returndate DATE,
                PRIMARY KEY(brw_id)
            )`
            await rawQuery(sql);
        } catch (error) {
            throw new Error(error);
        }
    }

}

module.exports = DBVersionControl;
