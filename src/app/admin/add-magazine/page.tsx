"use client";
import React, { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Loader2 } from "lucide-react";

function Page() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();
    const initialState = {
        title: "",
        description: "",
        price: "",
        coverImage: "",
        fileLocation: "",
        issn: "",
        paymentLink: "",
    };

    const [formData, setFormData] = useState(initialState);

    const handleChange = (e: any) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    const handleSuccess = () => {
        toast({
            title: "Magazine added successfully!",
        });
        setFormData(initialState);
    };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsLoading(true);
        setError(null);
        // console.log(formData);

        const apiEndpoint = `${process.env.NEXT_PUBLIC_BASE_URL}/api/new-magazine`;

        try {
            const formData = new FormData(event.currentTarget);
            const response = await fetch(apiEndpoint, {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            //
            handleSuccess();
        } catch (error: any) {
            console.error("Error:", error);
            toast({
                title: "OOPS!",
                description: "Something went wrong.",
            });
            setError(error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="mx-2">
            <div>
                {error && <div className="text-red font-bold">{error}</div>}
            </div>
            <h2 className="font-bold text-xl my-4">Add Magazine</h2>
            <form
                className="flex flex-col gap-y-4 mx-1"
                onSubmit={handleSubmit}
            >
                <div className="grid w-full max-w-sm items-center gap-y-4">
                    <Label htmlFor="title">Title</Label>
                    <Input
                        type="text"
                        name="title"
                        id="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Title"
                        required
                    />

                    <Label htmlFor="description">Description</Label>
                    <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter your description here."
                        rows={5}
                        required
                    />

                    <Label htmlFor="price">Price In Rupees</Label>
                    <Input
                        type="number"
                        name="price"
                        id="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="20"
                        required
                    />
                    <div className="bg-yellow-100 p-2 rounded-lg">
                        <Label htmlFor="">
                            File and Cover Image Link Format
                        </Label>
                        <p className="text-xs font-semibold text-red-700">
                            https://cdn.jsdelivr.net/gh/
                            <span className="font-bold underline">
                                username
                            </span>
                            /<span className="font-bold underline">repo</span>
                            @master/
                            <span className="font-bold underline">
                                filename
                            </span>
                        </p>
                    </div>
                    <Label htmlFor="coverImage">Cover Image Link</Label>
                    <Input
                        type="text"
                        id="coverImage"
                        name="coverImage"
                        value={formData.coverImage}
                        onChange={handleChange}
                        placeholder="Cover Image"
                        required
                    />

                    <Label htmlFor="fileLocation">File Location Link</Label>
                    <Input
                        type="text"
                        name="fileLocation"
                        id="fileLocation"
                        value={formData.fileLocation}
                        onChange={handleChange}
                        placeholder="File"
                        required
                    />

                    <Label htmlFor="issn">ISSN (Optional)</Label>
                    <Input
                        name="issn"
                        type="text"
                        id="issn"
                        value={formData.issn}
                        onChange={handleChange}
                        placeholder="ISSN"
                    />

                    <Label htmlFor="paymentLink">
                        Razorpay Payment Link - for Drive Access (Optional)
                    </Label>
                    <Input
                        type="text"
                        name="paymentLink"
                        id="paymentLink"
                        value={formData.paymentLink}
                        onChange={handleChange}
                        placeholder="Payment Link"
                    />
                </div>
                <Button type="submit" className="w-24" disabled={isLoading}>
                    {isLoading ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>ADD</>
                    )}
                </Button>
            </form>
        </div>
    );
}

export default Page;
