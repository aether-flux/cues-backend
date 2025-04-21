exports.homeIndex = (req, res) => {
  res.send({ msg: "Hello, Rensa!", var: process.env.SECRET });
}
