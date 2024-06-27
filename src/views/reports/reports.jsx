import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { useAuth } from '../../auth/useAuth';
import './reports.scss';
import ReportsCard from './components/reportsCard.jsx';

const Reports = () => {
    const svgRef = useRef(null);
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

    useEffect(() => {
        const adjustSvgPosition = () => {

        if (!svgRef.current) {
            return;
        }

        if (window.innerWidth > 1024) {
            svgRef.current.style.right = 0;
            svgRef.current.style.left = 'auto';
            return;
        }

        if (svgRef.current) {
            const svgWidth = svgRef.current.offsetWidth;
            const viewportWidth = window.innerWidth;
            const leftPosition = (viewportWidth - svgWidth) / 2;
            svgRef.current.style.left = `${leftPosition}px`;
        }
        };

        adjustSvgPosition(); // Adjust position when component mounts

        window.addEventListener('resize', adjustSvgPosition); // Adjust position when window is resized

        // Clean up event listener when component is unmounted
        return () => {
        window.removeEventListener('resize', adjustSvgPosition);
        };
    }, []);

    if (!isAuthorized) {
        return <p>Unauthorized</p>;
    }

    if (!reports) {
        return <p>No hay reportes</p>;
    }

    return (
        <div id="reports-container">
            <div className="content">
                <div className="reports-container">
                    <img ref={svgRef} src="/ship_with_stars.svg" alt="Ship on ground" className="reports-fixed-bottom"/>
                    <ReportsCard
                      reports={reports}
                      messages={messages}
                      users={users}
                      handleDeleteMessage={handleDeleteMessage}
                      handleDeleteAccount={handleDeleteAccount}
                      handleDeleteReport={handleDeleteReport}
                    />
                </div>
            </div>
        </div>
    );
}

export default Reports;
