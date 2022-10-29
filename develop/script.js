// Assignment code here
var charList = {  //charList hold valid characters of the 4 char types
  lower:"abcdefghijklmnopqrstuvwxyz",
  upper:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  number:"0123456789",
  special:`!"#$%&'()*+,-./:;<=>?@[\]^_{|}~` + "`" 
}

var reqLength = 0; //password length selected by user

var includeLower=false, //char types selected by user
    includeUpper=false,
    includeNum=false, 
    includeSpecial=false;

var passwordFlag = [0,0,0,0]; //identify if all selected char types are included in password

var getNextChar = [ //randomly generates a character 
  function lowerCase(){ //returns lowerCase char if selected by user and if index 0 is selected by function call. 
    if (includeLower) return charList.lower[Math.floor(Math.random()*charList.lower.length)]; 
    else return ""; //returns "" if not selected by user
  },
  function upperCase(){ //returns upperCase
    if (includeUpper) return charList.upper[Math.floor(Math.random()*charList.upper.length)];
    else return "";
  },
  function numberCase(){  //returns number
    if (includeNum) return charList.number[Math.floor(Math.random()*charList.number.length)];
    else return "";
  },
  function specialCase(){ //returns special char
    if (includeSpecial) return charList.special[Math.floor(Math.random()*charList.special.length)];
    else return "";
  }
]

function setFlag (checkChar){ //changes values of passwordFlag
  if (!includeLower) passwordFlag[0] = 1; //if char type not selected by user set to 1
  else if (charList.lower.includes(checkChar)) passwordFlag[0] = 1; //if selected and found in password set to 1
  
  if (!includeUpper) passwordFlag[1] = 1;
  else if (charList.upper.includes(checkChar)) passwordFlag[1] = 1;

  if (!includeNum) passwordFlag[2] = 1;
  else if (charList.number.includes(checkChar)) passwordFlag[2] = 1;

  if (!includeSpecial) passwordFlag[3] = 1;
  else if (charList.special.includes(checkChar)) passwordFlag[3] = 1;
}

function validCode(){ //password is valid if all char types selected by user appear in password  
  var isInclude =(element) => element == 1; //password is valid all values in passwordFlag are set to 1
  return passwordFlag.every(isInclude);
}

function generatePassword(){ //returns a password
  var password =""; //password being generated
  var nextChar="";  //next char added to password
  function atLeastOneCharType(){ //identify if at least one char type is selected  
    return (includeLower||includeUpper||includeNum||includeSpecial);
  }   
  function passwordLongEnough() { //identify if user inputted length is valid
    return (reqLength>=8 && reqLength<=128);  
  }
  while (!passwordLongEnough()){ //prompt and validate user input for length of password 
    reqLength = prompt("Enter length of password: between 8 and 128 characters");
    if (reqLength == null) return ""; //cancel prompt
  }
  while(!atLeastOneCharType()){ //prompts user to select char type
    includeLower = confirm("Include character type: lowercase");
    includeUpper = confirm("Include character type: uppercase");
    includeNum = confirm("Include character type: numerical");
    includeSpecial = confirm("Include character type: special");
    if(!atLeastOneCharType()) alert("Must select at least one character type"); //alert user if no char type is selected
  }
  while(password.length<reqLength){ //keep adding new characters to password until required length is met
    nextChar = getNextChar[Math.floor(Math.random() * getNextChar.length)](); //randomly chooses char type in getNextChar
    password = password.concat(nextChar); //append nextChar to password   
    setFlag(nextChar); //update passwordFlag
  }
  if (validCode()) return password; //returns password if code is valid
  else generatePassword();  //else call function again
}

function reset(){ //allows user to enter new password criteria
  includeLower = false;
  includeUpper = false;
  includeNum = false;
  includeSpecial = false;
  reqLength = 0;
  passwordFlag = [0,0,0,0];
  document.querySelector("#password").value = "";
}

function copy() { //copy password to clipboard
  var passwordText = document.querySelector("#password");
  passwordText.select();
  document.execCommand("copy");
}

// Get references to the #generate element
var generateBtn = document.querySelector("#generate");
var copyBtn = document.querySelector("#copy")
var resetBtn = document.querySelector("#reset");

// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}

// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);
copyBtn.addEventListener("click", copy);
resetBtn.addEventListener("click", reset);
