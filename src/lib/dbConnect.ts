import mongoose from "mongoose";

type ConnectionObject = {
    isConnected?: number;
};

const connection: ConnectionObject = {};

async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already Connected to DB");
        return;
    }
    try {
        const db = await mongoose.connect(
            `mongodb+srv://sancharim2233:sanchari-blog@cluster0.rsrm35h.mongodb.net/ebook?retryWrites=true&w=majority`
        );
        // console.log(db);
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully");
    } catch (error) {
        console.log("DB Connextion Error :: ", error);
        process.exit(1);
    }
}

export default dbConnect;
