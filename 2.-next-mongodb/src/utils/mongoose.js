import { connect, connection } from 'mongoose';

const conn = {
    isConnected: false,
};

export async function dbConnect() {
    if (conn.isConnected) return;

    const db = await connect('mongodb://localhost/nextjs');

    conn.isConnected = db.connections[0].readyState; // devuelve 1 => conectado

    // console.log(db.connection.db.databaseName); // name del DB
};

// Events de mongoose (connection events)
connection.on('connected', () => {
    console.log('Mongodb is connected');
});

connection.on('error', (err) => {
    console.log(err);
});