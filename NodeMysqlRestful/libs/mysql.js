import { query } from './query';

let insertUser = (value) => {

    let sql = 'insert into user set ?;';
    return query( sql, value )

}

let searchUser = (value) => {

    let sql = 'select * from user where phone = ?;';
    return query( sql, value )

}

let searchUserId = (value) => {

    let sql = 'select * from user where _id = ?;';
    return query( sql, value )

}

let updateUser = (value) => {

    let sql ='update user set password = ? where _id = ?';
    return query( sql, value )

}

export {
    insertUser,
    searchUser,
    searchUserId,
    updateUser
}
