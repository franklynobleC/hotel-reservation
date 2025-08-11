const {sqlPool} = require("../db/connectDb");

class Reservations {
	static async createReservations(reservations) {
		let ReservationsData ={
			userId: reservations.userId,
			roomsId: reservations.roomId,
			check_in_date: reservations.check_in_date,
			check_out_date: reservations.check_out_date,

		}
	}
	static async getSingleReservations(id) {
		             try {
			             const reservation = sqlPool.query(`SELECT * FROM reservations WHERE id = ${id}`)
			             if(reservation.rowCount === 0) {
				             return {error: 'no data found in  reservations table', data: [], message: 'failed to retrieve data'}
			             }
			             return {error: null, data: reservation.rows, message: 'success'}

		             }catch (e) {
						 return{error: e.message, data: [], message: 'failed to retrieve data'}
		             }
	}
	static async allReservations() {
		const   reservations = sqlPool.query('SELECT * FROM reservations')
		try {
			if(reservations.rowCount === 0 || reservations.rows === 0) {
				return {error: 'no data found in  reservations table', data: [], message: 'failed to retrieve data'}
			}
			return {error: null, data: reservations.rows, message: 'success'}
		}catch (e) {
			return {error: e.message, data: [], message: 'an error occurred, could  not get reservation data'}
			}

		}
		static async updateReservationById(reservations) {

				try {
			const updateReservation = await sqlPool.query(`UPDATE reservations SET user_id = $reservations.userId, room_id = $reservations.roomId, check_in_date = $reservations.check_in_date, check_out_date = $reservations.check_out_date, status = ${reservations.status} WHERE id = $reservations.id`)
			return {error: null, data: updateReservation.rows, message: 'success'}
		}catch (e) {
					return {error: e.message, data: [], message: 'an error occurred, could  not update reservation data'}
                }

        }
        static async deleteReservationById(id) {
                try {
            const deleteReservation = await sqlPool.query(`DELETE FROM reservations WHERE id = $id`, [id])
	                if(deleteReservation.rowCount === 0) {
		                return {error: 'could  not Delete Data', data:null, message: 'no data found with that id'}

	                }
            return {error: null, data: deleteReservation.rows, message: 'success'}
        }catch (e) {
                    return {error: e.message, data: [], message: 'an error occurred, could  not delete reservation data'}

				}
		}

}

module.exports = Reservations