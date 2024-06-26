import { useState, useEffect } from 'react';
import './FileGallery.scss';
import PropTypes from 'prop-types';

const FileGallery = ({ files }) => {
    const [selectedFileIndex, setSelectedFileIndex] = useState(0);
    const [fileObjects, setFileObjects] = useState([]);
    const [showMorePreview, setShowMorePreview] = useState(null);
    const maxFilesDisplayed = 4

    useEffect(() => {
        if (!files || files.length == 0) return;

        const newFileObjects = files.map((file) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setFileObjects((prevUrls) => {
                    const updatedUrls = [...prevUrls];
                    updatedUrls[files.indexOf(file)] = reader.result;
                    return updatedUrls;
                });
            };
            return null;
        });
        setFileObjects(newFileObjects);
        setSelectedFileIndex(0);

        if (files.length > maxFilesDisplayed) {
            setShowMorePreview(files.length - maxFilesDisplayed)
        } else {
            setShowMorePreview(null)
        }
    }, [files]);

    const handleThumbnailClick = (index) => {
        setSelectedFileIndex(index);
    };

    if (!files || files.length == 0) return null;

    return (
        <div id="file-gallery-container">
            <div className="selected-file-display">
                {fileObjects[selectedFileIndex] && (
                    <img src={fileObjects[selectedFileIndex]} alt={`Selected file ${selectedFileIndex}`} />
                )}
            </div>
            <div className="file-thumbnails-container">
                {showMorePreview ? fileObjects.slice(0, maxFilesDisplayed).map((url, index) => (
                    url && <img
                        key={index}
                        src={url}
                        alt={`File ${index}`}
                        className={`file-thumbnail ${index === selectedFileIndex ? 'selected' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                )) : fileObjects.map((url, index) => (
                    url && <img
                        key={index}
                        src={url}
                        alt={`File ${index}`}
                        className={`file-thumbnail ${index === selectedFileIndex ? 'selected' : ''}`}
                        onClick={() => handleThumbnailClick(index)}
                    />
                ))}
                {showMorePreview && (
                    <div className="more-preview">+{showMorePreview} más</div>
                )}
                {/* TODO make this button work */}
            </div>
        </div>
    );
};

FileGallery.propTypes = {
    files: PropTypes.array.isRequired,
};

export default FileGallery;