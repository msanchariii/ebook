"use client";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import Script from "next/script";
import { LoaderCircle } from "lucide-react";
import PleaseLogIn from "@/components/PleaseLogIn";
import { useAuth } from "@clerk/nextjs";
import { ProductOverview } from "@/components/RenameOverview";

interface BookDetails {
    title: string;
    author: string;
    description: string;
    price: number;
    coverImage: string;
}

export default function Checkout() {
    const searchParams = useSearchParams();
    const { userId } = useAuth();
    const router = useRouter();
    const [amount, setAmount] = React.useState<number | null>(null);
    const [bookDetails, setBookDetails] = React.useState<BookDetails | null>(
        null
    );
    const [loading1, setLoading1] = React.useState(true);
    const [loading, setLoading] = React.useState(false);

    const bookId = searchParams.get("id");
    const type = searchParams.get("type");
    const idRef = React.useRef<string | null>(null);

    const key_id = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID!;

    // Fetch book data
    React.useEffect(() => {
        const fetchPrice = async () => {
            try {
                const response = await fetch(
                    `/api/get-price?type=${type}&id=${bookId}`
                );
                const responseData = await response.json();
                const price = responseData?.data?.price;
                if (price) {
                    setAmount(price);
                    setBookDetails(responseData?.data?.details);
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

    // Create order id
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
                            amount: amount * 100,
                        }),
                    });

                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }

                    const data = await response.json();
                    idRef.current = data.orderId;
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
                `/api/add-to-dashboard?userId=${userId}&bookId=${bookId}`
            );
        }

        try {
            const options = {
                key: key_id,
                amount: amount! * 100,
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
                        await fetch(
                            `/api/add-to-dashboard?userId=${userId}&bookId=${bookId}`
                        );
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
            {bookDetails && (
                <ProductOverview
                    title={bookDetails.title}
                    author={bookDetails.author}
                    description={bookDetails.description}
                    price={bookDetails.price}
                    image={bookDetails.coverImage}
                >
                    <form onSubmit={processPayment}>
                        <Button className="w-full" type="submit">
                            {loading ? "...loading" : "Pay"}
                        </Button>
                    </form>
                </ProductOverview>
            )}
        </>
    );
}
