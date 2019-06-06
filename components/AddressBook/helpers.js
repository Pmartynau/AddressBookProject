//TAKES UPPERCASE CITY STRING FROM DATABASE, RETURNS STRING WITH ONLY FIRST LETTER CAPITALIZED
function cityHelper(city) {
    let lowercase = city.toLowerCase();
    return lowercase.charAt(0).toUpperCase() + lowercase.slice(1);
  }
  
  //TAKES PHONE NUMBER FROM DATABASE, RETURNS NUMBER WITH DASHES
  function phoneHelper(phoneNumber) {
    let numArray = phoneNumber.split('');
    numArray.splice(3, 0, '-');
    numArray.splice(7, 0, '-');
    return numArray.join('');
  }
  
  export { cityHelper, phoneHelper };