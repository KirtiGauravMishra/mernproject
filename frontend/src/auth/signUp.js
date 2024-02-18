import React,{useState} from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import baseURL from '../services/baseUrl';
import { ToastContainer } from "react-toastify";
import { toast, Zoom } from 'react-toastify';
import { useNavigate } from 'react-router';
import axios from "axios";

const SignUp = () => {
const [passwordVisible, setPasswordVisible] = useState(true);
const navigate =useNavigate();
const formik = useFormik({
  initialValues: {
    txtusername: '',
    txtname: '',
    txtwtsnumber: '',
    txtpass: '',
    txtreferno: '',
  },
  validationSchema: Yup.object({
    txtusername: Yup.string().required('Name is required'),
    txtname: Yup.string().email('Invalid email format').required('Email is required'),
    txtwtsnumber: Yup.string().required('Mobile Number is required').matches(/^\d{10}$/, 'Mobile Number must be 10 digits'),
    txtpass: Yup.string().required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(
      /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).*$/,
      'Password must contain at least one uppercase letter and one special character'
    ),
    txtreferno: Yup.string().required("Role is required"),
  }),
  onSubmit: (values) => {
    const obj={
      name:values?.txtusername || '',
      email:values?.txtname || '',
      phone: values?.txtwtsnumber.toString() || '',
      password:values?.txtpass || '',
      role:values?.txtreferno || ''
    }
    console.log(obj)
    SignUpAPi(obj)
  },
});
const SignUpAPi=(values)=>{
  axios({
    method: "POST",
    url: `${baseURL}/user/register`,
    data: values,
    })
    .then(function (res) {
        // console.log(res)
      if(res?.data?.status===0){
        formik.resetForm()
        toast.success(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
      });
      setTimeout(() => {
        navigate("/login")
      }, 2000);
      }
      else{
        toast.error(res?.data?.message, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
      });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
const togglePasswordVisibility = () => {
  setPasswordVisible((prevVisible) => !prevVisible);
};
  return (
    <>
    <div>
      <ToastContainer/>
      <form onSubmit={formik.handleSubmit}>
      <div className='registerInner'  style={{ background:`url("/images/bg1.jpg")`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* <img src="/images/logo.png" alt="Logo" className='logoss Fwcc'/> */}
      Sign Up
      <div className='Fwcc desktoplogo'>
      <div className='loginForm'>
            <div className="withdrawal">
              Signup Now
            </div>
            <div className='form-group mt12'>
              <span className='material-symbols-outlined'>person</span>
              <input
                type="text"
                name="txtusername"
                placeholder="Enter your Name"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.txtusername}
                autoComplete='off'
              />
              {formik.touched.txtusername && formik.errors.txtusername ? (
                <div className="error">{formik.errors.txtusername}</div>
              ) : null}
            </div>
            <div className='form-group mt12'>
              <span className='material-symbols-outlined'>person</span>
              <input
                type="text"
                name="txtname"
                placeholder="Enter your Email"
                className="form-control"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.txtname}
              />
              {formik.touched.txtname && formik.errors.txtname ? (
                <div className="error">{formik.errors.txtname}</div>
              ) : null}
            </div>
            <div className='form-group phoneN'>
              <div className="india">
                in
              </div>
              <input
                name="txtwtsnumber"
                type="number"
                maxLength="10"
                className="form-control"
                placeholder="Mobile"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.txtwtsnumber}
              />
              {formik.touched.txtwtsnumber && formik.errors.txtwtsnumber ? (
                <div className="error">{formik.errors.txtwtsnumber}</div>
              ) : null}
            </div>
            <div className="form-group">
            <span className="material-symbols-outlined">lock</span>
            <input
              name="txtpass"
              type={passwordVisible?"password":"text"}
              className="form-control"
              placeholder="Password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.txtpass}
              autoComplete='off'
            />
            <span className="material-symbols-outlined eye" onClick={togglePasswordVisibility}> {passwordVisible ? 'visibility_off' : 'visibility'}</span>
            {formik.touched.txtpass && formik.errors.txtpass ? (
              <div className="error">{formik.errors.txtpass}</div>
            ) : null}
            </div>
            <div className="form-group">
              <span className="material-symbols-outlined">groups</span>
              <input
                name="txtreferno"
                type="text"
                className="form-control"
                placeholder="Role - mentor/company/student"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.txtreferno}
              />
              {formik.touched.txtreferno && formik.errors.txtreferno ? (
                <div className="error">{formik.errors.txtreferno}</div>
              ) : null}
            </div>
            <div className="form-group-btn">
                <input type="submit" name="btnregister" value="Register"  className="btn " />
            </div>
            <div className="loginFoot fwcc">Already a member?<a href="/login">Login</a></div>
        </div>
        </div>
        </div>
      </form>  
    </div>
    </>
  )
}

export default SignUp;