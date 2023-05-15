
const express = require("express")
const router = express.Router()

const {validatorCreateWebpage, validatorUpdateWebpage, validatorGetWebpage, validatorgetWebpageByCityActivity, validatorCreateReview} = require("../validators/webpages")

const {checkRol} = require("../middleware/rol")
const {authMiddleware, ownsWebpageMiddleware} = require("../middleware/session")

const {createWebpageCtrl, updateWebpageCtrl, getWebpagesCtrl, getWebpageCtrl, getWebpageByCityActivityCtrl, createReviewCtrl} = require('../controllers/webpages')

/**
 * @openapi
 * /api/webpages/:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Get all webpages in the System
 *      description: Returns all webpages available in the system.
 *      responses:
 *          '200':
 *              description: Returns the object array
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/", getWebpagesCtrl)

/**
 * @openapi
 * /api/webpages/id/{webpage_id}:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Get a specific webpage in the system. 
 *      description: returns a specific webpage, based on his id
 *      parameters:
 *          -   name: webpage_id
 *              in: path
 *              description: id of the webpage to return
 *              required: true
 *              schema:
 *                  type: integer
 *      responses:
 *          '200':
 *              description: Returns the object
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/id/:webpage_id", validatorGetWebpage,getWebpageCtrl)

/**
 * @openapi
 * /api/webpages/search/{city}:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Get webpages that belong to a city
 *      description: returns all webpages that belong to a specific city. For example, all located in Málaga.
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: name of the city you want to filter
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the object array
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/search/:city", validatorgetWebpageByCityActivity, getWebpageByCityActivityCtrl)

/**
 * @openapi
 * /api/webpages/search/{city}/{activity}:
 *  get:
 *      tags:
 *      - Webpage
 *      summary: Get webpages that belong to a city and an activity
 *      description: returns all webpages that belong to a specific city and work in that same activity.
 *      parameters:
 *          -   name: city
 *              in: path
 *              description: name of the city you want to filter
 *              required: true
 *              schema:
 *                  type: string
 *          -   name: activity
 *              in: path
 *              description: name of the activity you want to filter
 *              required: true
 *              schema:
 *                  type: string
 *      responses:
 *          '200':
 *              description: Returns the object array
 *          '500':
 *              description: Server error
 *      security:
 *          - bearerAuth: []
 */
router.get("/search/:city/:activity", validatorgetWebpageByCityActivity,getWebpageByCityActivityCtrl)

/**
 * @openapi
 * /api/webpages/:
 *  post:
 *      tags:
 *      - Webpage
 *      summary: Webpage register
 *      description: Register a new webpage for a company, through the user that owns that company.
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Webpage"
 *      responses:
 *          '200':
 *              description: Returns the inserted object
 *          '401':
 *              description: Validation error
 */
router.post("/", authMiddleware, checkRol(["merchant"]), validatorCreateWebpage, createWebpageCtrl)

/**
 * @openapi
 * /api/webpages/id/{webpage_id}:
 *  put:
 *      tags:
 *      - Webpage
 *      summary: Update a webpage.
 *      description: Update a webpage by an admin or the webpage owner.
 *      parameters:
 *          -   name: webpage_id
 *              in: path
 *              description: id of the webpage that need to be updated.
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Webpage"
 *      responses:
 *          '200':
 *              description: Returns the updated object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.put("/id/:webpage_id", authMiddleware, checkRol(["admin", "merchant"]), validatorUpdateWebpage, ownsWebpageMiddleware, updateWebpageCtrl)

/**
 * @openapi
 * /api/webpages/id/{webpage_id}:
 *  patch:
 *      tags:
 *      - Webpage
 *      summary: Generate a review for a webpage.
 *      description: Generates a review for a webpage from a basic user.
 *      parameters:
 *          -   name: webpage_id
 *              in: path
 *              description: id of the webpage that will receive the review.
 *              required: true
 *              schema:
 *                  type: integer
 *      requestBody:
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Review"
 *      responses:
 *          '200':
 *              description: Returns the review object
 *          '401':
 *              description: Validation error
 *      security:
 *          - bearerAuth: []
 */
router.patch("/id/:webpage_id", authMiddleware, checkRol(["user"]), validatorCreateReview,createReviewCtrl)

module.exports = router