import React, { useState } from 'react'
import Form from '@/components/common/form'
import { loginForm } from '@/config/index'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '@/features/auth/authSlice'

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const initialState = {
        loginCredential: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);

    function onSubmit() {
        dispatch(loginUser(formData)).then((data) => {
            if (data.payload?.success) {
            }
            else {
            }
        })
    }

    return (
        <>
            <div className='w-full flex flex-col items-center justify-center gap-2'>
                <div>
                    <h2 className='font-semibold text-3xl'>Sign in to your account</h2>
                    <h2 className='pt-2'>New Register?
                        <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/auth/register')} > Sign up</span></h2>
                </div>
                <Form className="flex flex-col items-center justify-center gap-2"
                    formControls={loginForm}
                    buttonText={"Login"}
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData} />
            </div>

        </>
    )
}

export default Login;