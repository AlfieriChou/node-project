import mysql from 'mysql';
import { db } from '../config'

const pool  = mysql.createPool({
    host     : db.database.HOST,
    user     : db.database.USERNAME,
    password : db.database.PASSWORD,
    database : db.database.DATABASE,
    port     : db.database.PORT
});

let query = ( sql, values ) => {

    return new Promise(( resolve, reject ) => {
        pool.getConnection( (err, connection) => {
            if (err) {
                reject( err )
            } else {
                connection.query(sql, values, ( err, rows) => {
                    if ( err ) {
                        reject( err )
                    } else {
                        resolve( rows )
                    }
                    connection.release()
                })
            }
        })
    })

}

export {
    query
}
