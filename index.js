import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import QasidahRoutes from "./Routes/QasidahRoutes.js";
import dotenv from 'dotenv'

dotenv.config();

let app = express();
app.use(cors());
app.use(express.json());
// 'mongodb://localhost:27017/db_qasidah'
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    
});
const db = mongoose.connection;
db.on('err', (err) => console.log(err))
db.once('open', ()=> console.log('Database Connected...'))
    
const port = 3001;
app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use(QasidahRoutes);

// export default app