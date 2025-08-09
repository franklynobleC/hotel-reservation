const { dbPool, sqlPool} = require('../db/connectDb')



class  Auth {
    static async isEmailExist  (email) {
        const  isEmailExist = await sqlPool.query('SELECT * FROM users WHERE email = $1', [email]   )

        if(isEmailExist.rows.length > 0) {

            return {error: 'duplicate', data:isEmailExist.rows, message:'please enter another another email'}
        }
        return {error: 'available', message: 'email is available',data: isEmailExist.rows}

    }

     static async  createUser(name, email, hashedPassword) {
         if (!name || !email || !hashedPassword) {
             return { error: 'Name, email, and password are required', message: null, data: null };
         }

         //CHECK  IF  EMAIL ALREADY EXIST

         try {

             const user=  await sqlPool.query(
                 `INSERT INTO users (name, email, password)
     VALUES ($1 ,$2, $3)
            RETURNING *;`, [name,email,hashedPassword]
                 // Parameters passed separately
             );

            return {error: null, message: 'success', data: user.rows[0]}

        } catch (e) {
            return {error: `an error occurreds,could not perform insert ${e.message}`, message:'duplicate key', data:null }
        }

    }


    //TODO: REFACTOR CODE AND KEEP ERROR MESSAGES IN A SEPARATE FILE
    static login = async (email, password) => {
        const userExist = await sqlPool.query(`SELECT email, password WHERE email='${email}',password='${password}'`)
        if (!userExist) {
            return {error: 'error', message: `no user found in user's table`, userExist: null}
        }
        if (userExist) {
            return {error: null, message: 'success', data: userExist}
        }

        return {error: null, message: 'success', data: userExist}
    }
}

module.exports = Auth