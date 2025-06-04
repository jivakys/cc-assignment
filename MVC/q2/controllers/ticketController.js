const { readData, writeData } = require("../models/ticketModel");

let generateId = () => {
  const tickets = readData();
  return tickets.length > 0 ? tickets[tickets.length - 1].id + 1 : 1;
};

exports.getAllTickets = (req, res) => {
  res.json(readData());
};

exports.getTicketById = (req, res) => {
  const ticket = readData().find((t) => t.id === parseInt(req.params.id));
  ticket
    ? res.json(ticket)
    : res.status(404).json({ error: "Ticket not found" });
};

exports.createTicket = (req, res) => {
  const tickets = readData();
  const newTicket = { id: generateId(), ...req.body, status: "pending" };
  tickets.push(newTicket);
  writeData(tickets);
  res.status(201).json(newTicket);
};

exports.updateTicket = (req, res) => {
  const tickets = readData();
  const index = tickets.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  const updatedTicket = { ...tickets[index], ...req.body };
  tickets[index] = updatedTicket;
  writeData(tickets);
  res.json(updatedTicket);
};

exports.deleteTicket = (req, res) => {
  const tickets = readData();
  const updated = tickets.filter((t) => t.id !== parseInt(req.params.id));
  if (updated.length === tickets.length)
    return res.status(404).json({ error: "Ticket not found" });

  writeData(updated);
  res.json({ message: "Ticket deleted" });
};

exports.resolveTicket = (req, res) => {
  const tickets = readData();
  const index = tickets.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Ticket not found" });

  tickets[index].status = "resolved";
  writeData(tickets);
  res.json({ message: "Ticket resolved", ticket: tickets[index] });
};
