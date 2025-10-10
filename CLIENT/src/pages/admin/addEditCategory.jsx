import React from 'react'
import Form from '../../components/common/form'
import { categoryForm } from '../../config'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addCategory } from '../../features/shop/categorySlice'

const AddEditCategory = () => {
    const dispatch = useDispatch();
    const initialState = {
        name: "",
        description: "",
    };

    const [formData, setFormData] = useState(initialState);

    function onSubmit() {
        dispatch(addCategory(formData));
    }

    return (
        <div className='w-full h-full flex flex-col items-center justify-center'>
            <h2 className='font-semibold text-3xl mb-3'>Add Category</h2>
            <Form
                formControls={categoryForm}
                buttonText={"Add Category"}
                onSubmit={onSubmit}
                formData={formData}
                setFormData={setFormData} />
        </div>
    );
}

export default AddEditCategory
