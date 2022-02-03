let db = require('../db');

module.exports = {
    /**
     * Adds a new author if not exits already
     * @param {String} author 
     * @returns {Promise<Number|false>} Promise object which resolves author id if inserted else resolve to false
     */
    add: async function(author) {
        try {
            let sql = `insert ignore into authors (email) values(?)`;
            let values = [author.email];
            // Ignoring if author alreadys exists, prevented duplication from unique index
            let [result] = await db.getConnection().execute(sql, values);
            return result.insertId;
        }
        catch(err) {
            console.log(err);
            return false;
        }
    },
    /**
     * Returns array of all the authors
     * @returns {Promise<Array<object>}
     */
    getAll: async function() {
        try {
            let sql = `select * from authors`;
            let [result] = await db.getConnection().execute(sql);
            return result;
        }
        catch(err) {
            console.log(err);
            return [];
        }
    }
}