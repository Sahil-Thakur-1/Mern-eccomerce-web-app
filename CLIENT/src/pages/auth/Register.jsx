import React, { useState } from 'react'
import Form from '@/components/common/form'
import { registerForm } from '@/config/index'
import { registerUser } from '../../features/auth/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

const Register = () => {
    const navigate = useNavigate();
    const dispactch = useDispatch();

    const initialState = {
        userName: "",
        email: "",
        password: "",
    };

    const [formData, setFormData] = useState(initialState);

    function onSubmit() {
        dispactch(registerUser(formData)).then((data) => {
            if (data.payload.success) {
                navigate('/auth/login')
            }
        });
    }

    return (
        <>
            <div className='w-full flex flex-col items-center justify-center gap-2'>
                <div>
                    <h2 className='font-semibold text-3xl'>Sign up to your account</h2>
                    <h2 className='pt-2'>Already Registered?
                        <span className='text-blue-500 cursor-pointer' onClick={() => navigate('/auth/login')} > Sign in</span></h2>

                </div>
                <Form
                    formControls={registerForm}
                    buttonText={"Register"}
                    onSubmit={onSubmit}
                    formData={formData}
                    setFormData={setFormData} />
            </div>

        </>
    )
}

export default Register;