import { useEffect, useState } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../../auth/useAuth';
import './reports.scss';

const Reports = () => {
    const { token, logout } = useAuth();
    const [isAuthorized, setIsAuthorized] = useState(true);
    const [reports, setReports] = useState(null);
    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (token && token !== 'null') {
            const decodedToken = jwtDecode(token);

            const configReports = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/reports`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(configReports)
                .then(response => {
                    setReports(response.data);
                })
                .catch(error => {
                    console.error('Error fetching reports:', error);
                });

            const configMessages = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/messages`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(configMessages)
                .then(response => {
                    setMessages(response.data || []); 
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                    setMessages([]); 
                });

            const configUsers = {
                method: 'get',
                url: `${import.meta.env.VITE_BACKEND_URL}/users`,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            };

            axios(configUsers)
                .then(response => {
                    setUsers(response.data || []); 
                    console.log(response.data);
                })
                .catch(error => {
                    console.error('Error fetching users:', error);
                    setUsers([]);
                }  
            ); 
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

                setMessages(prevMessages => prevMessages.filter(message => message.id !== id_message));
            })
            .catch(error => {
                console.error('Error deleting message:', error);
            });
    }

    const handleDeleteAccount = (id_message) => {
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
            });
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
                setReports(prevReports => prevReports.filter(report => report.id !== id));
            })
            .catch(error => {
                console.error('Error deleting report:', error);
            });
    }

    if (!isAuthorized) {
        return <p>Unauthorized</p>;
    }

    if (!reports) {
        return <p>No hay reportes</p>;
    }

    return (
        <div className="reports">
            <h1>Reports</h1>
            <ul>
                {reports.map(report => {
                    const relatedMessage = messages.find(message => message.id === report.id_message);
                    const relatedUser = users.find(user => user.id === relatedMessage.id_user);
                    return (
                        <div key={report.id}>
                            <p>Usuario: {relatedUser ? relatedUser.name + ' ' + relatedUser.last_name: "Cargando Usuario..."}</p>
                            <p>Mensaje: {relatedMessage ? relatedMessage.message : "Cargando mensaje..."}</p>
                            <p>Motivo: {report.message}</p>
                            <p>Tipo: {report.type}</p>
                            <button onClick={() => handleDeleteMessage(report.id_message)}>Borrar Mensaje</button>
                            <button onClick={() => handleDeleteAccount(report.id_message)}>Borrar Usuario</button>
                            <button onClick={() => handleDeleteReport(report.id)}>Ignorar Reporte</button>
                        </div>
                    );
                })}
            </ul>
        </div>
    );
}

export default Reports;
