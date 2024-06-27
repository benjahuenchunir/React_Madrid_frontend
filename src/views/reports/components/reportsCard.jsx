import './reportsCard.scss'
import ReportCard from './reportCard.jsx';

const ReportsCard = ( {reports, messages, users, handleDeleteMessage, handleDeleteAccount, handleDeleteReport} ) => {

    return (
        <div id="reports-card-container">
            <div className="reports-card">
                <h1>Reports</h1>
                {reports.map(report => {
                    const relatedMessage = messages.find(message => message.id === report.id_message);
                    const relatedUser = users.find(user => user.id === relatedMessage.id_user);
                    return (<ReportCard
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

export default ReportsCard;