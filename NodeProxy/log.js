import util from 'util';

/** 打印日志 */
const log = (...args) => {
  const time = new Date().toLocaleString();
  console.log(time, util.format(...args));
};

export default log;
