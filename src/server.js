import 'dotenv/config'; // Reconhece as variáveis de ambiente
import express from 'express';
import UserController from './app/controllers/UserController';
import BullBoard from 'bull-board'; // Dashboard do bull
import Queue from './app/lib/Queue';

const app = express();

BullBoard.setQueues(Queue.queues.map(queue => queue.bull)); // seta filas

app.use(express.json());
app.post('/users', UserController.store);

app.use('/admin/queues', BullBoard.UI); // rota para o dashboard

app.listen(3333, () => {
    console.log("Servidor escutando na porta 3333");
})