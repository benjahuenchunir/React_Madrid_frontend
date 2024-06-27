import './reportsCard.scss'

const ReportsCard = ( {reports, messages, users, handleDeleteMessage, handleDeleteAccount, handleDeleteReport} ) => {

    return (
        <div id="reports-card-container">
            <div className="reports-card">
                <h1>Reports</h1>
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
            </div>
        </div>
    )
}

export default ReportsCard;