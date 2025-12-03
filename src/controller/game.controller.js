const GameModel = require("../models/game.model");

exports.createGames = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      discount,
      categoryId,
      developer,
      image,
      releaseDate,
      rating,
      janre,
    } = req.body;
    if (
      !title ||
      !description ||
      !price ||
      !discount ||
      !categoryId ||
      !developer ||
      !image ||
      !releaseDate ||
      !rating ||
      !janre
    ) {
      return res
        .status(400)
        .json({ message: "barcha maydonni toldirish majburiy" });
    }

    const newGame = new GameModel({
      title,
      description,
      price,
      discount,
      categoryId,
      developer,
      image,
      releaseDate,
      rating,
      janre,
    });

    await newGame.save();

    return res.status(201).json({
      message: "Game muvaffaqiyatli yaratildi",
      game: newGame,
    });
  } catch (e) {
    if (e.code === 11000) {
      return res.status(400).json({
        message: "Bunday emailga ega user allaqachon mavjud",
        duplicateField: e.keyValue,
      });
    }
    return res.status(500).json({
      message: "Serverda xatolik",
      error: e.message,
    });
  }
};

exports.getGames = async (req, res) => {
  try {
    const games = await GameModel.find();
    return res.status(200).json({
      message: "Barcha Gamelar muvaffaqiyatli olindi",
      games,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Serverda xatolik",
      error: e.message,
    });
  }
};
