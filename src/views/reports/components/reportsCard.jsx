import './reportsCard.scss'
import ReportCard from './reportCard.jsx';
import PropTypes from 'prop-types'

const ReportsCard = ({ reports, messages, users, handleDeleteMessage, handleDeleteAccount, handleDeleteReport }) => {

    return (
        <div id="reports-card-container">
            <div className="reports-card">
                <h1>Reportes</h1>
                {reports.length === 0 && <p>No hay reportes</p>}
                {reports.map((report, index) => {
                    const relatedMessage = messages.find(message => message.id === report.idMessage);
                    const relatedUser = users.find(user => user.id === relatedMessage.idUser);
                    return (<ReportCard
                        key={index}
                        report={report}
                        relatedMessage={relatedMessage}
                        relatedUser={relatedUser}
                        handleDeleteMessage={handleDeleteMessage}
                        handleDeleteAccount={handleDeleteAccount}
                        handleDeleteReport={handleDeleteReport}
                    />);
                })}
            </div>
        </div>
    )
}

ReportCard.propTypes = {
    reports: PropTypes.array.isRequired,
    messages: PropTypes.array.isRequired,
    users: PropTypes.array.isRequired,
    handleDeleteMessage: PropTypes.func.isRequired,
    handleDeleteAccount: PropTypes.func.isRequired,
    handleDeleteReport: PropTypes.func.isRequired,
}

export default ReportsCard;