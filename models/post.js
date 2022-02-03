let db = require('../db');

module.exports = {
    /**
     * 
     * @param {Object} post 
     * @returns {Promise<Number|false>} Returns id of new post
     */
    add: async function(post) {
        try {
            let sql = `insert into posts (title, description, author) values(?, ?, ?)`;
            let values = [post.title, post.description, post.author];
            let [result] = await db.getConnection().execute(sql, values);
            return result.insertId;
        }
        catch(err) {
            console.log(err);
            return false;
        }
    },
    /**
     * 
     * @param {Object} post 
     * @param {String|Number} id 
     * @returns {Promise<true|false>}
     */
    updateById: async function(post, id) {
        try {
            let updateClause = Object.keys(post).map((element) => { return element + '=?'; }).join(',');
            let values = Object.values(post);
            values.push(id);
            let sql = `update posts set ${updateClause} where id = ?`;
            let [result] = await db.getConnection().execute(sql, values);
            return true;
        }
        catch(err) {
            console.log(err);
            return false;
        }
    },
    /**
     * 
     * @param {String|Number} id 
     * @returns {Promise<true|false>}
     */
    deleteById: async function(id) {
        try {
            let sql = `delete from posts where id = ?`;
            let values = [id];
            let [result] = await db.getConnection().execute(sql, values);
            return true;
        }
        catch(err) {
            console.log(err);
            return false;
        }
    },
    /**
     * Returns all posts
     * @returns {Promise<Array<Object>>}
     */
    getAll: async function() {
        try {
            let sql = `select * from posts`;
            let [rows] = await db.getConnection().execute(sql);
            return rows;
        }
        catch(err) {
            console.log(err);
            return [];
        }
    },
    /**
     * Returns all posts for an author
     * @param {String} author
     * @returns {Promise<Array<Object>>}
     */
    getByAuthor: async function(author) {
        try {
            let sql = `select * from posts where author = ?`;
            let values = [author];
            let [rows] = await db.getConnection().execute(sql, values);
            return rows;
        }
        catch(err) {
            console.log(err);
            return [];
        }
    }
}