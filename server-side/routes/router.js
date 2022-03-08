const express = require('express');
const router = express.Router();
const User = require('../Api/Users');
const Complaints = require('../Api/Complaints')
const auth = require('../Auth/Auth')
//

router.post('/api/users/signup',User.userRegistering)
router.post('/api/users/signupforadmin',User.adminRegistering)
router.post('/api/users/signin',User.userLogin)
router.get('/api/users/signout',auth,User.userLogout)
router.get('/api/users/currentUser',auth, User.currentUser)

router.post('/api/complaints', auth,Complaints.newComplaint)

router.get('/api/complaints', auth,Complaints.retrieveComplaint)

router.get('/api/complaints/:id',auth,Complaints.retrieveComplaintByID)
router.put('/api/complaints/:id',auth,Complaints.updateComplaint)
router.delete('/api/complaints/:id',auth,Complaints.deleteComplaintByID)
router.put('/api/complaints/updatestatus/:id',auth,Complaints.updateComplaintByStatues)


module.exports =  router; 




