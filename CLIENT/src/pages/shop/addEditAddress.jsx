import React from 'react'
import Form from '../../components/common/form'
import { addressForm } from '../../config'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addAddress } from '../../features/shop/addressSlice'

const AddEditAddress = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.auth);
    const initialState = {
        name: "",
        phone: "",
        email: "",
        street: "",
        city: "",
        state: "",
        postalCode: "",
        country: "",
        userId: ""
    };


    const [formData, setFormData] = useState(initialState);

    function onSubmit() {
        formData.userId = user._id;
        dispatch(addAddress(formData));
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <h2 className='font-semibold text-3xl mb-3'>Add Category</h2>
            <Form
                formControls={addressForm}
                buttonText={"Add Address"}
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData} />
        </div>
    );
}

export default AddEditAddress;
