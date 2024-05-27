import React from "react";

async function page({
    searchParams,
}: {
    searchParams: { type: string; id: string };
}) {
    const type = searchParams.type;
    const itemId = searchParams.id;
    const url = `${process.env.BASE_URL}/api/product?type=${type}&id=${itemId}`;

    console.log("URL: ", url);

    const response = await fetch(url);
    let item;
    let responseData;
    if (response.ok) {
        responseData = await response.json();
        item = responseData.data;
    }

    return (
        <div>
            Product Page
            <div>{item.title}</div>
            <div>{item.price}</div>
        </div>
    );
}
// 66503b65f6b077b1a72ce702
export default page;
