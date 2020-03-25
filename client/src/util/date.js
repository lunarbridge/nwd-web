export const humanDate = (rawDate) => {
  const d = new Date(Number(rawDate));
  const pad2 = (n) => { return n < 10 ? '0' + n : n }
  
  return(
    d.getFullYear().toString() + "." 
    + pad2(d.getMonth() + 1) + "."
    + pad2(d.getDate()) + " "
    + pad2(d.getHours()) + ":"
    + pad2(d.getMinutes()) + ":"
    + pad2(d.getSeconds())
  )
}

export const cytomineCurrentTime = () => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const currentTime = new Date();

  let day = currentTime.getDate();
  if (day.toString().length < 2)
    day = '0' + day;

  let hours = currentTime.getHours();
  if (hours.toString().length < 2)
    hours = '0' + hours;

  let minutes = currentTime.getMinutes();
  if (minutes.toString().length < 2)
    minutes = '0' + minutes;

  let seconds = currentTime.getSeconds();
  if (seconds.toString().length < 2)
    seconds = '0' + seconds;

  return days[currentTime.getDay()] + ", " 
    + day + " " 
    + months[currentTime.getMonth()] + " " 
    + currentTime.getFullYear() + " " 
    + hours + ":" + minutes + ":" + seconds + " +0000";
}