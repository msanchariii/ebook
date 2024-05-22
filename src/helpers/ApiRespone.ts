import { NextResponse } from "next/server";

interface ApiResponse {
    success: boolean;
    status: number;
    message: string;
    data?: any; // 'data' is optional
}

export function response({ success, status, message, data }: ApiResponse) {
    return NextResponse.json(
        {
            success,
            message,
            data,
        },
        {
            status,
        }
    );
}
