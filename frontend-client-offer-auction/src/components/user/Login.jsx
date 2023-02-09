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

function Login() {

    let toast = useRef(null);

    const formik = useFormik({
        initialValues: {
            login: '',
            password: ''
        },
        validationSchema: Yup.object({
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
                id: 0,
                name: '',
                lastName: '',
                email: '',
                cellphone: '',
                login: formData.login,
                password: formData.password,
                rol: 1, // 0 = admin, 1 = cliente
            }

            fetch('http://localhost:8080/api/auth/login', {
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
                        //Guardo el username en useLocalStorage
                        console.log("data", data.data);
                        let user = {
                            id: data.data.id,
                            login: data.data.login,
                            password: data.data.password,
                            rol: data.data.rol
                        }
                        //guardo los datos del usuario en el localstorage
                        localStorage.setItem('user', JSON.stringify(user));
                        toast.current.show({ severity: 'success', summary: 'Inicio Sesión', detail: 'Sesión iniciada correctamente', life: 4000 });
                        window.location.href = '/dashboard-auction';
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error al iniciar Sesión', detail: `${data.message}`, life: 4000 });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });

    return (
        <div>
            <Toast ref={toast} />
            {/* Coponente para iniciar sesión con username y contraseñan */}
            <div className='w-11/12 lg:w-1/2 mx-auto'>
                <div className='bg-white shadow-2xl border border-gray-200 rounded-md px-8 pt-6 pb-8 mb-4 flex flex-col my-2'>
                    <h1 className='text-center text-2xl text-gray-800 font-light'>Iniciar Sesión</h1>
                    <form className='mt-5' onSubmit={formik.handleSubmit}  >
                        <div className='mb-4'>
                            <label
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='login'>
                                Usuario
                            </label>
                            <input
                                className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                                id='login'
                                name='login'
                                type='text'
                                placeholder='Username'
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
                                className='block text-gray-700 text-sm font-bold mb-2'
                                htmlFor='password'>
                                Contraseña
                            </label>
                            <input
                                className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
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
                        <div className='flex items-center justify-between'>
                            <button
                                className='bg-slate-800 w-full hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                                type='submit'
                            >
                                Iniciar Sesión
                            </button>
                        </div>
                    </form>
                    {/* Si  no tiene cuenta */}
                    <div className='flex items-center justify-center mt-4 gap-2'>
                        <p>
                            ¿No tienes cuenta?
                        </p>
                        <a
                            className='inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800'
                            href='/register'
                        >
                            Registrate aquí
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Login;