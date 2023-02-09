import React, { useRef, useState, useEffect } from 'react';

import { useFormik } from 'formik';
import * as Yup from 'yup';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import '../../App.css'

function Register() {

    let toast = useRef(null);

    const formik = useFormik({
        initialValues: {
            name: '',
            lastName: '',
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
            name: Yup.string()
                .required('El nombre es obligatorio'),
            lastName: Yup.string()
                .required('El apellido es obligatorio'),
            login: Yup.string()
                .required('El nombre de usuario es obligatorio'),
            password: Yup.string()
                .required('La contraseña es obligatoria')
        }),
        onSubmit: (formData) => {
            //Petecion a la api rest para iniciar sesión 
            console.log(formData);
            //armo el objeto para enviar al backend
            const data = {
                name: formData.name,
                lastName: formData.lastName,
                email: '',
                cellphone: '',
                login: formData.login,
                password: formData.password,
                rol: 0, // 0 = admin, 1 = cliente
            }

            fetch('http://localhost:8080/api/persons', {
                method: 'POST',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data.success) {
                        toast.current.show({ severity: 'success', summary: 'Registro de administradores', detail: 'Adminstrador registrado exitosamente', life: 4000 });
                        window.location.href = '/';
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error en el registro', detail: `${data.message}`, life: 4000 });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });
    return (
        <div className='w-11/12 lg:w-2/3 mx-auto'>
            <Toast ref={toast} />
            <div className='bg-gray-200 shadow-2xl border border-gray-200 rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col my-2'>
                <h1 className='text-center text-2xl text-gray-800 font-light'>Formulario de registro</h1>
                <form className='mt-5' onSubmit={formik.handleSubmit}  >
                    <div className='mb-4'>
                        <label
                            htmlFor="name"
                            className='block text-gray-700 text-sm font-bold mb-2 text-start'>
                            Nombres
                        </label>
                        <input
                            className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300'
                            id='name'
                            name='name'
                            type='text'
                            placeholder='Tu nombre aquí'
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            autoComplete='name'
                        />
                        {/* Capturo el error */}
                        {formik.touched.name && formik.errors.name ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.name}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            htmlFor="lastName"
                            className='block text-gray-700 text-sm font-bold mb-2 text-start'>
                            Apellidos
                        </label>
                        <input
                            className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-300'
                            id='lastName'
                            name='lastName'
                            type='text'
                            placeholder='Tu apellido aquí'
                            value={formik.values.lastName}
                            onChange={formik.handleChange}
                            autoComplete='lastName'
                        />
                        {/* Capturo el error */}
                        {formik.touched.lastName && formik.errors.lastName ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.lastName}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2 text-start'
                            htmlFor='login'>
                            Usuario
                        </label>
                        <input
                            className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-300'
                            id='login'
                            name='login'
                            type='text'
                            placeholder='Tu username aquí'
                            value={formik.values.login}
                            onChange={formik.handleChange}
                            autoComplete='login'
                        />
                        {/* Capturo el error */}
                        {formik.touched.login && formik.errors.login ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.login}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className='mb-4'>
                        <label
                            className='block text-gray-700 text-sm font-bold mb-2 text-start'
                            htmlFor='password'>
                            Contraseña
                        </label>
                        <input
                            className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-300'
                            id='password'
                            name='password'
                            type='password'
                            placeholder='******************'
                            autoComplete='current-password'
                            value={formik.values.password}
                            onChange={formik.handleChange}
                        />
                        {/* Capturo el error */}
                        {formik.touched.password && formik.errors.password ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.password}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <button
                            className='bg-slate-800 w-full hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                            type='submit'
                        >
                            Registrarse
                        </button>
                        <button
                            className='bg-red-600 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={() => { window.location.href = '/' }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default Register;