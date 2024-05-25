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
import { useAuth } from "@clerk/nextjs";

export default function Checkout() {
    const searchParams = useSearchParams();
    const { userId } = useAuth();
    const router = useRouter();
    const [amount, setAmount] = React.useState(null); // state for amount
    // state for successful payment

    const bookId = searchParams.get("id");
    const type = searchParams.get("type");

    const [loading1, setLoading1] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const idRef = React.useRef();

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

    // fetch book data
    React.useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch(
                    `/api/get-price?type=${type}&id=${bookId}`
                );
                const responseData = await response.json();
                const price = responseData?.data?.price;
                if (price) {
                    setAmount(price.toString());
                }
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
            } catch (error) {
                console.error("Error fetching price :: ", error);
            }
        };
        fetchPrice();
    }, [bookId, type]);

    // create order id
    React.useEffect(() => {
        if (amount) {
            const createOrderId = async () => {
                try {
                    const response = await fetch("/api/order", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            amount: parseFloat(amount) * 100,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const data = await response.json();
                    const id = data.orderId;
                    idRef.current = id;
                    setLoading1(false);
                } catch (error) {
                    console.error(
                        "There was a problem with your fetch operation:",
                        error
                    );
                }
            };
            createOrderId();
        }
    }, [amount]);

    const processPayment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        const orderId = idRef.current;

        async function buyBook() {
            await fetch(
                `${process.env.BASE_URL}/api/add-to-dashboard?userId=${userId}&bookId=${bookId}`
            );
        }

        try {
            const options = {
                key: key_id,
                amount: parseFloat(amount!) * 100,
                currency: "INR",
                name: "Payment",
                description: "Payment",
                order_id: orderId,
                theme: {
                    color: "#3399cc",
                },
                handler: async function (response: any) {
                    const data = {
                        orderCreationId: orderId,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpayOrderId: response.razorpay_order_id,
                        razorpaySignature: response.razorpay_signature,
                    };

                    const result = await fetch("/api/verify", {
                        method: "POST",
                        body: JSON.stringify(data),
                        headers: { "Content-Type": "application/json" },
                    });

                    const res = await result.json();
                    if (res.isOk) {
                        const result = await fetch(
                            `/api/add-to-dashboard?userId=${userId}&bookId=${bookId}`
                        );
                        const resdata = await result.json();
                        console.log("Resdata:", resdata);

                        // buyBook();
                        alert("Successfully added to db");
                        router.push(`/dashboard`);
                    } else {
                        // refund logic
                    }
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
                <LoaderCircle className="animate-spin h-20 w-20 text-primary" />
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
