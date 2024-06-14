"use client";
import React, { useEffect, useRef, useState } from "react";
import { getDocument, PDFDocumentProxy } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

const PdfViewer: React.FC<{ pdfUrl: string }> = ({ pdfUrl }) => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [pdf, setPdf] = useState<PDFDocumentProxy | null>(null);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [numPages, setNumPages] = useState<number | null>(null);
    const renderTaskRef = useRef<any>(null); // Change the type if possible
    const [sliderValue, setSliderValue] = useState<number>(1);

    useEffect(() => {
        const loadPdf = async () => {
            const loadingTask = getDocument(pdfUrl);
            const loadedPdf = await loadingTask.promise;
            setPdf(loadedPdf);
            setNumPages(loadedPdf.numPages);
            setSliderValue(pageNumber); // Initialize slider value
            renderPage(loadedPdf, pageNumber);
        };

        loadPdf();
    }, [pdfUrl, pageNumber]);

    useEffect(() => {
        if (pdf) {
            renderPage(pdf, pageNumber);
        }
    }, [pdf, pageNumber]);

    const renderPage = async (pdf: PDFDocumentProxy, pageNumber: number) => {
        if (renderTaskRef.current) {
            renderTaskRef.current.cancel();
        }

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext("2d");
        if (!context) return;

        const canvasWidth = window.innerWidth; // Full screen width

        const scale = canvasWidth / viewport.width; // Scale to fit width
        const scaledViewport = page.getViewport({ scale });

        canvas.height = scaledViewport.height;
        canvas.width = canvasWidth;

        const renderContext = {
            canvasContext: context,
            viewport: scaledViewport,
        };

        renderTaskRef.current = page.render(renderContext);
        try {
            await renderTaskRef.current.promise;
        } catch (err: any) {
            if (err.name !== "RenderingCancelledException") {
                console.error(err);
            }
        }
    };

    const handlePrevious = () => {
        if (pageNumber > 1) {
            setPageNumber((prevPageNumber) => prevPageNumber - 1);
            setSliderValue((prevPageNumber) => prevPageNumber - 1);
        }
    };

    const handleNext = () => {
        if (pageNumber < (numPages ?? 1)) {
            setPageNumber((prevPageNumber) => prevPageNumber + 1);
            setSliderValue((prevPageNumber) => prevPageNumber + 1);
        }
    };

    const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSliderValue(parseInt(event.target.value, 10));
    };

    const handleSliderMouseUp = () => {
        setPageNumber(sliderValue);
    };

    useEffect(() => {
        const disableRightClick = (e: MouseEvent) => {
            e.preventDefault();
        };
        document.addEventListener("contextmenu", disableRightClick);
        return () => {
            document.removeEventListener("contextmenu", disableRightClick);
        };
    }, []);

    return (
        <div className="flex w-full flex-col items-center">
            <div className="w-full max-w-screen-lg">
                <canvas
                    ref={canvasRef}
                    className="w-full rounded border shadow-lg"
                ></canvas>
            </div>
            <div className="my-4 flex w-full max-w-screen-lg justify-between">
                <button
                    onClick={handlePrevious}
                    disabled={pageNumber <= 1}
                    className="rounded bg-emerald-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={pageNumber >= (numPages ?? 1)}
                    className="rounded bg-emerald-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <div className="w-full max-w-screen-lg">
                <input
                    type="range"
                    min="1"
                    max={numPages ?? 1}
                    value={sliderValue}
                    onChange={handleSliderChange}
                    onMouseUp={handleSliderMouseUp}
                    onTouchEnd={handleSliderMouseUp} // for touch devices
                    className="w-full"
                />
            </div>
            <p className="mt-2 w-full max-w-screen-lg text-center">
                Jump to page {sliderValue}
            </p>
            <p className="mt-2 w-full max-w-screen-lg text-center">
                Page {pageNumber} of {numPages ?? "-"}
            </p>
        </div>
    );
};

export default PdfViewer;
