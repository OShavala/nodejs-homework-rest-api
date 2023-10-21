const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const getById = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOne({ _id: id, owner });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = getById;


