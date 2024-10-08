import './reportCard.scss'
import PropTypes from 'prop-types'

const ReportCard = ( {report, relatedMessage, relatedUser, handleDeleteMessage, handleDeleteAccount, handleDeleteReport} ) => {
    return (
        <div id="report-card-container">
          <div className="report-card">
            <h2>Usuario: {relatedUser ? relatedUser.name + ' ' + relatedUser.lastName : "Cargando Usuario..."}</h2>
            <p>Mensaje: {relatedMessage ? relatedMessage.message : "Cargando mensaje..."}</p>
            <p>Motivo: {report.message}</p>
            <p>Tipo: {report.type}</p>
            <div className="button-group">
              <button onClick={() => handleDeleteMessage(report)}>Borrar Mensaje</button>
              <button onClick={() => handleDeleteAccount(report)}>Borrar Usuario</button>
              <button onClick={() => handleDeleteReport(report)}>Ignorar Reporte</button>
            </div>
            </div>
        </div>
    )
}

ReportCard.propTypes = {
    report: PropTypes.object.isRequired,
    relatedMessage: PropTypes.object.isRequired,
    relatedUser: PropTypes.object.isRequired,
    handleDeleteMessage: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired,
    handleDeleteReport: PropTypes.func.isRequired,
}

export default ReportCard;