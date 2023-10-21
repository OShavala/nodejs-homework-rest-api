const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const removeContact = async (req, res) => {
  const { id } = req.params;
  const { _id: owner } = req.user;

  const result = await Contact.findOneAndDelete({ _id: id, owner });

  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

module.exports = removeContact;


