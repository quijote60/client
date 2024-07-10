import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../helpers/AuthContext";
import { useContext , useState} from "react";
function Registration() {
  const initialValues = {
    username: "",
    password: "",
  };
  const { setAuthState } = useContext(AuthContext);
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
  });
  let navigate = useNavigate();


  
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then(() => {
      console.log(data);
      login(data);
      navigate("/");

    });
    
  };
  const login = (data) => {
    //const data = { userName: userName, password: password };
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      //console.log(response.data);
      if(response.data.error){ alert(response.data.error);}
      else{
        localStorage.setItem("accessToken", response.data.token);
        setAuthState({username: response.data.username, id:response.data.id, status: true});
        navigate("/");
      }
      
    });
}

  

  return (
    <div>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />

          <label>Password: </label>
          <ErrorMessage name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="inputCreatePost"
            name="password"
            placeholder="Your Password..."
          />

          <button type="submit"> Register</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;