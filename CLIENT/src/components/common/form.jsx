import { Input } from 'postcss';
import React, { useState } from 'react'

const Form = ({ formControls, formData, setFormData, onSubmit, buttonText }) => {


    function createFormFields({ formControl, formData, setFormData }) {
        let element = null;
        switch (formControl.componentType) {
            case "input":
                element = <input
                    className='bg-stone-300 border-2 rounded-sm p-1 w-xs'
                    type={formControl.type}
                    placeholder={formControl.placeholder}
                    id={formControl.name}
                    name={formControl.name}
                    value={formData[formControl.name]}
                    onChange={(e) => setFormData({ ...formData, [formControl.name]: e.target.value })}
                />
                break;

            case "select":
                element = (
                    <select
                        className="bg-stone-300 border-2 rounded-sm p-1 w-xs"
                        name={formControl.name}
                        value={formData[formControl.name] || ""}
                        onChange={(e) =>
                            setFormData({
                                ...formData,
                                [formControl.name]: e.target.value,
                            })
                        }
                    >
                        <option value="" disabled>
                            {formControl.placeholder}
                        </option>

                        {formControl.options?.map((optionItem) => (
                            <option className='' key={optionItem.id} value={optionItem.value}>
                                {optionItem.value}
                            </option>
                        ))}
                    </select>
                )
                break;


            case "textArea":
                element = <textarea
                    className='bg-stone-300 border-2 rounded-sm p-1 w-xs'
                    type={formControl.type}
                    maxLength={formControl.maxLength}
                    placeholder={formControl.placeholder}
                    id={formControl.name}
                    name={formControl.name}
                    value={formData[formControl.name]}
                    onChange={(e) => setFormData({ ...formData, [formControl.name]: e.target.value })}
                />

                break;

            default:
                element = null;

        }
        return element;
    }

    return (
        <>
            <form onSubmit={(e) => { e.preventDefault(); onSubmit() }} className='flex-col flex gap-4 w-full items-center justify-center'>
                {formControls.map((formControl) =>
                    <div key={formControl.name} className='flex flex-col items-start'>
                        <label>{formControl.lable}</label>
                        {createFormFields({ formControl, formData, setFormData })}
                    </div>

                )}
                <button className='bg-black text-white font-semibold py-1 px-2 rounded-sm w-fit  text-center' type="submit">{buttonText || "Submit"}</button>
            </form>
        </>
    )
}

export default Form