import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import PropTypes from 'prop-types';

export default function PdfViewer (props) {
    return (
        <div className="w-full h-screen">
            <Worker workerUrl={`https://unpkg.com/pdfjs-dist@2.11.338/build/pdf.worker.min.js`}>
                <div className="pdf-container h-full">
                    <Viewer fileUrl={props.fileUrl} />
                </div>
            </Worker>
        </div>
    );
}

PdfViewer.propTypes = {
    fileUrl: PropTypes.string.isRequired,
};


