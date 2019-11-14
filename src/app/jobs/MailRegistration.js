import Mail from '../lib/Mail';

export default {
    key: 'RegistrationMail', // identificação do job
    async handle( {data} ) {
        const { user } = data;

        await Mail.sendMail({
            from: 'Queue Test <queue@queuetest.com.br>',
            to: `${user.name} <${user.email}>`,
            subject: 'Cadastro de usuário',
            html: `<h1>Olá ${user.name}, bem vindo ao envio de emails :D</h1>`
        });
    }
}