import xlsx from 'node-xlsx'
import fs from 'fs'
import { knex } from '../knex/mysql'
import { returnClientResponse } from '../common/returnClientResponse'

const dataExport = async (req, res) => {
  const allUser = await knex('users').whereNull('deleted_at')

  const data = ['手机号', '创建时间', '更新时间']
  let result = []
  result.push(data)

  for (let i = 0; i < allUser.length; i++) {
    let user = [allUser[i].phone, allUser[i].created_at, allUser[i].updated_at]
    result.push(user)
  }

  const buffer = xlsx.build([{name: 'mySheetName', data: result}])
  fs.writeFileSync('users.xlsx', buffer, 'binary')

  res.json(returnClientResponse('用户信息导出成功', 1, result))
}

export {
  dataExport
}
