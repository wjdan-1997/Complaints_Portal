const complaintSchema = require('../Models/complaint');
const complaintValidation = require('../Utils/ComplaintValidation');

newComplaint = async (req, res) => {
    const { subject, complainType, description, severity, preferedLanguage } = req.body;
    const { msg, isValid } = complaintValidation(req.body);

    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    };

    const userId = req.user.id;
    const openedBy = req.user.username;
    const status = 'Pending';
    const updatedByUserId = '';
    if (userId == null) {
        return res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }

    const complaint = new complaintSchema({

        subject,
        complainType,
        description,
        severity,
        status,
        preferedLanguage,
        userId,
        openedBy,
        updatedByUserId
    })

    complaint.save()
        .then(complaint => res.json({ responseBody: complaint }))
        .catch(error => {
            res.status(400).json({
                error: error,
                errorMessage: 'complaint not created!',
            })
        })
}
// Retrieve all complaint /api/complaints
retrieveComplaint = async (req, res) => {
    const isAdmin = req.user.role == 'admin';

    const currnetUserId = req.user.id;
    if (currnetUserId == null) {
        res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }
    console.log('Is admin', isAdmin);
    console.log('IS user', currnetUserId);


    const filterQuery = isAdmin ? {} : { userId: currnetUserId };

    const data = await complaintSchema.find(filterQuery, (err, data) => {

        if (err) {
            return res.status(400).json({ success: false, errorMessage: err })
        }

        return res.status(200).json({ success: true, responseBody: data })
    }).clone().catch(err => console.log(err))

    return data;
}

// Retrieve complaint by id https:/api/complaints/:id
retrieveComplaintByID = async (req, res) => {
    const id = req.params.id;

    const data = await complaintSchema.findOne({ "_id": (id) }, (err, data) => {

        if (err) {
            return res.status(400).json({ success: false, errorMessage: err })
        }

        return res.status(200).json({ success: true, responseBody: data })
    }).clone().catch(err => console.log(err))
    return data;
}

// Delete complaint by id https:/api/complaints/:id
deleteComplaintByID = async (req, res) => {
    const id = req.params.id;

    const data = await complaintSchema.deleteOne({ "_id": (id) }, (err, data) => {
        if (err) {
            return res.status(400).json({ success: false, errorMessage: err })
        }

        return res.status(200).json({ success: true, responseBody: data })
    }).clone().catch(err => console.log(err))
    return data;
}

// Update a complaint by id for user
updateComplaint = async (req, res) => {
    const { subject, complainType, description, severity, preferedLanguage } = req.body

    const { msg, isValid } = complaintValidation(req.body);

    if (!isValid) {
        return res.status(400).json({ errorMessage: msg })
    };
    const currnetUserId = req.user.id;
    const id = req.params.id;
    if (currnetUserId == null) {
        res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }
    const data = await complaintSchema.findOne({ "_id": (id) }, (err, data) => {
        if (err) { return null }
        return data;
    }).clone().catch(err => console.log(err));
    console.log("JOJOD", data);
    if (data.userId !== currnetUserId) {
        res.status(403)
            .json({ errorMessage: "you dont have primaitions" })
    }
    else {

        data.subject = subject;
        data.complainType = complainType;
        data.preferedLanguage = preferedLanguage;
        data.description = description;
        data.severity = severity;
        data.save()
            .then((data) => {
                return res.status(200).json({
                    message: ' updated!',
                    responseBody: data
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'not updated!',
                })
            })
    }

}

// for admin
updateComplaintByStatues = async (req, res) => {
    const { status } = req.body
    const isAdmin = req.user.role == 'admin';
    const updatedByAdmin = req.user.username;
    const id = req.params.id;
    if (!isAdmin) {
        res.status(401)
            .json({ errorMessage: "UnAuthraized" })
    }
    const data = await complaintSchema.findOne({ "_id": (id) }, (err, data) => {
        console.log('error', err);
        console.log('dataStatuse', data);
        if (err) { return null }

        return data;
    }).clone().catch(err => console.log(err));
    console.log("JOJOD", data);
    data.status = status;
    data.updatedByUserId = updatedByAdmin;
    data.save()
        .then((data) => {
            return res.status(200).json({
                message: 'updated!',
                responseBody: data
            })
        })
        .catch(error => {
            return res.status(404).json({
                error,
                message: 'not updated!',
            })
        })

}
module.exports = { newComplaint, retrieveComplaint, retrieveComplaintByID, deleteComplaintByID, updateComplaint, updateComplaintByStatues }
