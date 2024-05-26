const app = require('./app');
const PORT = process.env.POR || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
