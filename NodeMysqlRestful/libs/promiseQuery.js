import mysql from 'promise-mysql';
import bluebird from 'bluebird';
import { db } from '../config';

const pool = mysql.createPool({
    host     : db.database.HOST,
    user     : db.database.USERNAME,
    password : db.database.PASSWORD,
    database : db.database.DATABASE,
    port     : db.database.PORT,
    connectionLimit: 10
});

const getSqlConnection = () => {
    return pool.getConnection().disposer((connection) => {
        pool.releaseConnection(connection);
    });
}


let query = (sql,value) => {

    return new Promise(( resolve, reject ) => {

        bluebird.using(getSqlConnection(), (connection) => {
            return connection.query(sql,value).then((rows) => {
                resolve(rows);
            }).catch((err) => {
                reject(err);
            });
        })

    })

}

export {
    query
}
