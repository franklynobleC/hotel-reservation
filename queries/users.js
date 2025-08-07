const {sqlPool} = require("../db/connectDb");

class Users {

    static async allUsers() {
        const users = await sqlPool.query('SELECT * FROM users;')
        console.log(users.rows)
        if(users.length < 0 || users.rowCount === 0) {
            console.log('user Data Table')
            return {error: 'no user found  in users table', data:null}

        }
        if(users.rows >0) {
            return {error: null, message:'success', data:users.rows}

        }
        return {error: null, message:'success', data: users.rows}

    }
    static async getUserById(id) {
        console.log('from single User', id)
    const  singleUser = await sqlPool.query( `SELECT * FROM users WHERE user_id='${id}'`)
      if(!singleUser.rows.length || singleUser.rowCount === 0) {
    return {error: `no user with id '${singleUser}'`, data:null}
      }
      return {
          error:null,  data:singleUser.rows, message:'success'}
      }
      static  async deleteUserById (id) {

        const  deleteUser = await sqlPool.query(`DELETE FROM users WHERE user_id='${id}'
    RETURNING *;
`)

          if(deleteUser.rowCount ===0) {

         return {error: `no user with id '${id}'`, data: deleteUser.rows}
          }
          return {error:null,  data:deleteUser.rows, message:'success'}

      }

}

module.exports = Users