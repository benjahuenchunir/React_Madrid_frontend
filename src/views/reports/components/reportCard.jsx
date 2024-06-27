import './reportCard.scss'

const ReportCard = ( {report, relatedMessage, relatedUser, handleDeleteMessage, handleDeleteAccount, handleDeleteReport} ) => {
    return (
        <div id="report-card-container">
          <div className="report-card">
            <h2>Usuario: {relatedUser ? relatedUser.name + ' ' + relatedUser.last_name : "Cargando Usuario..."}</h2>
            <p>Mensaje: {relatedMessage ? relatedMessage.message : "Cargando mensaje..."}</p>
            <p>Motivo: {report.message}</p>
            <p>Tipo: {report.type}</p>
            <div className="button-group">
              <button onClick={() => handleDeleteMessage(report.id_message)}>Borrar Mensaje</button>
              <button onClick={() => handleDeleteAccount(report.id_message)}>Borrar Usuario</button>
              <button onClick={() => handleDeleteReport(report.id)}>Ignorar Reporte</button>
            </div>
            </div>
        </div>
    )
}

export default ReportCard;