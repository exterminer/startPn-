const Card = require("../models/Cards");
const User = require("../models/User");
const Category = require("../models/Categories");
class MethodologyController {
  async createMethodology(req, res) {
    const { text,name } = req.body;
    const userId = res.locals.user.id;
    const categoryId = req.params.categoryId;

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(400).json({ error: "User not found" });
      }

      const category = await Category.findOne({
        where: { id: categoryId, user_id: userId },
      });
      if (!category) {
        return res
          .status(400)
          .json({ error: "Category not found or does not belong to the user" });
      }
      const newMethodology = await Card.create({
        text,
        category_id: categoryId,
        name
      });

      res.status(201).json(newMethodology);
    } catch (error) {
      console.error("Erro ao criar metodologia:", error);
      res.status(500).send("Erro interno do servidor");
    }
  }

  async getAllMethodoloogy(req, res) {
    const categoryId = req.params.categoryId;
    console.log(categoryId)
    try {
      const categorMethodology = await Card.findAll({
        where: { category_id: categoryId },
      });

      res.status(200).json(categorMethodology);
    } catch (error) {
      console.error("Erro ao obter categorias do usuário:", error);
      res.status(500).send("Erro interno do servidor");
    }
  }

  async getCardById(req, res) {
    const cardId = req.params.cardId;

    try {
      const card = await Card.findByPk(cardId);

      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }

      res.status(200).json(card);
    } catch (error) {
      console.error("Erro ao obter card por ID:", error);
      res.status(500).send("Erro interno do servidor");
    }
  }

  async updateCardById(req, res) {
    const cardId = req.params.cardId;
    const { text, name } = req.body;

    try {
      const card = await Card.findByPk(cardId);

      if (!card) {
        return res.status(404).json({ error: "Card not found" });
      }

      card.text = text || card.text;
      card.name = name || card.name;
      
      await card.save();

      res.status(200).json(card);
    } catch (error) {
      console.error("Erro ao atualizar card por ID:", error);
      res.status(500).send("Erro interno do servidor");
    }
  }
}

module.exports = new MethodologyController();
