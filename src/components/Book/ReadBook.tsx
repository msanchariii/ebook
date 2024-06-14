"use client";
import React from "react";
import { useCallback, useState, useMemo } from "react";
import { useResizeObserver } from "@wojtekmaj/react-hooks";
import { pdfjs, Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

import type { PDFDocumentProxy } from "pdfjs-dist";
import { Button } from "../ui/button";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.js",
    import.meta.url,
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
        [],
    );

    const goToPrevPage = useCallback(
        () => setPageNumber((prevPage) => Math.max(prevPage - 1, 1)),
        [],
    );

    const goToNextPage = useCallback(
        () =>
            setPageNumber((prevPage) => Math.min(prevPage + 1, numPages || 1)),
        [numPages],
    );

    const pdfComponent = useMemo(
        () => (
            <div className="mx-auto w-full shadow-lg">
                <Document
                    file={file}
                    onLoadSuccess={onDocumentLoadSuccess}
                    options={options}
                >
                    <Page
                        // className={``}
                        pageNumber={pageNumber}
                        width={
                            containerWidth
                                ? Math.min(containerWidth, maxWidth)
                                : maxWidth
                        }
                        // height={10}
                    />
                </Document>
            </div>
        ),
        [file, onDocumentLoadSuccess, pageNumber, containerWidth],
    );

    return (
        <div className="mx-auto w-full max-w-7xl lg:w-2/3">
            <div className="mx-auto">
                <div className="" ref={setContainerRef}>
                    {pdfComponent}
                    <div className="fixed bottom-0 w-full">
                        <div className="navigation mb-2 flex w-full justify-between rounded bg-emerald-500/50 p-4">
                            <Button
                                onClick={goToPrevPage}
                                disabled={pageNumber <= 1}
                            >
                                Previous
                            </Button>
                            <div>
                                <span>
                                    Page {pageNumber} of {numPages}
                                </span>
                            </div>
                            <Button
                                onClick={goToNextPage}
                                disabled={pageNumber >= (numPages || 1)}
                            >
                                Next
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(ReadBook); // Wrap PdfPage with React.memo to memoize rendering
