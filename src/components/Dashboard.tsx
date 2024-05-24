"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
// User dashboard where user can view all the books it can access
function Dashboard({
    userId,
    children,
}: {
    userId: string;
    children: React.ReactNode;
}) {
    const [dashboardData, setDashboardData] = useState();
    const url = `/api/get-user-dashboard?userId=${userId}`;

    useEffect(() => {
        const getDashboard = async () => {
            try {
                const res = await axios.get(url);
                if (res.status === 200) {
                    setDashboardData(res.data?.books);
                } else {
                    const message = res.data.message;
                }
            } catch (error) {}
        };
        getDashboard();
        console.log(dashboardData);
    }, [url, userId, dashboardData]);
    if (!userId) {
        return <></>;
    }
    return (
        <div>
            Dashboard
            <>{children}</>
        </div>
    );
}

export default Dashboard;
