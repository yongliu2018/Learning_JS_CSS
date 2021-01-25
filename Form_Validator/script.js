const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

//Show input error message
function showError(input, message){
  const formControl = input.parentElement;
  formControl.className='form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}

//Show success outline
function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className='form-control success';
}


//check if email valid, search google email regex
function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(re.test(input.value.trim())) {
    showSuccess(input);
  } else{
    showError(input, 'Email is not valid');
  }
}

//Check required fields
function checkRequired(inputArr) {
  //Using high order array method
  inputArr.forEach((input)=>{
    if(input.value.trim() === ''){
      showError(input,`${getFieldName(input)} cannot be empty!`)
    } else {
      showSuccess(input);
    }
  });
}

//check length of username
function checkLength(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters!`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be ${max} characters at most!`);
  } else {
    showSuccess(input);
  }
}

//check length of password
function checkPassword(input, min, max) {
  if(input.value.length < min) {
    showError(input, `${getFieldName(input)} must be at least ${min} characters!`);
  } else if(input.value.length > max) {
    showError(input, `${getFieldName(input)} must be ${max} characters at most!`);
  } else {
    showSuccess(input);
  }
}

//check if password & cfm pasword matches
function checkPasswordsMatch(input1, input2) {
  if(input1.value !== input2.value) {
    showError(input2, 'Passwords does not match!');
  } else {
    showSuccess(input2);
  }
}

//Get field name and make the first letter capital
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

//Event Listener
form.addEventListener('submit', function(e){
  e.preventDefault();

  checkRequired([username, email, password, password2]);
  checkLength(username, 3, 15);
  checkEmail(email);
  checkPassword(password, 6, 25);
  checkPasswordsMatch(password, password2);
});




















// //Event Listener
// form.addEventListener('submit', function(e){
//   e.preventDefault();

//   if(username.value === ''){
//     showError(username,'Username is required!');
//   } else {
//     showSuccess(username);
//   }

//   if(email.value === ''){
//     showError(email,'Email is required!');
//   } else if (!isValidEmail(email.value)) {
//     showError(email,'Email is not valid!');
//   } else {
//     showSuccess(email);
//   }

//   if(password.value === ''){
//     showError(password,'Password is required!');
//   } else {
//     showSuccess(password);
//   }

//   if(password2.value === ''){
//     showError(password2,'Confirm password is required!');
//   } else {
//     showSuccess(password2);
//   }
// });