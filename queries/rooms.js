const  {sqlPool} = require('../db/connectDb')



class Rooms {

    static async getRoomById (id) {
        console.log('ROOMS ID', id)
        try {


            const room = await sqlPool.query('SELECT * FROM rooms WHERE room_id = $1', [id])

            if (!room.rows.length) {
                return {error: 'no data found in  rooms table', data: [], message: 'failed to retrieve data'}
            }

            return {error: null, data: room.rows, message: 'success'}

    }catch(e) {
            return {error: e.message, data: [], message: 'failed to retrieve data'}
        }

    }

    static async getAllRooms () {
        try {
            const rooms = await sqlPool.query('SELECT * FROM rooms')
            console.log("ALL dATA", rooms)
            if (!rooms.rows.length) {
                return {error: 'no data found in  rooms table', data: [], message: 'failed to retrieve data'}
            }
            return {error: null, data: rooms.rows, message: 'success'}

    }catch(e) {
            return {error: e.message, data: [], message:'an error occurred, could  not get room data'}
        }

    }

    static async createRoom (room_number, room_type, price, number_of_occupants, availability_status, image_url, description) {

        try {



            const newRoom = await sqlPool.query(`INSERT INTO rooms (room_number, room_type, price,availability_status, image_url, number_of_occupants, description) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *` , [room_number, room_type, price, availability_status,image_url, number_of_occupants, description])
            if (!newRoom.rows.length) {
                console.log('an error occurred creating rooms NOT withing CATCH block')
                return {error: 'no data found in  rooms table', data:[], message: 'failed to retrieve data'}
            }

            return {error: null, data: newRoom.rows, message: 'success'}
        }catch (e) {
            console.log("catch block  in controller",e.message)
            console.log('an error occurred creating rooms')
            if(e.message.includes('duplicate key value violates unique constraint')) {
                return  {error: `room_number must be unique`, data:null, message:'could  not insert into rooms table' }

            }
            return  {error: `an error has occurred ${e.message}`, data:null, message:'could  not insert into rooms table' }
        }

        }

        static async updateRoom (room) {

            try  {

            const {id, name, description, price, capacity, image_url} = room
            const updatedRoom = await sqlPool.query('UPDATE rooms SET name = $1, description = $2, price = $3, capacity = $4, image_url = $5 WHERE id = $6 RETURNING *', [name, description, price, capacity, image_url, id])

            if (!updatedRoom.rows.length) {
                return {error: `error has occurred`, data: null, message: 'could  not update'}
            }
                return {error: null,  data: updatedRoom.rows, message: 'success'}

            }catch (e) {
                return {error: `an error occurred ${e.message}`, data:null, message:'could not update room in rooms table' }
            }

        }
        static async deleteRoomById (id) {
        console.log("id in deleted function",id)
            try {


        const   deleteRoom = await sqlPool.query('DELETE  FROM rooms WHERE room_id = $1 RETURNING *;', [id])
            if(deleteRoom.rows.length === 0 || deleteRoom.rowCount === 0) {
             return  { error: `error has occurred`, data: null, message: 'no room found'}
             }
            console.log('from deleted table', deleteRoom.rows)
              return {error: null,  data: deleteRoom.rows, message: 'success'}

            }catch (e) {
            return {error: `an error occurred ${e.message}`, data:null, message:'could not delete room in rooms table' }
            }
        }
        static async allRooms () {
                    const rooms = await sqlPool.query('SELECT * FROM rooms')
            if (!rooms.rows.length || rooms.rowCount === 0) {
                return {error: `error has occurred`, data: null, message: 'could  not get rooms'}
            }
            else
                return {error: null,  data: rooms.rows, message: 'success'}

        }
        static async updateRoomById (id) {
            try{
            const updateRoom = await sqlPool.query('UPDATE rooms SET room_number = $1,room_type = $2, price = $3, availability_status = $4,image_url = $5, number_of_occupants = $6, description = $7 WHERE room_id = $6 RETURNING *;', [room_name, room_type, room_price, room_description, room_status, id])
            if (updateRoom.rows.length === 0 || updateRoom.rowCount === 0)
                return {error: `error has occurred`, data: null, message: 'no room found'}

            console.log('from updated table', updateRoom.rows)

        }catch (e) {
                return  {error:e.message , data: null, message: 'could not update room'}

            }
    }
}


module.exports = Rooms