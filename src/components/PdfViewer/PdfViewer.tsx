"use client";
import React, { useEffect, useRef, useState } from "react";
import { getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

const PdfViewer = ({ pdfUrl }) => {
    const canvasRef = useRef(null);
    const [pdf, setPdf] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const renderTaskRef = useRef(null);
    const [sliderValue, setSliderValue] = useState(1);

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
    }, [pdfUrl]);

    useEffect(() => {
        if (pdf) {
            renderPage(pdf, pageNumber);
        }
    }, [pdf, pageNumber]);

    const renderPage = async (pdf, pageNumber) => {
        if (renderTaskRef.current) {
            renderTaskRef.current.cancel();
        }

        const page = await pdf.getPage(pageNumber);
        const viewport = page.getViewport({ scale: 1 });

        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
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
        } catch (err) {
            if (err.name !== "RenderingCancelledException") {
                console.error(err);
            }
        }
    };

    const handlePrevious = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
            setSliderValue(pageNumber - 1);
        }
    };

    const handleNext = () => {
        if (pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
            setSliderValue(pageNumber + 1);
        }
    };

    const handleSliderChange = (event) => {
        setSliderValue(parseInt(event.target.value, 10));
    };

    const handleSliderMouseUp = () => {
        setPageNumber(sliderValue);
    };

    useEffect(() => {
        const disableRightClick = (e) => {
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
                    disabled={pageNumber >= numPages}
                    className="rounded bg-emerald-500 px-4 py-2 text-white disabled:opacity-50"
                >
                    Next
                </button>
            </div>
            <div className="w-full max-w-screen-lg">
                <input
                    type="range"
                    min="1"
                    max={numPages}
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
                Page {pageNumber} of {numPages}
            </p>
        </div>
    );
};

export default PdfViewer;
