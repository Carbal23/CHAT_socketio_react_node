exports.success = (req, res, msg, status) => {
  res.status(status || 200).send({
    error: "",
    body: msg,
  });
};

exports.error = (req, res, msg, status, details) => {
  console.error("[error]", details);
  res.status(status || 200).send(msg);
};
