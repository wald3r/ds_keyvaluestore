function makePayload(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


function formatTime(timestamp){


  var dateobject = new Date(timestamp)
  var datestring = `${dateobject.getFullYear()}-${dateobject.getMonth()}-${dateobject.getDay()} ${dateobject.getHours()}:${dateobject.getMinutes()}:${dateobject.getSeconds()}:${dateobject.getMilliseconds()}`
  return datestring
}


export default { makePayload, formatTime } 