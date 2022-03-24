// user signup 

/**
* @swagger
* /api/users/signup:
*   post:
*     tags:
*       - Users
*     name: Register
*     summary: Register a new user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*         required:
*           - email
*           - passwordReceived
*           - phoneNumber
*     responses:
*       200:
*         description: User  created successfully
*       400:
*         description: User already exist
*/

// user signin

/**
* @swagger
* /api/users/signin:
*   post:
*     tags:
*       - Users
*     name: Login
*     summary: Login a user
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             email:
*               type: string
*             passwordReceived:
*               type: string
*               format: password
*         required:
*           - email
*           - passwordReceived
*     responses:
*       200:
*         description: User found and logged in successfully
*       400:
*         description: Wrong Pass or Email
*/

// user information

/**
* @swagger
* /api/users/currentUser:
*   get:
*     tags:
*       - Users
*     name: return user information
*     summary: user information
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: user found successfully
*       400:
*         description: user not found in db
*/

// retrieve all user

/**
* @swagger
* /api/users/getUsers:
*   get:
*     tags:
*       - Users
*     name: Find all users
*     summary: Find all users
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: User found and logged in successfully
*       401:
*         description: Bad username, not found in db
*       403:
*         description: Username and password don't match
*/

// update user 

/**
* @swagger
* /api/users/{id}:
*   put:
*     tags:
*       - Users
*     name: Update user by id
*     summary: Update users
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/User'
*         required:
*           - email
*           - passwordReceived
*           - phoneNumber      
*     responses:
*       200:
*         description: updated successfully
*       400:
*         description:  updated deleted!
*/

// delete user 

/**
* @swagger
* /api/users/{id}:
*   delete:
*     tags:
*       - Users
*     name: delete user by id
*     summary: delete users
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*           
*     responses:
*       200:
*         description: deleted successfully
*       400:
*         description:  deleted deleted!
*/


// add complaint

/**
* @swagger
* /api/complaints:
*   post:
*     tags:
*       - Complaints
*     name: Add new complaint
*     summary: Create Complaint
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/Complaints'
*         required:
*           - subject
*           - complainType
*           - description
*     responses:
*       200:
*         description: complaint  created successfully
*       400:
*         description: complaint not created!
*/

// retrieve all complaint 

/**
* @swagger
* /api/complaints:
*   get:
*     tags:
*       - Complaints
*     name: Retrieve all complaints related to the user
*     summary: Retrieve all complaints
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     responses:
*       200:
*         description: complaint  created successfully
*       400:
*         description: complaint not created!
*/

// retrieve complaint by id

/**
* @swagger
* /api/complaints/{id}:
*   get:
*     tags:
*       - Complaints
*     name: get complaints by id  
*     summary: get complaint
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: returned successfully
*       400:
*         description: not returned!
*/

// delete complaint

/**
* @swagger
* /api/complaints/{id}:
*   delete:
*     tags:
*       - Complaints
*     name: Delete complaints by id
*     summary: Delete complaint
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*     responses:
*       200:
*         description: deleted successfully
*       400:
*         description: not deleted!
*/

// update complaint

/**
* @swagger
* /api/complaints/{id}:
*   put:
*     tags:
*       - Complaints
*     name: Update complaints by id
*     summary: Update complaint
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*       - name: body
*         in: body
*         schema:
*           $ref: '#/definitions/Complaints'
*     responses:
*       200:
*         description: updated successfully
*       400:
*         description:  updated deleted!
*/

// update complaint status

/**
* @swagger
* /api/complaints/updatestatus/{id}:
*   put:
*     tags:
*       - Complaints
*     name: Update status
*     summary: Update status
*     security:
*       - bearerAuth: []
*     consumes:
*       - application/json
*     parameters:
*       - name: id
*         in: path
*         required: true
*         schema:
*           type: integer
*       - name: body
*         in: body
*         schema:
*           type: object
*           properties:
*             status:
*               type: string
*           
*     responses:
*       200:
*         description: updated successfully
*       400:
*         description:  not updated!
*/

// Schema 

/**
 * @swagger
 * definitions:
 *   Complaints:
 *      type: object
 *      properties:
 *        subject:
 *          type: string
 *        complainType:
 *          type: string
 *        description:
 *          type: string
 *        severity:
 *          type: string
 *        status:
 *          type: string
 *        preferedLanguage:
 *          type: string
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       email:
 *         type: string
 *       passwordReceived:
 *         type: string
 *       phoneNumber:
 *         type: integer
 *       education:
 *         type: string
 *       gender:
 *         type: string
 *       address:
 *         type: string

 */
