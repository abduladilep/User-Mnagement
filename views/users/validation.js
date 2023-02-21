
 
 
 const form=document.getElementById('form')
 const Firstname=document.getElementById('Firstname')
 const Lastname=document.getElementById('Lastname')
 const Email =document.getElementById('Email')
 const Password=document.getElementById('Password')
 
 form.addEventListener('submit',e=>{
    e.preventDefault()

    validateInputs();

 })
 const setError=(element,messege)=>{
    const inputControl=element.preventElement;
const errorDisplay=inputControl.querySelector('.error')

 errorDisplay.innerText = messege;
 inputControl.classList.add('error')
 inputControl.classList.remove('success') 
}


const setSuccess=element=>{
    const inputControl=element.preventElement;
const errorDisplay=inputControl.querySelector('.error')

 errorDisplay.innerText = '';
 inputControl.classList.add('success')
 inputControl.classList.remove('error') 
}


 const validateInputs=()=>{
    const FirstnameValue=Firstname.Value.trim()
    const LastnameValue=Lastname.Value.trim()
    const EmailValue=Email.Value.trim()
    const PasswordValue=Password.Value.trim()
 
    if(FirstnameValue===''){
        setError(Firstname, 'firstname is required')

    }else{
        setSuccess(Firstname)
}

if(LastnameValue===''){
    setError(Lastname, 'firstname is required')

}else{
    setSuccess(Lastname)
}

if(EmailValue===''){
    setError(Email, 'Email is required')

}else if (!isValidEmail(EmailValue)){
    setError(Email, 'provide a valid Email is required')

}else{
    setSuccess(Email)
}


if(PasswordValue===''){
    setError(Password, 'password is required')
}else if(PasswordValue.length < 8){
    setError(Password,'password must be at least 8 charecrter')

}else{
    setSuccess(Password);
}
};






