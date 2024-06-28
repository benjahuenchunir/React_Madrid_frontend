import './reportsCard.scss'
import ReportCard from './reportCard.jsx';

const ReportsCard = ( {reports, messages, users, handleDeleteMessage, handleDeleteAccount, handleDeleteReport} ) => {

    return (
        <div id="reports-card-container">
            <div className="reports-card">
                <h1>Reports</h1>
                {(!reports || reports.length === 0) ? (
                  <p>No hay reportes</p>
                ) : (reports.map(report => {
                    const relatedMessage = messages.find(message => message.id === report.id_message);
                    if (!relatedMessage) {
                        return null;
                    }
                    const relatedUser = users.find(user => user.id === relatedMessage.id_user);
                    if (!relatedUser) {
                        return null;
                    }
                    return (<ReportCard
                      report={report}
                      relatedMessage={relatedMessage}
                      relatedUser={relatedUser}
                      handleDeleteMessage={handleDeleteMessage}
                      handleDeleteAccount={handleDeleteAccount}
                      handleDeleteReport={handleDeleteReport}
                    />);
                }))}
            </div>
        </div>
    )
}

export default ReportsCard;