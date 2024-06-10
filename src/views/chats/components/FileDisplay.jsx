import PropTypes from 'prop-types';

const FileDisplay = ({ containerClass, file, onRemove }) => (
    <div className={containerClass}>
        <img src="/file_icon.svg" alt="Archivo" className='file-icon' />
        <div className="file-info">
            <div className="file-name">{file.name}</div>
            <div className="file-size">{(file.size / 1024).toFixed(2)} KB</div>
        </div>
        {onRemove && <button className="remove-file" onClick={onRemove} />}
    </div>
);

FileDisplay.propTypes = {
    containerClass: PropTypes.string,
    file: PropTypes.object.isRequired,
    onRemove: PropTypes.func,
};

export default FileDisplay;