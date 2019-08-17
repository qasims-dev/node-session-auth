exports.index = function(req, res) {
  const message = "MR QASIM";
  res.render("index", { message });
};
