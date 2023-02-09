import React, { useEffect, useRef, useState } from "react";
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import logo from '../../assets/img/logo.png';
import '../../App.css';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function DashboardAuctionProducts() {

    //const [competence, setCompetence] = useState([]);
    const [products, setProducts] = useState([]);
    const [competenceDialog, setCompetenceDialog] = useState(false);
    const [disabledCompetenceDialog, setDisabledCompetenceDialog] = useState(false);
    const [disabledCompetencesDialog, setDisabledCompetencesDialog] = useState(false);
    const [competence, setCompetence] = useState([]);
    const [product, setProduct] = useState(null);
    const [selectedCompetences, setSelectedCompetences] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [globalFilter, setGlobalFilter] = useState(null);
    const [selectType, setSelectType] = useState(null);
    const [selectProgram, setSelectProgram] = useState(null);
    const [program, setProgram] = useState(new Array());
    const [optionsProgram, setOptionsProgram] = useState([]);
    //Se declara un estado para controlar cuando se edita o se crea una competencia
    const [isView, setIsView] = useState(false);

    //Referencias
    const toast = useRef(null);
    const dt = useRef(null);

    /**
     * Metodo para cargar las competencias de la base de datos
     */
    const loadProducts = () => {
        let baseUrl = "http://localhost:8081/api/products";
        axios.get(baseUrl).then(response => {
            setProducts(
                response.data.map((product) => {
                    return {
                        id: product.id,
                        code: product.code,
                        name: product.name,
                        initialValueOffer: product.initialValueOffer,
                        state: product.state,
                    }
                })
            )
        }
        );
    };

    const formik = useFormik({
        initialValues: {
            id: '',
            code: '',
            name: '',
            initialValueOffer: '',
            state: '',
        },
        validationSchema: Yup.object({
            codigo: Yup.number().required('El código es obligatorio'),
            nombre: Yup.string().required('El nombre es obligatorio'),
            valor_inicial_oferta: Yup.number().required('El precio inicial de la oferta es obligatorio'),
        }),
        onSubmit: values => {
            console.log(values);
            //hacemos la peticion a la api para guardar el registro
            fetch('http://localhost:8081/api/products', {
                method: 'POST',
                body: JSON.stringify(values),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    toast.current.show({ severity: 'success', summary: 'Crear producto', detail: 'Producto creado exitosamente', life: 4000 });
                    //cerramos el modal 
                    hideDialog();
                    //resetear el formulario
                    formik.resetForm();
                    //recargamos la tabla
                    loadProducts();
                })
                .catch(err => console.log(err));
        },
    });

    useEffect(() => {
        loadProducts();

    }, []);

    const openNew = () => {
        setSubmitted(false);
        setCompetenceDialog(true);
    }

    const hideDialog = () => {
        setSubmitted(false);
        setCompetenceDialog(false);
        formik.resetForm();
        setIsView(false);
    }

    const hideDisabledCompetenceDialog = () => {
        setDisabledCompetenceDialog(false);
    }

    const hideDeleteCompetencesDialog = () => {
        setDisabledCompetencesDialog(false);
    }

    /**
     * Metodo que me muestra el dialog para editar una competencia y actualizarla en la base de datos
     * @param {*} product competencia a editar
     */
    const viewProduct = (product) => {
        formik.setFieldValue('id', product.id)
        formik.setFieldValue('code', product.code);
        formik.setFieldValue('name', product.name);
        formik.setFieldValue('initialValueOffer', product.initialValueOffer);
        formik.setFieldValue('state', product.state);
        setCompetenceDialog(true);
        setIsView(true);
    }
    /**
     * Metodo para abrir una subasta a un producto haciendo una peticion a la api
     * @param {*} product objeto con los datos del proucto a subastar
     */
    const openAuction = (product) => {
        console.log("abrir subasta")
    }

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === id) {
                index = i;
                break;
            }
        }
        return index;
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button label="Ir a las subastas" icon="pi pi-arrow-left" className="mr-2 bg-slate-700 hover:bg-gray-900 border-gray-800" onClick={(e) => {
                    window.location.href = "/dashboard-auction";
                    setIsView(false)
                }} />
            </React.Fragment>
        )
    }

    /**
     * Template de las acciones de la tabla de competencias
     * @param {*} rowData informacion de la fila
     * @returns 
     */
    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-eye" className="p-button-rounded mr-2 bg-blue-600 hover:bg-blue-700" onClick={() => viewProduct(rowData)} />
            </React.Fragment>
        );
    }
    const stateBodyTemplate = (rowData) => {
        return <span className={`${rowData.state === "Pendiente" ? 'bg-yellow-400' : 'bg-green-500' } font-bold rounded-md px-3 py-1`}>{rowData.state}</span>;
    }
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.initialValueOffer);
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Productos con y sin subasta disponible</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    return (
        <div className="datatable-crud-demo">
        <Toast ref={toast} />

        <div className="card">
            <Toolbar className="mb-4" left={leftToolbarTemplate}></Toolbar>
            <DataTable ref={dt} value={products} selection={selectedCompetences} onSelectionChange={(e) => setSelectedCompetences(e.value)}
                dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
                globalFilter={globalFilter} header={header} responsiveLayout="stack">
                <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                <Column field="id" header="Id" style={{ minWidth: '9rem' }}></Column>
                <Column field="code" header="Código" style={{ minWidth: '9rem' }}></Column>
                <Column field="name" header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
                <Column field="initialValueOffer" sortable header="Precio inicial" body={priceBodyTemplate} ></Column>
                <Column field="state" header="Estado subasta" body={stateBodyTemplate} ></Column>
                <Column body={actionBodyTemplate} header="Opciones" exportable={false} style={{ minWidth: '8rem' }}></Column>
            </DataTable>
        </div>

        <Dialog visible={competenceDialog} style={{ width: '450px' }}
            header={<img src={logo} alt={"logo"} className="block m-auto pb-0 w-3 " />}
            modal className="p-fluid" onHide={hideDialog}>
            <div className="title-form" style={{ color: "#424242", fontWeight: "bold", fontSize: "22px" }}>
                <p style={{ marginTop: "0px" }}>
                    {formik.values.state === "Pendiente" ? "Este producto no ha sido subastado" : "Producto con subasta activa"}
                </p>
            </div>

            <form className='mt-5' onSubmit={formik.handleSubmit}  >
                <div className='mb-4'>
                    <label
                        htmlFor="code"
                        className='block text-gray-700 text-sm font-bold mb-2 text-start'>
                        Código
                    </label>
                    <input
                        className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-gray-300'
                        id='code'
                        name='code'
                        type='number'
                        placeholder='Código del producto'
                        value={formik.values.code}
                        onChange={formik.handleChange}
                        autoComplete='code'
                    />
                    {/* Capturo el error */}
                    {formik.touched.code && formik.errors.code ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error</p>
                            <p>{formik.errors.code}</p>
                        </div>
                    ) : null}
                </div>
                <div className='mb-4'>
                    <label
                        htmlFor="name"
                        className='block text-gray-700 text-sm font-bold mb-2 text-start'>
                        Nombre
                    </label>
                    <input
                        className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-300'
                        id='name'
                        name='name'
                        type='text'
                        placeholder='Nombre del producto'
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
                        className='block text-gray-700 text-sm font-bold mb-2 text-start'
                        htmlFor='initialValueOffer'>
                        Precio inicial
                    </label>
                    <input
                        className='shadow appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-gray-300'
                        id='initialValueOffer'
                        name='initialValueOffer'
                        type='number'
                        placeholder='Precio inicial del producto'
                        value={formik.values.initialValueOffer}
                        onChange={formik.handleChange}
                        autoComplete='initialValueOffer'
                    />
                    {/* Capturo el error */}
                    {formik.touched.initialValueOffer && formik.errors.initialValueOffer ? (
                        <div className='my-2 bg-red-100 border-l-4 border-red-500 text-red-700 p-4'>
                            <p className='font-bold'>Error</p>
                            <p>{formik.errors.initialValueOffer}</p>
                        </div>
                    ) : null}
                </div>
                <div className='flex items-center justify-between gap-2'>
                    <button
                        className='bg-red-600 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                        type='button'
                        onClick={hideDialog}
                    >
                        Cerrar
                    </button>
                </div>
            </form>

        </Dialog>
    </div>
    );
}
export default DashboardAuctionProducts