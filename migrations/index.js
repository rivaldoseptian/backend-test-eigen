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



}

module.exports = DBVersionControl;
