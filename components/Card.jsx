import React from 'react'
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import axios from 'axios';
import * as Yup from 'yup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validationSchema = Yup.object({
    title: Yup.string().min(2).max(20),
    description: Yup.string().min(2).max(30)
});

const Card = ({ note }) => {

    const initialValues = {
        title: '',
        description: ''
    }

    const handleSubmit = async (values) => {
        const { title, description } = values;

        const response = await axios.put(`http://127.0.0.1:5000/api/note/${note._id}`, {
            title, description
        }).catch(error => error.response);

        console.log(response);

        response?.status === 200 ? toast('Note Updated', {
            position: "top-left",
        }) : toast(response?.data.message, {
            position: "top-left",
        });
    }

    return (
        <div className="card w-80 bg-neutral text-neutral-content">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
            <div className="card-body items-center text-center">
                <h2 className="card-title">{note.title}</h2>
                <p>{note.description}</p>
                <div className="card-actions justify-end">
                    <div className="tooltip ooltip-bottom" data-tip="not available">
                        <button className="btn btn-ghost">{<TrashIcon className='h-6 w-6' />}</button>
                    </div>
                    <div className="tooltip ooltip-bottom" data-tip="update note">
                        <label htmlFor="my-modal" className="btn">{<PencilSquareIcon className='h-6 w-6' />}</label>
                    </div>
                </div>
            </div>

            <input type="checkbox" id="my-modal" className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-xl text-center mb-5">Update Note</h3>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        <Form>
                            <div className="w-full space-y-6">
                                <Field type="text" name="title" placeholder="title goes here" className="input input-bordered w-full" />
                                <Field as="textarea" type="text" name="description" className="textarea textarea-bordered w-full" placeholder="description goes here" />
                            </div>
                            <div className="modal-action flex justify-between">
                                <label htmlFor="my-modal" className="btn">cancle</label>
                                <button className="btn" type='submit'>
                                    <label htmlFor="my-modal" as="button">update</label>
                                </button>
                            </div>
                        </Form>
                    </Formik>
                </div>
            </div>
        </div>
    )
}

export default Card