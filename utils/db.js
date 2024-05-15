import MongoClient from 'mongodb';

class DBClient {
  constructor() {
    const host = proces.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || 'files_manager';

    const uri = `mongodb://${host}:${port}`;
    this.client = new MongoClient(uri, { useUnifiedTopology = true });
    this.dbName = database;
  }       
        
  async connect() {
    try { 
      await this.client.connnect();
      await this.client.db(this.dbName);
    } catch (error) {
      console.error(`Error connecting to MongoDb: ${error}`);
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    try {
      const usersCollection = this.db.collection('users');
      const count = await usersCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Error counting users: ${error}`);
    }
  }

  async nbFiles() {
    try {
      const filesCollection = this.db.collection('files');
      const count = await filesCollection.countDocuments();
      return count;
    } catch (error) {
      console.error(`Errorr counting files: ${error}`);
    }
  }
}

const dbClient = new DBClient();
export default dbClient;
