import PropTypes from 'prop-types';

const FileDisplay = ({ containerClass, file, onClick}) => (
    <>
        {['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'].includes(file.name.split('.').pop().toLowerCase()) ? (
            <img src={file.fileUrl} alt={file.name} className="message-image-display" onClick={onClick}/>
        ) : (
            <div className={containerClass} onClick={onClick}>
                <img src="/file_icon.svg" alt="Archivo" className='file-icon' />
                <div className="file-info">
                    <div className="file-name">{file.name}</div>
                    <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
                </div>
            </div>
        )
        }
    </>
);

FileDisplay.propTypes = {
    containerClass: PropTypes.string,
    file: PropTypes.object.isRequired,
    onClick: PropTypes.func
};

export default FileDisplay;