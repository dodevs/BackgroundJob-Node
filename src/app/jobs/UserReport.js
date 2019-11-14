export default {
    key: 'UserReport', // identificação do job
    options: {
        delay: 5000, // ms   
    },
    async handle( {data} ) {
        const { user } = data;

        console.log(user);
    }
}