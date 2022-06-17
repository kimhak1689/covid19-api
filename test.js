var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1; //months from 1-12
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
let minutes = dateObj.getMinutes();
let hours= dateObj.getHours();
console.log(hours);