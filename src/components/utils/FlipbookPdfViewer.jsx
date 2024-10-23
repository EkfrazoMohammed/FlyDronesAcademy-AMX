import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the workerSrc to a stable version
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
const FlipbookPdfViewer = ({ pdfUrl }) => {
    const [numPages, setNumPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const onDocumentLoadSuccess = ({ numPages }) => {
        setNumPages(numPages);
    };

    const handleNextPage = () => {
        if (currentPage < numPages) {
            setCurrentPage(prev => prev + 1);
        }
    };

    const handlePrevPage = () => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1);
        }
    };

    return (
        <div className="flipbook-container">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
            <button onClick={handleNextPage} disabled={currentPage === numPages}>Next</button>

            <div className="flipbook">
                <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
                    <Page pageNumber={currentPage} width={500} className="pdf-page" />
                </Document>
            </div>
        </div>
    );
};

export default FlipbookPdfViewer;
