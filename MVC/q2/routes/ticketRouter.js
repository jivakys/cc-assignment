const express = require("express");
const {
  getAllTickets,
  getTicketById,
  createTicket,
  updateTicket,
  deleteTicket,
  resolveTicket,
} = require("../controllers/ticketController");
const dataCheckMiddleware = require("../middlewares/dataCheckMiddleware");

const ticketRouter = express.Router();

ticketRouter.get("/", getAllTickets);
ticketRouter.get("/:id", getTicketById);
ticketRouter.post("/", dataCheckMiddleware, createTicket);
ticketRouter.put("/:id", updateTicket);
ticketRouter.delete("/:id", deleteTicket);
ticketRouter.patch("/:id/resolve", resolveTicket);

module.exports = ticketRouter;
