module.exports = (app) => {
  app.get("/", async (req, res) => {
    console.log("Hello world");
  });

  return app;
};
