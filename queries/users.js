const {sqlPool} = require("../db/connectDb");

class Users {

    static async allUsers() {
        const users = await sqlPool.query('SELECT * FROM users;')
        console.log(users.rows)
        if(users.length < 0) {
            console.log('user Data Table')
            return {error: 'no user found  in users table', data:null}

        }
        if(users.length >0) {
            return {error: null, message:'success', data:users.rows}

        }
        return {error: null, message:'success', data: users.rows}

    }
    static async getUserById(id) {
    const  userID = await sqlPool.query( `SELECT * FROM users WHERE id='${id}'`)
      if(!userID.rows.length) {
    return {error: `no user with id '${userID}'`, data:userID}
      }
      return {
          error:null,  data:userID, message:'success'}
      }
      static  async deleteUserById (id) {
        const  deleteUser = await sqlPool.query(`DELETE FROM users WHERE id='${id}'`)
          if(!deleteUser.rows.length) {
              return {error: `no user with id '${id}'`, data: deleteUser.rows}
          }
          return {error:null,  data:deleteUser.rows, message:'success'}

      }

}

module.exports = Users