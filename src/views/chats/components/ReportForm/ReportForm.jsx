import { useState, useImperativeHandle, forwardRef } from 'react';
import './ReportForm.scss';
import OtherMessageDisplay from '../OtherMessageDisplay'
import PropTypes from 'prop-types';

const ReportType = {
    SPAM: 'spam',
    HATE: 'odio',
    INAPPROPIATE_CONTENT: 'contenido inapropiado',
    OTHER: 'otros'
};

const ReportDialog = forwardRef((props, ref) => {
    const { messages, idUser } = props;
    const [reportType, setReportType] = useState(ReportType.SPAM);
    const [reportText, setReportText] = useState('');
    const [currentMessageId, setCurrentMessageId] = useState(null);

    useImperativeHandle(ref, () => ({
        open: (messageId) => {
            setCurrentMessageId(messageId);
        },
        close: () => setCurrentMessageId(null),
    }));

    const handleReportTypeChange = (event) => {
        setReportType(event.target.value);
    };

    const handleReportTextChange = (event) => {
        setReportText(event.target.value);
    };

    if (!currentMessageId) return null;

    return (
        <>
            <div className="modal-overlay"></div>
            <dialog id="report-form" open={currentMessageId}>
                <button onClick={() => setCurrentMessageId(null)} id='btn-close'/>
                <OtherMessageDisplay
                    messages={messages}
                    otherMessageId={currentMessageId}
                    current_user_id={idUser}
                    containerClass="reported-message-display"
                />
                
                <select value={reportType} onChange={handleReportTypeChange} className='report-type-selector'>
                    {Object.entries(ReportType).map(([key, value]) => (
                        <option key={key} value={value}>
                            {value}
                        </option>
                    ))}
                </select>
                <textarea
                    value={reportText}
                    onChange={handleReportTextChange}
                    className='report-text'
                />
                <button>Reportar</button>
            </dialog>
        </>
    );
});

ReportDialog.displayName = 'ReportDialog';
ReportDialog.propTypes = {
    messages: PropTypes.array.isRequired,
    idUser: PropTypes.number.isRequired,
};

export default ReportDialog;