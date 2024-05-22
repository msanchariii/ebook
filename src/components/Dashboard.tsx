"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Dashboard({ userId }: { userId: string }) {
    const [dashboardData, setDashboardData] = useState();
    const url = `/api/get-user-dashboard?userId=${userId}`;

    if (!userId) {
        return <></>;
    }

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
    }, [url, userId]);
    return <div>Dashboard</div>;
}

export default Dashboard;
