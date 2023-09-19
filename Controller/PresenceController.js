const Employee = require("../Models/Employee");
const Presence = require("../Models/Presence");


async function CheckIn(req, res) {
    const { employeeId, comment } = req.body;
    const checkInTime = new Date();

    try {
        // Save check-in data to the database
        const checkIn = await Presence.create({
            checkInTime,
            comment,
            IdEmployee: employeeId,
        });

        res.status(200).json(checkIn);
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout : " + error.message });
    }
}

async function CheckOut(req, res) {
    const { employeeId, comment } = req.body;
    const checkOutTime = new Date();

    try {
        const lastCheckIn = await Presence.findOne({
            where: {
                IdEmployee:employeeId,
                checkOutTime: null,
            },
            order: [['checkInTime', 'DESC']],
        }); 

        if (!lastCheckIn) {
            return res.status(404).json({ message: "Aucun CheckIn trouvé pour cet employé." });
        }

        // Calculer la difference en minute
        const checkInTime = lastCheckIn.checkInTime;
        const timeDifference = Math.floor((checkOutTime - checkInTime) / (1000 * 60)); 

        await lastCheckIn.update({ checkOutTime, comment, timeDifference });

        res.status(200).json({ message: 'Check-out Updated.', checkInRecord: lastCheckIn });
    } catch (error) {
        res.status(500).json({ message: "Une erreur est survenue lors de l'ajout : " + error.message });
    }
}

module.exports = {
    CheckIn,
    CheckOut,
};
