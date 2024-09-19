import { cartService } from "../services/cart.service.js";
import { productService } from "../services/product.service.js";

class CartController {
  async addCart(req, res) {
    try {
      const cart = await cartService.create({ products: [] });
      res.status(200).json({ result: "success", cart });
    } catch (error) {
      res.status(500).json({ result: "Error", message: error });
    }
  }

  async getAll(req, res) {
    try {
      const carts = await cartService.getAll();
      res.status(200).json({ result: "success", carts });
    } catch (error) {
      res.status(500).json({ result: "Error", message: error });
    }
  }

  async getById(req, res) {
    const { cid } = req.params;
    try {
      const cart = await cartService.getById(cid);
      console.log("estamos en el endpoint", cart);
      if (!cart) return res.status(404).json({ message: "Cart not found" });
      res.status(200).json({ response: "success", cart });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error });
    }
  }

  async addProductToCart(req, res) {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    try {
      if (!Number.isFinite(quantity))
        return res.status(400).json({ response: "Error", message: "Quantity must be a number" });

      const cart = await cartService.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      const product = await productService.getById(pid);
      if (!product)
        return res.status(404).json({ response: "Error", message: "Product not found" });

      //Stock control
      if (quantity > product.stock)
        return res.status(404).json({
          response: "Error",
          message: "Out of stock",
          in_stock: product.stock,
        });

      if (quantity < 1)
        return res
          .status(404)
          .json({ response: "Error", message: "Quantity cannot be less than 1" });

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.product._id.toString() === pid.toString()
      );

      if (existingProductIndex !== -1) {
        if (cart.products[existingProductIndex].quantity + quantity > product.stock)
          return res.status(404).json({
            response: "Error",
            message: "Out of stock",
            in_stock: product.stock,
            you_have_in_cart: cart.products[existingProductIndex].quantity,
          });

        cart.products[existingProductIndex].quantity += quantity;
      } else {
        cart.products.push({ product: pid, quantity });
      }
      await cart.save();
      res.status(200).json({ result: "Success", message: "Product added to cart" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async deleteProductFromCart(req, res) {
    const { cid, pid } = req.params;
    try {
      const cart = await cartService.getById(cid);
      if (!cart) return res.status(404).json({ response: "Error", message: "Cart not found" });

      const product = await productService.getById(pid);
      if (!product)
        return res.status(404).json({ response: "Error", message: "Product not found" });

      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.product._id.toString() === pid.toString()
      );

      if (existingProductIndex !== -1) {
        cart.products.splice(existingProductIndex, 1);
      } else {
        return res.status(404).send({ result: "Error", message: "Product not found in cart" });
      }
      await cart.save();
      res.status(200).json({ result: "Success", message: "Product deleted from cart" });
    } catch (error) {
      res.status(500).json({ response: "Error", message: error.message });
    }
  }

  async updateCart(req, res) {}

  async updateQuantity(req, res) {}

  async deleteAll(req, res) {}

  async deleteAllCarts(req, res) {}

  async purchase(req, res) {}
}

export const cartController = new CartController();
