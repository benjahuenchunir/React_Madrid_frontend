import { useState, useEffect } from 'react';
import '../FileGallery/FileGallery.scss';
import PropTypes from 'prop-types';
import FileDisplay from '../FileDisplay/FileDisplay';

const FileGallery = ({ files, onClose }) => {
    const [selectedFileIndex, setSelectedFileIndex] = useState(0);
    const [fileObjects, setFileObjects] = useState([]);
    const [showMorePreview, setShowMorePreview] = useState(null);
    const maxFilesDisplayed = 3

    useEffect(() => {
        if (!files || files.length == 0) {
            setFileObjects([]);
            return;
        }

        setSelectedFileIndex(0);
        const processFiles = async () => {
            const processedFiles = await Promise.all(files.map(file => {
                if (file.type.startsWith('image/')) {
                    return new Promise((resolve) => {
                        const reader = new FileReader();
                        reader.onload = () => resolve({ name: file.name, size: file.size, fileUrl: reader.result });
                        reader.onerror = () => resolve({ error: true });
                        reader.readAsDataURL(file);
                    });
                } else {
                    return Promise.resolve({ name: file.name, size: file.size, type: file.type });
                }
            }));

            setFileObjects(processedFiles);
            setShowMorePreview(files.length > maxFilesDisplayed ? files.length - maxFilesDisplayed : null);
        };

        processFiles();
    }, [files]);

    const renderThumbnail = (file, index) => (
        <div key={index} className={`file-thumbnail ${index === selectedFileIndex ? 'selected' : ''}`} onClick={() => handleThumbnailClick(index)}>
            {file.fileUrl ? (
                <img src={file.fileUrl} alt={`File ${index}`} className='img-preview' />
            ) : (
                <img src="/file_icon.svg" alt={`File ${index}`} className='file-icon' />
            )}
        </div>
    );

    const handleThumbnailClick = (index) => {
        setSelectedFileIndex(index);
    };

    if (!fileObjects || fileObjects.length == 0) return null;

    return (
        <div id="file-gallery-container">
            <button id="btn-close" onClick={onClose} />
            <div className="selected-file-display">
                <FileDisplay containerClass="file-display" file={fileObjects[selectedFileIndex]} />
            </div>
            <div className="file-thumbnails-container">
                {fileObjects.slice(0, showMorePreview ? maxFilesDisplayed : fileObjects.length).map(renderThumbnail)}
                {showMorePreview && (
                    <div className="more-preview">+{showMorePreview} más</div>
                )}
                {/* TODO make this do something on click */}
            </div>
        </div>
    );
};

FileGallery.propTypes = {
    files: PropTypes.array.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default FileGallery;