const ProductModel = require("../models/product.model")

// exports.createProduct = async (req, res) => {
//     try {
//         const { title, description, price, images, category, createdAt, seller, rating } = req.body;

//         if (!title || !description || !price || !images || !category || !rating) {
//             return res.status(400).json({ message: "Barcha maydonlar majburiy" });
//         }

//         const borbolsa = await ProductModel.findOne({ images });
//         if (borbolsa) {
//             return res.status(400).json({ message: "Bu rasm allaqachon bor" });
//         }

//         const newProduct = new ProductModel({
//             title,
//             description,
//             price,
//             images,
//             category,
//             createdAt,
//             seller,
//             rating
//         });

//         await newProduct.save();

//         return res.status(201).json({
//             message: "Product yaratildi",
//             product: newProduct,
//         });

//     } catch (e) {
//         return res.status(500).json({
//             message: "Server xatosi",
//             error: e.message,
//         });
//     }
// };

exports.createProduct = async (req, res) => {
  try {
    const { title, description, price, images, category, rating } = req.body;

    if (!title || !description || !price || !images || !category) {
      return res.status(400).json({ message: "Majburiy maydonlar yetishmayapti" });
    }

    const newProduct = new ProductModel({
      title,
      description,
      price,
      images,
      category,
      rating,
      seller: req.user.id    // JWT orqali kelgan user ID
    });

    await newProduct.save();

    return res.status(201).json({
      message: "Product yaratildi",
      product: newProduct,
    });

  } catch (e) {
    return res.status(500).json({
      message: "Server xatosi",
      error: e.message,
    });
  }
};



exports.getProduct = async (req, res) => {
  try {
    const products = await ProductModel.find().populate("seller", "name surname"); 
    // 🔹 sellerning faqat name va surname maydonlarini chiqaradi

    return res.status(200).json({
      message: "Barcha productlar olindi",
      products,
    });
  } catch (e) {
    return res.status(500).json({
      message: "Server xatosi",
      error: e.message,
    });
  }
};
