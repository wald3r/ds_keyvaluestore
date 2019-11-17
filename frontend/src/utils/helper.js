
//create a random payload
function makePayload(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
     result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}


//format the time to display it in a readable way
function formatTime(timestamp){
  var dateobject = new Date(timestamp)
  var datestring = `${dateobject.getFullYear()}-${dateobject.getMonth()}-${dateobject.getDay()} ${dateobject.getHours()}:${dateobject.getMinutes()}:${dateobject.getSeconds()}.${dateobject.getMilliseconds()}`
  return datestring
}


export default { makePayload, formatTime } 