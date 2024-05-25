import React from "react";
// https://ebook-theta.vercel.app/api/buy?type=book&id=66503b65f6b077b1a72ce702
// https://ebook-theta.vercel.app/webhook?type=book&id=66503b65f6b077b1a72ce702

async function page({
    searchParams,
}: {
    searchParams: { type: string; id: string };
}) {
    const type = searchParams.type;
    const id = searchParams.id;
    const response = fetch(
        `${process.env.BASE_URL}/api/buy?type=${type}&id=${id}`,
        { cache: "no-store" }
    );
    return <div>page</div>;
}

export default page;
