const allMessages = [];

module.exports = {

    getAllMessages: async (req, res) => {
        res.status(200).send(allMessages);
    },

    createMessage: async (req, res) => {
        const { username, message } = req.body;
        let newMessage = {
            username,
            message
        };
        allMessages.push(newMessage);
        res.status(200).send(allMessages);
    },

};