import app from '../app';

const PORT = process.env.PORT || 3008;

app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
});