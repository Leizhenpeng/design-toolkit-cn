

//生成一个随机数，返回随机数的前四位
function randomId() {
  return Math.random().toString(16).slice(2, 6);
}

function genRespEventName(eventName: string,id : string) {
  return `Res_${eventName}#${id}`
}




export const utils = {
    randomId,
    genRespEventName
}