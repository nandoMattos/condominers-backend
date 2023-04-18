import app, { init } from "./app";

const port = process.env.PORT || 5000;

init().then(() => {
  //eslint-disable-next-line
  app.listen(port, () => console.log(`Server is running in port ${port}`));
});
