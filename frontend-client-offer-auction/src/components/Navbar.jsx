import React, { useEffect, useRef, useState } from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

function Navbar({ user }) {
    const [userSession, setUserSession] = useState(user);
    const items = [
        {
            label: 'Subasta',
            icon: 'pi pi-dollar',
            items: [
                {
                    label: 'Subastas activas',
                    icon: 'pi pi-eye',
                    command: () => {
                        window.location = "/dashboard-auction"
                    }
                },
                {
                    label: 'Subastas cerradas',
                    icon: 'pi pi-eye-slash',
                    command: () => {
                        window.location = "/dashboard-auction-closed"
                    }
                },
            ],
        },
        {
            label: 'Productos',
            icon: 'pi pi-shopping-cart',
            items: [
                {
                    label: 'Ver productos',
                    icon: 'pi pi-eye',
                    command: () => {
                        window.location = "/dashboard-products"
                    }
                },
            ],
        },
    ];

    const logOut = () => {
        console.log("salir");
        localStorage.setItem("user", null);
        window.location = "/login";
    }

    return (
        <div className=''>
            {userSession ?
                (
                    <Menubar model={items}
                        className="shadow-lg"
                        end={
                            <Button
                                label="Cerrar sesión"
                                className="p-button-danger"
                                icon="pi pi-power-off " 
                                onClick={() => logOut()} />
                        } />
                )
                :
                (
                    null
                )
            }
        </div>
    );
}
export default Navbar;
