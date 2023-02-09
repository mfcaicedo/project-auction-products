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
import { useLocalStorage } from '../../utils/useLocalStorage';

import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function DashboardProductsOffered() {

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
    //Estado para recuperar el token del usuario autenticado
    const [user, setUser] = useLocalStorage('user', null);

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

    /**
     * Rrepresentacion del objeto que se va a guardar en la base de datos
     */
    let emptyProduct = {
        id: null,
        name: '',
        type: '',
        state: '',
        program: null,
    };

    const formik = useFormik({
        initialValues: {
            id: '',
            code: '',
            name: '',
            initialValueOffer: '',
            state: 'Pendiente',
        },
        validationSchema: Yup.object({
            code: Yup.number().required('El código es obligatorio'),
            name: Yup.string().required('El nombre es obligatorio'),
            initialValueOffer: Yup.number().required('El precio inicial de la oferta es obligatorio'),
        }),
        onSubmit: values => {
            console.log(values);
            //armo el objeot 
            let productSave = {
                code: values.code,
                name: values.name,
                initialValueOffer: values.initialValueOffer,
                state: values.state,
            }
            //hacemos la peticion a la api para guardar el registro
            fetch('http://localhost:8081/api/products', {
                method: 'POST',
                body: JSON.stringify(productSave),
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
        setCompetence(emptyProduct);
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

    const saveCompetence = () => {
        setSubmitted(true);
        //completo los campos 
        console.log("este ver", competence);
        competence.state = 'Activo';
        //busco el programa seleccionado
        let selectProgram = program.find(program => program.id === competence.program_id);
        competence.program = selectProgram ? selectProgram : null;
        //armo el objeto para guardarlo en la db posteriormente
        let competenceSave = {
            name: competence.name,
            program: competence.program,
            state: competence.state,
            type: competence.type,
        }
        console.log("que paso", competenceSave);
        if (!isView) {
            console.log("crear");
            // return 0 ; 
            //hago la peticion a la api para guardar el registro
            axios.post("http://localhost:8080/competence", competenceSave)
                .then(response => {
                    if (response.data != null) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Competencia creada', life: 5000 });
                        setCompetenceDialog(false);
                        setCompetence(emptyProduct);
                        loadProducts();
                    } else {
                        toast.current.show({
                            severity: 'error', summary: 'Error', detail: 'Ocurrió un error, por favor vuelve a intentarlo'
                            , life: 5000
                        });
                        setCompetenceDialog(false);
                        setCompetence(emptyProduct);
                    }
                });
        } else {
            console.log(competence.id)
            console.log('competence', competenceSave)
            // return 0; 
            //hago la peticion a la api para que guarde la competencia editada 
            axios.patch("http://localhost:8080/competence/" + competence.id, competenceSave)
                .then(response => {
                    if (response.data != null) {
                        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Competencia actualizada', life: 5000 });
                        setCompetenceDialog(false);
                        setCompetence(emptyProduct);
                        loadProducts();
                    } else {
                        toast.current.show({
                            severity: 'error', summary: 'Error', detail: 'Ocurrió un error, por favor vuelve a intentarlo'
                            , life: 5000
                        });
                        setCompetenceDialog(false);
                        setCompetence(emptyProduct);
                    }
                });
        }
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
        console.log("object", product);
        console.log("user", user);
        //recupero el id del usuario logueado

        //Creo el objeto de subasta 
        let auction = {
            idPersonOffered: user.id,
            valueOffered: product.initialValueOffer,
            auctionState: true,
            product: product
        }
        //hago la peticion a la api para guardar la subasta en la base de datos
        fetch('http://localhost:8081/api/auctions', {
            method: 'POST',
            body: JSON.stringify(auction),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //ahora actualizo el estado del producto a subastado haciendo una peticion a la api
                fetch('http://localhost:8081/api/products/updateState/' + product.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        //recargo la tabla
                        loadProducts();
                        // toast.current.show({ severity: 'success', summary: 'Actualizar producto', detail: 'Producto actualizado exitosamente', life: 4000 });
                    })
                    .catch(err => console.log(err));
                //mensaje de exito al crear la subasta
                toast.current.show({ severity: 'success', summary: 'Crear subasta', detail: 'Subasta creada exitosamente', life: 4000 });
            })
            .catch(err => console.log(err));

    }
    /**
     * Metodo para cerrar una subasta a un producto haciendo una peticion a la api
     * @param {*} product objeto con los datos del proucto a cerrar la subasta
     */
    const closeAuction = (product) => {
        console.log("product", product);
        //hago la peticion a la api para cerrar la subasta
        fetch('http://localhost:8081/api/auctions/close/' + product.id, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                //ahora actualizo el estado del producto a subastado haciendo una peticion a la api
                fetch('http://localhost:8081/api/products/updateState/' + product.id, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        //recargo la tabla
                        loadProducts();
                        console.log("producto actualizado");
                    })
                    .catch(err => console.log(err));
                //mensaje de exito al crear la subasta
                toast.current.show({ severity: 'success', summary: 'Cerrar subasta', detail: 'Subasta cerrada exitosamente', life: 4000 });
            })
            .catch(err => console.log("ver", err));
    }

    const confirmDeleteCompetence = (competence) => {
        setCompetence(competence);
        setDisabledCompetenceDialog(true);
    }
    /**
     * Metodo para desactivar una competencia de la base de datos
     */
    const disabledCompetence = () => {
        //desactivo el registro en la base de datos 
        axios.patch("http://localhost:8080/competence/disable/" + competence.id)
            .then(response => {
                if (response.data != null) {
                    toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Competencia desactivada', life: 5000 });
                    setDisabledCompetenceDialog(false);
                    setCompetence(emptyProduct);
                    loadProducts();
                }
            });
    }

    const confirmDeleteSelected = () => {
        setDisabledCompetencesDialog(true);
    }

    const deleteSelectedCompetences = () => {
        let _products = products.filter(val => !selectedCompetences.includes(val));
        setProducts(_products);
        setDisabledCompetencesDialog(false);
        setSelectedCompetences(null);
        toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Competencias desactivadas', life: 5000 });
    }

    const leftToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Nuevo producto"
                    icon="pi pi-plus"
                    className="mr-2 bg-slate-800 hover:bg-gray-900 border-gray-900"
                    onClick={(e) => {
                        openNew()
                        setIsView(false)
                    }} />
            </React.Fragment>
        )
    }
    const logOut = () => {
        localStorage.setItem("user", null);
        window.location.href = "/login";
    }
    const rightToolbarTemplate = () => {
        return (
            <React.Fragment>
                <Button
                    label="Cerrar sesión"
                    className="p-button-danger"
                    icon="pi pi-power-off "
                    onClick={() => logOut()} />
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
                <div className="flex flex-col lg:flex-row gap-2 justify-center">
                    <Button
                        icon="pi pi-eye"
                        className="p-button-rounded mr-2 bg-blue-600 hover:bg-blue-700"
                        onClick={() => viewProduct(rowData)} />
                    <Button
                        className="mr-2 bg-slate-800 hover:bg-gray-900 border-gray-900"
                        onClick={() => openAuction(rowData)}
                        hidden={rowData.state === 'En_Subasta' ? true : false}
                    >
                        Abrir subasta
                    </Button>
                    {console.log("Subasta", rowData.state)}
                    <Button
                        className="mr-2 bg-red-600 hover:bg-red-700 border-red-700"
                        onClick={() => closeAuction(rowData)}
                        hidden={rowData.state === 'En_Subasta' ? false : true}
                    >
                        Cerrar subasta
                    </Button>
                </div>
            </React.Fragment>
        );
    }

    const header = (
        <div className="table-header">
            <h5 className="mx-0 my-1">Productos a ofertar</h5>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Buscar..." />
            </span>
        </div>
    );
    const formatCurrency = (value) => {
        return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    }
    const priceBodyTemplate = (rowData) => {
        return formatCurrency(rowData.initialValueOffer);
    }
    return (
        <div className="datatable-crud-demo">
            <Toast ref={toast} />

            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate} right={rightToolbarTemplate}></Toolbar>
                <DataTable ref={dt} value={products} selection={selectedCompetences} onSelectionChange={(e) => setSelectedCompetences(e.value)}
                    dataKey="id" paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                    paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} productos"
                    globalFilter={globalFilter} header={header} responsiveLayout="stack">
                    <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} exportable={false}></Column>
                    <Column field="id" header="Id" style={{ minWidth: '9rem' }}></Column>
                    <Column field="code" header="Código" style={{ minWidth: '9rem' }}></Column>
                    <Column field="name" header="Nombre" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="initialValueOffer" header="Precio inicial" body={priceBodyTemplate} ></Column>
                    <Column field="state" header="Estado subasta" ></Column>
                    <Column body={actionBodyTemplate} header="Opciones" exportable={false} style={{ minWidth: '8rem' }}></Column>
                </DataTable>
            </div>

            <Dialog visible={competenceDialog} style={{ width: '450px' }}
                header={<img src={logo} alt={"logo"} className="block m-auto pb-0 w-3 " />}
                modal className="p-fluid" onHide={hideDialog}>
                <div className="title-form" style={{ color: "#424242", fontWeight: "semibold", fontSize: "22px" }}>
                    <p style={{ marginTop: "0px" }}>
                        Nuevo producto
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
                            className={`${isView ? 'cursor-not-allowed' : 'cursor-pointer'} bg-slate-800 hover:bg-slate-900 border-slate-800 w-full text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline`}
                            type='submit'
                            disabled={isView}
                        >
                            Guardar
                        </button>
                        <button
                            className='bg-red-600 w-full hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline'
                            type='button'
                            onClick={hideDialog}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>

            </Dialog>
        </div>
    );
}
export default DashboardProductsOffered