import Dashboard from "@/components/Dashboard";
import { auth } from "@clerk/nextjs/server";
import React, { useEffect } from "react";

function page() {
    // const { userId } = auth();
    const { userId } = auth();

    if (!userId) {
        return (
            <>
                <div>Please Login first</div>
            </>
        );
    }

    return <Dashboard userId={userId}></Dashboard>;
}

export default page;
