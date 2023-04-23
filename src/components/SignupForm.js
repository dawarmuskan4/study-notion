import React, {useState} from 'react'
import {toast} from 'react-hot-toast'
import {AiOutlineEye, AiOutlineEyeInvisible} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom'

const SignupForm = ({setIsLoggedIn}) => {
  const [formData, setFormData]= useState({
    firstName: "",
    lastName :"",
    email: "",
    password: "",
    confirmPassword: ""
  })

  const navigate = useNavigate()

  const [showPassword , setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [accountType, setAccountType] = useState('Student')

  function changeHandler(event){
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name] : event.target.value
    }))
  }

  function submitHandler(event){
    event.preventDefault();
    if(formData.password !== formData.confirmPassword) {
        toast.error("Passwords do not match");
        return ;
    }
    setIsLoggedIn(true);
    toast.success("Account Created");
    const accountData = {
        ...formData
    };

    const finalData = {
      ...accountData,
      accountType
    }
    console.log("printing final account data ");
    console.log(finalData)
    navigate("/dashboard");
  }
  
  return (
    <div>
      {/* student-instructor tab */}
      <div className="flex bg-richblack-800 p-1 gap-z-1 my-6 rounded-full max-w-max ">
        <button 
          className={`${accountType=== "Student" ? 
            "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} 
            py-2 px-5 rounded-full transition-all duration-200` }
          onClick={() => {
            setAccountType('Student')
          }}
        >
          Student
        </button>
        <button
          className={`${accountType=== "Instructor" ? 
            "bg-richblack-900 text-richblack-5" : "bg-transparent text-richblack-200"} 
            py-2 px-5 rounded-full transition-all duration-200` }
          onClick={() => {
            setAccountType('Instructor')
          }}  
        >
          Instructor 
        </button>
      </div>

      <form onSubmit={submitHandler}>
        {/* first  name and last name */}
        <div className="flex gap-x-4 mt-[20px]">
          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">First Name<sup className="text-pink-200">*</sup></p>
            <input 
              required
              type="text"
              name="firstName"
              placeholder="Enter first name"
              onChange={changeHandler}
              value={formData.firstName}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]">Last Name<sup className="text-pink-200">*</sup></p>
            <input 
              required
              type="text"
              name="lastName"
              placeholder="Enter last name"
              onChange={changeHandler}
              value={formData.lastName}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
        </div>
        
        {/* email address */}
        <div className="mt-[20px]">
          <label className="w-full mt-[10px]">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"> Email Address <sup className="text-pink-200">*</sup></p>
            <input 
              required
              type="email"
              name="email"
              onChange={changeHandler}
              placeholder="Enter email"
              value={formData.email}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
          </label>
        </div>

        {/* create password and confirm password */}
        <div className="w-full flex gap-x-4 mt-[20px]">
          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"> Create Password <sup className="text-pink-200">*</sup></p>
            <input 
              required
              type={showPassword ? ("text") : ("password")}
              name="password"
              onChange={changeHandler}
              placeholder="Enter password"
              value={formData.password}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />

            <span className="absolute right-3 top-[40px] cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF"/>)}
            </span>
          </label>

          <label className="w-full relative">
            <p className="text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]"> Confirm Password <sup className="text-pink-200">*</sup></p>
            <input 
              required
              type={showConfirmPassword ? ("text") : ("password")}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              className='bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]'
            />
  
            <span className="absolute right-3 top-[40px] cursor-pointer" onClick={() => setShowConfirmPassword((prev) => !prev)}>
              {showConfirmPassword ? (<AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF"/>) : (<AiOutlineEye fontSize={24} fill="#AFB2BF" />)}
            </span>
          </label>

        </div>

        <div>
          <button className="w-full bg-yellow-50 rounded-[8px] font-medium text-black-900 px-[12px] py-[8px] mt-6">Create Account</button>
        </div>

      </form>
    </div>
  )
}

export default SignupForm
