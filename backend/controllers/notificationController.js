const Notification = require('../models/Notification');
const User = require('../models/User');
const sendEmail = require('../utils/mailer');

exports.getNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ recipient: req.user._id }).sort({ sentAt: -1 });
    res.json(notifications);
  } catch (error) {
    next(error);
  }
};

exports.sendNotification = async (req, res, next) => {
  try {
    const { recipientId, title, message, channel } = req.body;
    const recipient = await User.findById(recipientId);
    if (!recipient) return res.status(404).json({ message: 'Recipient not found' });

    const notification = await Notification.create({ recipient: recipient._id, title, message, channel });
    if (channel === 'email') {
      await sendEmail({ to: recipient.email, subject: title, text: message });
    }
    res.status(201).json(notification);
  } catch (error) {
    next(error);
  }
};

exports.broadcastAnnouncement = async (req, res, next) => {
  try {
    const { title, message, channel } = req.body;
    const users = await User.find();
    const notifications = users.map((user) => ({ recipient: user._id, title, message, channel }));
    await Notification.insertMany(notifications);
    res.json({ message: 'Broadcast sent', count: users.length });
  } catch (error) {
    next(error);
  }
};
