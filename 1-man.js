const { MongoClient } = require('mongodb');

class DBClient {
    constructor() {
        const host = process.env.DB_HOST || 'localhost';
        const port = process.env.DB_PORT || 27017;
        const database = process.env.DB_DATABASE || 'files_manager';

        const url = `mongodb://${host}:${port}`;
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.dbName = database;
    }

    async connect() {
        try {
            await this.client.connect();
            console.log('Connected to MongoDB');
            this.db = this.client.db(this.dbName);
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            throw error;
        }
    }

    isAlive() {
        return !!this.client && this.client.isConnected();
    }

    async nbUsers() {
        try {
            const usersCollection = this.db.collection('users');
            const count = await usersCollection.countDocuments();
            return count;
        } catch (error) {
            console.error('Error counting users:', error);
            throw error;
        }
    }

    async nbFiles() {
        try {
            const filesCollection = this.db.collection('files');
            const count = await filesCollection.countDocuments();
            return count;
        } catch (error) {
            console.error('Error counting files:', error);
            throw error;
        }
    }
}

// Create and export an instance of DBClient
const dbClient = new DBClient();
module.exports = dbClient;

