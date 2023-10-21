const { Contact } = require("../../models/contact");
const { HttpError } = require("../../helpers");

const listContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10, favorite } = req.query;
  const skip = (page - 1) * limit;

  try {
    if (favorite) {
      const isFavorite = favorite === "true";
      const result = await Contact.find({ owner, favorite: isFavorite }, "", {
        skip,
        limit,
      }).populate("owner", "name email");
      res.json(result);
    } else {
     
      const result = await Contact.find({ owner }, "", { skip, limit }).populate(
        "owner",
        "name email"
      );
      if (result.length === 0) {
      
        throw HttpError(404, "No contacts found");
      }
      res.json(result);
    }
  } catch (error) {
   
    if (error instanceof HttpError) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Server error" });
    }
  }
};

module.exports = listContacts;



