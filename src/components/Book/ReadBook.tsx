"use client";
import React from "react";
import { useCallback, useState, useMemo } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { Button } from "../ui/button";
import axios from "axios";
// import "./Sample.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url
).toString();

const options = {
    cMapUrl: "/cmaps/",
    standardFontDataUrl: "/standard_fonts/",
};

const resizeObserverOptions = {};

const maxWidth = 800;

const ReadBook = ({ file }: { file: string }) => {
    // const file = `https://cdn.jsdelivr.net/gh/msanchariii/pdfs@master/JennaRainey.pdf`;
    const [numPages, setNumPages] = useState<number>();
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [containerRef, setContainerRef] = useState<HTMLElement | null>(null);
    const [containerWidth, setContainerWidth] = useState<number>();

    const onResize = useCallback<ResizeObserverCallback>((entries) => {
        const [entry] = entries;

        if (entry) {
            setContainerWidth(entry.contentRect.width);
        }
    }, []);

    useResizeObserver(containerRef, resizeObserverOptions, onResize);

    const onDocumentLoadSuccess = useCallback(
        ({ numPages: nextNumPages }: PDFDocumentProxy): void => {
            setNumPages(nextNumPages);
            setPageNumber(1); // Reset to the first page on new document load
        },
        []
    );

    const goToPrevPage = useCallback(
        () => setPageNumber((prevPage) => Math.max(prevPage - 1, 1)),
        []
    );

    const goToNextPage = useCallback(
        () =>
            setPageNumber((prevPage) => Math.min(prevPage + 1, numPages || 1)),
        [numPages]
    );

    const pdfComponent = useMemo(
        () => (
            <Document
                file={file}
                onLoadSuccess={onDocumentLoadSuccess}
                options={options}
            >
                <Page
                    className={``}
                    pageNumber={pageNumber}
                    width={
                        containerWidth
                            ? Math.min(containerWidth, maxWidth)
                            : maxWidth
                    }
                />
            </Document>
        ),
        [file, onDocumentLoadSuccess, pageNumber, containerWidth]
    );

    return (
        <div className="Example">
            <div className="Example__container" ref={setContainerRef}>
                {pdfComponent}
                <div className="navigation w-[50vw] flex justify-between">
                    <Button onClick={goToPrevPage} disabled={pageNumber <= 1}>
                        Previous
                    </Button>
                    <span>
                        Page {pageNumber} of {numPages}
                    </span>
                    <Button
                        onClick={goToNextPage}
                        disabled={pageNumber >= (numPages || 1)}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ReadBook); // Wrap PdfPage with React.memo to memoize rendering
