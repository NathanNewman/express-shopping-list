const express = require("express");
const Item = require("./item");
const router = new express.Router();

router.get("/", (req, res, next) => {
  try {
    return res.json({ items: Item.getAll() });
  } catch (error) {
    return next(error);
  }
});

router.post("/", (req, res, next) => {
  try {
    const newItem = new Item(req.body.name, req.body.price);
    return res.status(201).json({ item: newItem });
  } catch (error) {
    return next(error);
  }
});

router.get("/:name", (req, res, next) => {
  try {
    const foundItem = Item.getItem(req.params.name);
    return res.json({ item: foundItem });
  } catch (error) {
    return next(error);
  }
});

router.patch("/:name", (req, res, next) => {
  try {
    const patchedItem = Item.patch(req.params.name, req.body);
    return res.json({ item: patchedItem });
  } catch (error) {
    return next(error);
  }
});

router.delete("/:name", (req, res, next) => {
  try {
    Item.delete(req.params.name);
    return res.json({ message: "Deleted" });
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
