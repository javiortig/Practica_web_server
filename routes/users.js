const express = require("express")
const router = express.Router()

const {validatorUpdateUser, validatorGetUser, validatorDeleteUser, validatorGetClients} = require("../validators/users")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsWebpageMiddleware} = require("../middleware/session")

const pruebasMiddleware = require('../middleware/pruebas')

const {deleteUserCtrl, updateUserCtrl, getUserCtrl, getMerchantsCtrl, getClientsCtrl} = require('../controllers/users')

/**
 * @openapi
 * /api/users/id/{id}:
 *  get:
 *      tags:
 *      - User
 *      summary: Get a specific user in the system. Admin only.
 *      description: returns a specific user, based on his id
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the user to return
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          '200':
 *              description: Returns the user
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/id/:id", authMiddleware, checkRol(["admin"]), validatorGetUser, getUserCtrl)

/**
 * @openapi
 * /api/users/merchants:
 *  get:
 *      tags:
 *      - User
 *      summary: Get all merchants in the System
 *      description: Returns all users with role merchant available in the system. Admin only.
 *      responses:
 *          '200':
 *              description: Returns the merchant users
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/merchants", authMiddleware, checkRol(["admin"]), getMerchantsCtrl)

/**
 * @openapi
 * /api/users/clients/{webpage_id}:
 *  put:
 *      tags:
 *      - User
 *      summary: returns all the available clients for a webpage.
 *      description: returns all the available clients(users that receive offers) for a webpage.
 *      parameters:
 *          -   name: webpage_id
 *              in: path
 *              description: id of the webpage to check the clients
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the object array
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.get("/clients/:webpage_id", authMiddleware, checkRol(["merchant"]), validatorGetClients, ownsWebpageMiddleware ,getClientsCtrl) //MOVER A USERS ??

/**
 * @openapi
 * /api/users/id/{id}:
 *  put:
 *      tags:
 *      - User
 *      summary: Update a user
 *      description: Update a user by an admin
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the user that need to be updated
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/user"
 *      responses:
 *          '200':
 *              description: Returns the updated object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/id/:id", authMiddleware, validatorUpdateUser, updateUserCtrl)

/**
 * @openapi
 * /api/users/id/{id}:
 *  delete:
 *      tags:
 *      - User
 *      summary: Deletes a specific user in the system. Admin only.
 *      description: Deletes a specific user in the system. Users and merchants may only delete themselves. Admins may delete all user except admins.
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the user to delete
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          '200':
 *              description: User deleted
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.delete("/id/:id",authMiddleware, validatorDeleteUser, pruebasMiddleware, deleteUserCtrl)

module.exports = router