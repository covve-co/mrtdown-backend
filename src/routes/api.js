module.exports = (app) => {
  app.get("/", async (req, res) => {
    console.log("No");
  });
  return app;
};
