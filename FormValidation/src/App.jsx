import react, { useState, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

function App() {

  const [formData, setFormData] = useState({
    firstName: "",
    email: "",
    phone: "",
    zipCode: "",
    message: "",
  })

  const[focusFilled,setFocusFielled]=useState(null);
  const[error,setError]=useState({});
  const[filledpersentage,setFilledPersentage]=useState(0);

  const handleFocus = (field) => {
    setFocusFielled(field)
  }

  const formValidation = (name, value) => {
    switch(name){
      case "firstName":
        if(value.trim()=="") return "Firstname is required" 
        if(value.length < 2) return "Firstname must be at least 2 characters"
        return undefined

      case "email":
        if(value.trim()=="") return "Email is required" 
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email address"
        return undefined
      
      case "phone":
        if (!value.trim()) return "Phone number is required"
        if (!/^[+]?[1-9][\d]{10}$/.test(value.replace(/[\s\-()]/g, ""))) return "Please enter a valid phone number"
        return undefined

     
      case "zipCode":
        if (!value.trim()) return "ZIP code is required"
        if (!/^\d{6}$/.test(value)) return "Please enter a valid 6-digit ZIP code"
        return undefined


      default:
        return undefined
    }
  }

 

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
    const error = formValidation(name, value)
    setError((prev) => ({
      ...prev,
      [name]: error
    }))
  }

   const handleBlur = (field) => {
    const error = formValidation(field,formData[field])
    setError((prev) => ({
      ...prev,
      [field]: error
    }))
    setFocusFielled(null)
  }

   useEffect(() => {
    const requiredFilled = [
      "firstName",
      "email",
      "phone",
      "zipCode",
    ]
    const requiredFilledPers = requiredFilled.filter((field) => formData[field].trim()=="")
    const persentage = Math.round(((requiredFilled.length - requiredFilledPers.length) / requiredFilled.length) * 100)
    setFilledPersentage(persentage)
  },[formData])

 


  return (
    <>
      <div className='min-h-screen bg-black flex justify-center items-center p-4'>
         <div className="w-full max-w-4xl p-8 border border-gray-500 text-center text-white"> 
          <h1 className='text-3xl font-semibold'>Registration Form</h1>
          <p className='mt-2 text-gray-400'>Please fill out all required fields below</p>

          <div className='flex justify-between'>
            <span className='text-gray-300'>Form Completion</span>
            <span className='text-white'>{filledpersentage}%</span>
          </div>

          <div className='h-2 mt-2 w-full bg-gray-700'>
            <div 
                 className={`h-2 transition-all duration-600 ${filledpersentage < 100 ? "bg-blue-700" : "bg-green-500"}`} 
                 style={{ width: `${filledpersentage}%` }}
           >
          </div> 

          </div>
          <form className='mt-6'>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {/* Name */}
              <div className='space-y-2'>
                <label htmlFor="firstname" className='text-gray-300 block text-left'>First Name *</label>
                <input type="text" 
                name='firstName'
                className={`w-full border text-white px-3 py-4 placeholder-text-white
                  focus:outline-none 
                  focus:border-white px-3 py-4 placeholder-text-white
                  ${focusFilled ? 'shadow-lg shadow-blue-500/20' : ''} 

                  ${error.firstName ? 'border-red-500 animate-pulse' : formData.firstName && !error.firstName ? 'border border-green-500' : 'border border-gray-500'}
                  `}
                placeholder='Enter your first name' 
                onFocus={()=>handleFocus("firstName")}
                onChange={(e)=>handleChange(e)}
                onBlur={()=>handleBlur("firstName")}
                />

                {
                  error.firstName && (
                    <span className='text-red-500 mt-1 w-full block animate-pulse text-left'>{error.firstName}</span>
                  )
                }

                {
                  formData.firstName && !error.firstName &&(
                    <span className='text-green-500 mt-1 w-full block animate-pulse text-left'>Correct!</span>
                  )
                }
              </div>

              {/* Email address */}
              <div>
                <div className='space-y-2'>
                <label htmlFor="email" className='text-gray-300 block text-left'>Email *</label>
                <input type="text" 
                name='email'
                className={`w-full border text-white px-3 py-4 placeholder-text-white
                  focus:outline-none 
                  focus:border-white px-3 py-4 placeholder-text-white
                  ${focusFilled ? 'shadow-lg shadow-blue-500/20' : ''} 

                  ${error.email ? 'border-red-500 animate-pulse' : formData.email && !error.email ? 'border border-green-500' : 'border border-gray-500'}
                  `}
                placeholder='Enter your email address' 
                onFocus={()=>handleFocus("email")}
                onChange={(e)=>handleChange(e)}
                onBlur={()=>handleBlur("email")}
                />

                {
                  error.email && (
                    <span className='text-red-500 mt-1 w-full block animate-pulse text-left'>{error.email}</span>
                  )
                }

                {
                  formData.email && !error.email &&(
                    <span className='text-green-500 mt-1 w-full block animate-pulse text-left'>Correct!</span>
                  )
                }
              </div>
              </div>
              

              {/* Phone Number */}
               <div className='space-y-2'>
                <label htmlFor="phone" className='text-gray-300 block text-left'>Phone Number *</label>
                <input type="text" 
                name='phone'
                className={`w-full border text-white px-3 py-4 placeholder-text-white
                  focus:outline-none 
                  focus:border-white px-3 py-4 placeholder-text-white
                  ${focusFilled ? 'shadow-lg shadow-blue-500/20' : ''} 

                  ${error.phone ? 'border-red-500 animate-pulse' : formData.phone && !error.phone ? 'border border-green-500' : 'border border-gray-500'}
                  `}
                placeholder='Enter your phone number' 
                onFocus={()=>handleFocus("phone")}
                onChange={(e)=>handleChange(e)}
                onBlur={()=>handleBlur("phone")}
                />

                {
                  error.phone && (
                    <span className='text-red-500 mt-1 w-full block animate-pulse text-left'>{error.phone}</span>
                  )
                }

                {
                  formData.phone && !error.phone &&(
                    <span className='text-green-500 mt-1 w-full block animate-pulse text-left'>Correct!</span>
                  )
                }
              </div>

              {/* ZIP code */}
              <div>
                <div className='space-y-2'>
                <label htmlFor="zipCode" className='text-gray-300 block text-left'>ZIP code *</label>
                <input type="text" 
                name='zipCode'
                className={`w-full border text-white px-3 py-4 placeholder-text-white
                  focus:outline-none 
                  focus:border-white px-3 py-4 placeholder-text-white
                  ${focusFilled ? 'shadow-lg shadow-blue-500/20' : ''} 

                  ${error.zipCode ? 'border-red-500 animate-pulse' : formData.zipCode && !error.zipCode ? 'border border-green-500' : 'border border-gray-500'}
                  `}
                placeholder='6 - digit zipCode address' 
                onFocus={()=>handleFocus("zipCode")}
                onChange={(e)=>handleChange(e)}
                onBlur={()=>handleBlur("zipCode")}
                />

                {
                  error.zipCode && (
                    <span className='text-red-500 mt-1 w-full block animate-pulse text-left'>{error.zipCode}</span>
                  )
                }

                {
                  formData.zipCode && !error.zipCode &&(
                    <span className='text-green-500 mt-1 w-full block animate-pulse text-left'>Correct!</span>
                  )
                }
              </div>
              </div>
            </div>

              {/* Message */}
            <div>
                <div className='space-y-2 mt-4'>
                <label htmlFor="message" className='text-gray-300 block text-left'>Additional Message (optional) </label>
                <textarea type="text" 
                name='message'
                rows={4}
                className={`w-full border text-white px-3 py-4 placeholder-text-white
                  focus:outline-none 
                  focus:border-white px-3 py-4 placeholder-text-white
                  ${focusFilled ? 'shadow-lg shadow-blue-500/30' : ''} 

                  ${error.message ? 'border-red-500 animate-pulse' : formData.message && !error.message ? 'border border-green-500' : 'border border-gray-500'}
                  `}
                placeholder='Enter your message' 
                onFocus={()=>handleFocus("message")}
                onChange={(e)=>handleChange(e)}
                onBlur={()=>handleBlur("message")}
                />

                {
                  formData.message && (
                    <span className='text-blue-500 mt-1 w-full block animate-pulse text-left'>Thanks for additional info!</span>
                  )
                }
              </div>
             
              </div>

               <button
                disabled={filledpersentage < 100}
                className={`w-full px-3 py-4 font-bold mt-4
                ${filledpersentage < 100 ? 'border border-gray cursor-not-allowed' : 'border border-green-500 hover: bg-green-500 cursor-pointer'}
                `}>

                  {
                    filledpersentage < 100 ? `Complete form (${filledpersentage}% Done)`:"Register Now"
                  }
                {/* <span className='text-white'>Submit</span> */}

              </button>


              
           
          </form>
         
        </div>
        
      </div>
    </>
  )
}

export default App
