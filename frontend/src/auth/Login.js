import React, { lazy, Suspense, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import baseURL from "../services/baseUrl";
import AbortController from "abort-controller"
import axios from "axios";

const FormData = () => {
  const navigate = useNavigate();
  const ac = new AbortController();
  /* USE YUP */
  const validationSchema = yup.object({
    UserName: yup.string().required(""),
    Password: yup.string().required(" "),
    Role: yup.string().required(" ")
  });

  /* USE FORMIK */
  const formik = useFormik({
    initialValues: {
      UserName: "",
      Password: "",
      Role:"",
    },
    validationSchema,
    onSubmit: async (values) => {
      let LoginData = {
        ...values,
        IpAddress: "1.1.1.1",
      };
        let data={
            email:values?.email,
            password:values?.Password,
            role:values?.Role
        }
      login(data)
    },
  });

  /* USE LOGIN BTN */
  const [loader, setLoader] = useState(true);
  const login = (payload) => {
    axios({
      method: "POST",
      url: `${baseURL}/user/login`,
      data: payload,
    }).then(function (response) {
      if (response.data.status == 0) {
        navigate("/");
      } else if (response.data.status == 1) {
        formik.resetForm();
        setTimeout(() => {
          setLoader(true);
        }, 5000);
      } else {

      }
    //   common.loader(false);
    }).catch(function (error) {
      console.error(error);
    });
    
  };
 


  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <input type="text" placeholder="Username"  autoComplete="on"
            {...formik.getFieldProps("UserName")}
          />
          {formik.touched.UserName && formik.errors.UserName ? (<div>{formik.errors.UserName}</div>) : null}
        </div>
        <div className="form-group">
          <input type="password" placeholder="Password"  autoComplete="on"
            {...formik.getFieldProps("Password")}
          />
          {formik.touched.Password && formik.errors.Password ? (<div>{formik.errors.Password}</div>) : null}
        </div> 
        <div className="form-group">
          <input type="text" placeholder="Role: mentor/student/company"  autoComplete="on"
            {...formik.getFieldProps("Role")}
          />
          {formik.touched.Password && formik.errors.Password ? (<div>{formik.errors.Password}</div>) : null}
        </div> 
        <div className="group_but" style={{marginBottom:"3px"}}>
          <button type="submit" className="login_btn">
            Login
            {
              loader == true ? (<i className="fas fa-sign-in-alt"></i>)
              :
              (<i className="fas fa-spinner fa-spin"></i>)
            }
          </button>
        
        </div> 
          <div className="group_but">
            <button type="button"  className="login_btn" onClick={() => navigate('/signup')}>
              Sign Up
                { (<i className="fas fa-sign-in-alt"></i>)
                }
              </button>
          </div>
        <div className="privacy_policy">
          <p> This site is protected by reCAPTCHA and the Google
            <a href="https://policies.google.com/privacy" target="_blank"> Privacy Policy </a> and
            <a href="https://policies.google.com/terms" target="_blank"> Terms of Service </a> apply.
          </p>
        </div>
      </form>
    </>
  );
};

const AdminLogin = (props) => {
  const [abortitnow,setabortItNow]=useState();
  const ac = new AbortController();
  const [show, setShow] = React.useState(false);
  const loadApp = async () => {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        setShow(true);
        resolve();
      }, 1000);
    });
    await promise;
  };
  const loadappfunction=()=>{
    loadApp();
    setabortItNow(true);
  }
  useEffect(() => {
    loadappfunction();
    return () => {
      setabortItNow({}); 
    };
  }, []);

  if (!show) {
    return (
      <>
        <section className="Login_outer loginWrap">
          <div className="loginInner">
            {/* <img src="/images/logo.png" className="logo" /> */}
            Login
            <i className="fas fa-spinner fa-spin window__load"> </i>
          </div>
        </section>
      </>
    )
  }


  return (
    <>
      <section className="Login_outer loginWrap">
        <div className="loginInner">
          {/* <img src="/images/logo.png" className="logo" /> */}
         <span style={{color:"yellow",paddingLeft:"120px"}}>Login</span>
          {show && (
            <Suspense fallback={<i className="fas fa-spinner fa-spin window__load"> </i>}>
              <FormData getval={props} />
            </Suspense>
          )}
        </div>
      </section>
    </>
  )
};

export default AdminLogin;

