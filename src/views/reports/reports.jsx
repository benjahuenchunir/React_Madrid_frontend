import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../../auth/useAuth';
import './reports.scss';

// Apartado para ver los reportes a todos los mennsajes (supongamos que esta es una vista de administrador)
// Tres botones para 1) eliminar el mensaje 2) borrar al usuario 3) ignorar el reporte.

const Reports = () => {
    const { token, logout } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [reports, setReports] = useState(null);

    useEffect(() => {
        let userId = null;

        if (token && token !== 'null') {
            const decodedToken = jwtDecode(token);
            userId = decodedToken.sub;

            const config = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/reports`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(config)
                .then(response => {
                    setReports(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reports:', error);
                    setIsAuthorized(false);
                });
        } else {
            setIsAuthorized(false);
        }

    }, [token]);

    const handleDeleteMessage = (id_message) => {
        const config = {
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/messages/${id_message}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }    
        };

        axios(config)
            .then(response => {
                console.log('Message deleted:', response.status);
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    }

    const handleDeleteAccount = (id_message) => {
        // No es tan directo ya que report no tiene el id_user
        // Lo que sí tiene es el id_message, por lo que se puede obtener el id_user a partir de id_message
        // Se puede hacer un get a /messages/:id_message para obtener el id_user

        const config = {
            method: 'get',
            url: `${import.meta.env.VITE_BACKEND_URL}/messages/${id_message}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(response => {
                const id_user = response.data.id_user;
                const config = {
                    method: 'delete',
                    url: `${import.meta.env.VITE_BACKEND_URL}/users/${id_user}`,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                };

                axios(config)
                    .then(response => {
                        console.log('Account deleted:', response.status);
                    })
                    .catch(error => {
                        console.error('Error deleting account:', error);
                    });
            })
    }
    
    const handleDeleteReport = (id) => {
        const config = {
            method: 'delete',
            url: `${import.meta.env.VITE_BACKEND_URL}/reports/${id}`,
            headers: {
                'Authorization': `Bearer ${token}`
            }
        };

        axios(config)
            .then(response => {
                console.log('Report deleted:', response.status);
            }
            )
            .catch(error => {
                console.error('Error deleting report:', error);
            }
            );
    }
        

    if (!isAuthorized) {
        return <p>Unauthorized</p>;
    }

    if (!reports) {
        return <p>Loading...</p>;
    }

    return (
        <div className="reports">
            <h1>Reports</h1>
            <ul>
                {reports.map(report => (
                    <div key={report.id}>
                        <p>{report.id_message}</p>
                        <p>{report.message}</p>
                        <p>{report.type}</p>
                        <button onClick={() => handleDeleteMessage(report.id_message)}>Borrar Mensaje</button>
                        <button onClick={() => handleDeleteAccount(report.id_message)}>Borrar Usuario</button>
                        <button onClick={() => handleDeleteReport(report.id)}>Ignorar Reporte</button>
                    </div>
                ))}
            </ul>
        </div>
    );
}
    

export default Reports;