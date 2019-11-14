import Queue from 'bull';
import  redisConfig from '../../config/redis';

import * as jobs from '../jobs'; // Todos jobs criados e exportados

// Mapeia os jobs exportados
const queues = Object.values(jobs).map(job => ({ // Parenteses substitui o return
    bull: new Queue(job.key, redisConfig), // Fila de execucao do job
    name: job.key, // chave de identificacao
    handle: job.handle, // metodo de execucao
    options: job.options, // opcoes do job
}));

export default {
    queues, // todas filas
    add(name, data) { // metodo para adicionar job a sua fila correspondente
        const queue = this.queues.find(queue => queue.name == name);
        return queue.bull.add(data, queue.options); // retorna uma Promise
    },
    process() { // processa todas as filas de todos jobs
        return this.queues.forEach(queue => {
            queue.bull.process(queue.handle);

            // Trata os erros
            queue.bull.on('failed', (job, err) => {
                console.log('Job failed', queue.key, job.data);
                console.log(err);
            })
        })
    }
}
