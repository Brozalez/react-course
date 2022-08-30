import { useState } from "react";

import { 
  signInWithGooglePopup, 
  createAuthUserWithEmailAndPassword, 
  createUserDocumentfromAuth,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";

import FormInput from "../form-input/form-input.component";
import Button from "../buttom/buttom.component";

import './sign-in-form.styles.scss'

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const SignInWithGoogle = async () => {
    const {user} = await signInWithGooglePopup();
    await createUserDocumentfromAuth(user);
  }

  const handleSubmit = async (event) => {
    event.preventDefault();



    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      resetFormFields()
    } catch (error) {
    }
  };



  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value })
  };

  return (
    <div className="sign-in-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput 
          label="Email" 
          type="email" 
          required 
          onChange={handleChange} 
          name="email" 
          value={email} 
        />

        <FormInput 
          label="Password" 
          type="password" 
          required 
          onChange={handleChange} 
          name="password" 
          value={password} 
        />
        
        <div className="buttons-container">
          <Button type="submit">
            Sign In
          </Button>
          
          <Button buttonType='google' onClick={SignInWithGoogle}>
            Google Sign In
          </Button>
        </div>

        
      </form>
    </div>
  );
};

export default SignInForm;