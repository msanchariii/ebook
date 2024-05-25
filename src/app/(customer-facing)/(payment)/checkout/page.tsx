"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import PleaseLogIn from "@/components/PleaseLogIn";

export default function Checkout() {
    const router = useRouter();
    const params = useSearchParams();
    const amount = params.get("amount");
    const userId = params.get("userId");
    const bookId = params.get("bookId");
    const [loading1, setLoading1] = React.useState(true);
    const [loading, setLoading] = React.useState(false);
    const idRef = React.useRef();

    React.useEffect(() => {
        if (!amount || !userId || !bookId) {
            router.replace("/");
        }
        createOrderId();
    }, []);
    // Create order ID
    const createOrderId = async () => {
        try {
            const response = await fetch("/api/order", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    amount: parseFloat(amount!) * 100,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            const id = data.orderId;
            idRef.current = id;
            setLoading1(false);
            return;
        } catch (error) {
            console.error(
                "There was a problem with your fetch operation:",
                error
            );
        }
    };
    // add-to-dashboard
    async function buyBook(user: string, book: string) {
        const response = await fetch(
            `${process.env.BASE_URL}/api/add-to-dashboard?userId=${userId}&bookId=${bookId}`
        );
    }
    // process Payment
    const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const orderId = idRef.current;
        console.log(orderId);
        try {
            const options = {
                key: process.env.key_id,
                amount: parseFloat(amount!) * 100,
                currency: "INR",
                name: "Payment", //busniess name
                description: "Payment",
                order_id: orderId,
                handler: async function (response: any) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };
                    // FIXME:
                    if (data.razorpayPaymentId) {
                        await buyBook(userId!, bookId!);
                    }

                    const result = await fetch("/api/verify", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" },
                    });
                    const res = await result.json();
                    //process further request, whatever should happen after request fails
                    // https://api.razorpay.com/v1/payments/{pay_id}

                    if (res.isOk) {
                        alert(res.message); //process further request after
                        console.log("PAYMENT SUCCESSFULL.");
                        const payment = await fetch(
                            `https://api.razorpay.com/v1/payments/${data.razorpayPaymentId}`
                        );
                        const paymentData = await payment.json();
                        console.log(payment);
                        console.log(paymentData);
                        buyBook(userId!, bookId!);
                    } else {
                        alert(res.message);
                    }
                },
                theme: {
                    color: "#3399cc",
                },
            };
            const paymentObject = new window.Razorpay(options);
            paymentObject.on("payment.failed", function (response: any) {
                alert(response.error.description);
            });
            setLoading(false);
            paymentObject.open();
        } catch (error) {
            console.error(error);
        }
    };

    if (loading1)
        return (
            <div className="container h-screen flex justify-center items-center">
                <LoaderCircle className=" animate-spin h-20 w-20 text-primary" />
            </div>
        );
    if (!userId) {
        return <PleaseLogIn />;
    }
    return (
        <>
            <Script
                id="razorpay-checkout-js"
                src="https://checkout.razorpay.com/v1/checkout.js"
            />
            <section className="container h-screen flex flex-col justify-center items-center gap-10">
                <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight">
                    Checkout
                </h1>
                <Card className="max-w-[25rem] space-y-8">
                    <CardHeader>
                        <CardTitle className="my-4">Continue</CardTitle>
                        <CardDescription>
                            By clicking on pay you will purchase the book.
                            <p>
                                Amount to Pay: <strong>Rs. {amount} /-</strong>
                            </p>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={processPayment}>
                            <Button className="w-full" type="submit">
                                {loading ? "...loading" : "Pay"}
                            </Button>
                        </form>
                    </CardContent>
                    <CardFooter className="flex">
                        <p className="text-sm text-muted-foreground underline underline-offset-4">
                            Please read the terms and conditions.
                        </p>
                    </CardFooter>
                </Card>
            </section>
        </>
    );
}
