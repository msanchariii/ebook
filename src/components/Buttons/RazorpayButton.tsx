// components/RazorpayButton.tsx
"use client";
import React, { useEffect, useRef } from "react";

const RazorpayButton = ({ paymentButtonId }: { paymentButtonId: string }) => {
    const formRef = useRef<HTMLFormElement | null>(null);

    useEffect(() => {
        const scriptId = "razorpay-payment-button-script";

        if (!document.getElementById(scriptId) && formRef.current) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = "https://checkout.razorpay.com/v1/payment-button.js";
            script.setAttribute("data-payment_button_id", paymentButtonId);
            script.async = true;
            formRef.current.appendChild(script);
        }

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                existingScript.remove();
            }
        };
    }, [paymentButtonId]);

    return <form ref={formRef}></form>;
};

export default RazorpayButton;
