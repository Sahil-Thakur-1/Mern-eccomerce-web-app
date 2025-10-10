import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { closeModal } from '../../features/common/modalSlice';

const ModalContainer = () => {
    const { isOpen, content } = useSelector((state) => state.modal);
    const dispatch = useDispatch();

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4 animate-in fade-in duration-200"
            onClick={() => dispatch(closeModal())}
        >
            <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md  relative animate-in zoom-in-95 duration-200"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    className="absolute top-0 right-0 text-black hover:text-black hover:font-bold transition-colors w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                    onClick={() => dispatch(closeModal())}
                    aria-label="Close modal"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>

                {/* Modal content */}
                <div className="p-6 bg-white rounded-lg">
                    {content}
                </div>
            </div>
        </div>
    );
};

export default ModalContainer;