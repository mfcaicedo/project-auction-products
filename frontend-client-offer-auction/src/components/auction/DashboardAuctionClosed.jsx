import React, { useState, useEffect, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Dialog } from 'primereact/dialog';
import auction from '../../assets/img/auction.jpg'
import { Toast } from 'primereact/toast';
import { useLocalStorage } from '../../utils/useLocalStorage';

function DashboardAuctionClosed() {

    //Se declara un estado para cargar las subastas 
    const [auctions, setAuctions] = useState([]);
    //Se declara un estado para abrir y cerrar el modal de la oferta
    const [openModal, setOpenModal] = useState(false);
    //Se declara un estado para cargar la oferta actual
    const [offerCurrent, setOfferCurrent] = useState(0);
    //Estado para recuperar el token del usuario autenticado
    const [user, setUser] = useLocalStorage('user', null);
    //Se declara un estado para cargar el producto de la subasta
    const [product, setProduct] = useState({});
    //Se declara una referencia para el toast
    let toast = useRef(null);


    const formik = useFormik({
        initialValues: {
            id: '',
            offerCurrent: '',
            offer: '',
        },
        validationSchema: Yup.object({
            offer: Yup.number()
                .required('Por favor ingresa una oferta')
                .min(offerCurrent + 1, 'La oferta debe ser mayor a la actual'),
        }),
        onSubmit: values => {
            console.log("values", values);
            //armo el objeto para enviar a la API
            const data = {
                auctionState: true,
                idPersonOffered: user.id,
                valueOffered: values.offer,
                product: {
                    code: product.code,
                    name: product.name,
                    state: product.state,
                    initialValueOffer: product.initialValueOffer,
                }
            }

            console.log("object para el el back", data);
            // return 0; 

            //Se hace la peticion a la API para guardar la oferta
            fetch('http://localhost:8081/api/auctions/offer/' + values.id, {
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data !== null) {
                        toast.current.show({ severity: 'success', summary: 'Oferta registrada correctamente', life: 4000 });
                        //cierro el modal
                        closeModalOffer();
                        //recargo las subastas
                        loadAuctions();
                        //limpio el formulario
                        formik.resetForm();
                        //limpio el estado del producto
                        setProduct({});
                        //limpio el estado de la oferta actual
                        setOfferCurrent(0);
                    } else {
                        toast.current.show({ severity: 'error', summary: 'Error al registrar la oferta', life: 4000 });
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    });

    /**
     * Método para cargar las subastas haciendo la peticion a la API
     */
    const loadAuctions = () => {
        try {
            fetch("http://localhost:8081/api/auctions")
                .then((response) => response.json())
                .then((data) => {
                    let arrayAuctions = [];
                    data.map((auction) => {
                        if (auction.auctionState === false) {
                            arrayAuctions.push(auction);
                        }
                    })
                    setAuctions(arrayAuctions);

                });
        } catch (error) {
            console.log(error);
        }
    };
    /**
     * Método para abrir el modal de la oferta 
     */
    const openModalOffer = (auction) => {
        console.log("auction", auction)
        formik.setFieldValue('offerCurrent', auction.valueOffered);
        formik.setFieldValue('id', auction.id);
        setOfferCurrent(auction.valueOffered);
        setProduct(auction.product);
        setOpenModal(true);
    }
    const closeModalOffer = () => {
        setOpenModal(false);
        formik.resetForm();
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }


    useEffect(() => {
        loadAuctions();
        //funcion que se ejecuta cada 4 segundos para recargar las subastas
        const interval = setInterval(() => {
            loadAuctions();
        }, 4000);
        return () => clearInterval(interval);
    }, []);
    return (
        <div className=''>
            <Toast ref={toast} />
            <div className='mt-5'>
                <h1 className='text-2xl font-bold text-center text-slate-800'>Subastas que han sido cerradas</h1>
            </div>
            <div className='w-11/12 flex flex-col gap-2 p-3 shadow-xl border-2 border-gray-200 rounded-2xl
            my-3 mx-auto lg:w-3/4'>
                {
                    auctions.length > 0 ?
                        auctions.map((auction, index) => (
                            <div key={index} className=''>
                                <div className='bg-slate-300 rounded-2xl text-left p-3'>
                                    <p className='text-xl font-bold text-slate-800 mb-1'>
                                        Código producto:
                                        <span className='font-normal '>
                                            {" "}{auction.product.code}
                                        </span>
                                    </p>
                                    <p className='text-xl font-bold text-slate-800 mb-1 '>
                                        Nombre producto:
                                        <span className='font-normal '>
                                            {" "}{auction.product.name}
                                        </span>
                                    </p>
                                    <p className='text-xl font-bold text-slate-800 mb-1'>
                                        Oferta inicial:
                                        <span className='font-normal'>
                                            {" "}{formatCurrency(auction.product.initialValueOffer)}
                                        </span>
                                    </p>
                                    <p className='text-xl font-bold text-slate-800 mb-2'>
                                        Oferta final:
                                        <span className='font-normal px-2 py-1 bg-green-500 rounded-md'>
                                            {" "}{formatCurrency(auction.valueOffered)}
                                        </span>
                                    </p>
                                    <p className='text-xl font-bold text-slate-800'>
                                        Estado:
                                        <span className='font-normal mx-1 px-2 pb-1 bg-red-600 rounded-md text-white'>
                                            Cerrada
                                        </span>
                                    </p>
                                </div>
                            </div>
                        ))
                        :
                        (
                            <p
                                className='text-xl font-bold text-center text-slate-800 px-3 py-2 rounded-md bg-yellow-500'>
                                Ups! Todavía no hay ninguna subasta cerrada
                            </p>
                        )

                }

            </div>
            {/* MODAL PARA LA OFERTA */}
            <Dialog visible={openModal} style={{ width: '450px' }}
                header={<img src={auction} alt={"auction"} className="block m-auto pb-0 w-7 rounded-md shadow-2xl " />}
                modal className="p-fluid" onHide={closeModalOffer}>
                <div className="title-form" style={{ color: "#424242", fontWeight: "bold", fontSize: "22px" }}>
                    <p style={{ marginTop: "0px" }}>
                        Realiza tu oferta!
                    </p>
                </div>
                <div className=''>
                    <p className='font-semibold text-slate-800 text-lg'>
                        Oferta actual: <span className='font-bold text-slate-800'>{formatCurrency(formik.values.offerCurrent)}</span>
                    </p>
                </div>
                <form className='mt-1' onSubmit={formik.handleSubmit}  >
                    <div className='mb-4'>
                        <label
                            htmlFor="offer"
                            className='block text-slate-800 text-lg font-bold text-start'>
                            Tú oferta
                        </label>
                        <input
                            className='shadow appearance-none rounded-md w-full py-2 px-3 text-slate-800 leading-tight border border-slate-400 focus:outline-none focus:border-slate-50 focus:ring-2 focus:ring-slate-700'
                            id='offer'
                            name='offer'
                            type='number'
                            placeholder='Ingresa tu oferta'
                            value={formik.values.offer}
                            onChange={formik.handleChange}
                            autoComplete='offer'
                        />
                        {/* Capturo el error */}
                        {formik.touched.offer && formik.errors.offer ? (
                            <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                                <p className='font-bold'>Error</p>
                                <p>{formik.errors.offer}</p>
                            </div>
                        ) : null}
                    </div>
                    <div className='flex items-center justify-between gap-2'>
                        <button
                            className={`bg-slate-800 w-full hover:bg-slate-900 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                            type='submit'
                        >
                            Realizar Oferta
                        </button>
                        <button
                            className='bg-red-600 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={closeModalOffer}
                        >
                            Cerrar
                        </button>
                    </div>
                </form>

            </Dialog>
        </div>
    );
}
export default DashboardAuctionClosed;
