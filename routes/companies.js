const express = require("express")
const router = express.Router()

const {validatorUpdateCompany} = require("../validators/companies")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsCompanyMiddleware} = require("../middleware/session")

const {deleteUserCtrl, updateMerchantCtrl} = require('../controllers/companies')


/**
 * @openapi
 * /api/companies/{id}:
 *  put:
 *      tags:
 *      - Company
 *      summary: Update a company
 *      description: Update a user by an admin
 *      parameters:
 *          -   name: id
 *              in: path
 *              description: id of the company that need to be updated
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/company"
 *      responses:
 *          '200':
 *              description: Returns the updated object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/:id", authMiddleware, checkRol(["admin", "merchant"]), ownsCompanyMiddleware, validatorUpdateCompany, )


module.exports = router