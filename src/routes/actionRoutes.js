const express = require("express");
const router = express.Router();
const actionController = require("../controllers/actionController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Action:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the action
 *         description:
 *           type: string
 *           description: Description of the action
 *         isActive:
 *           type: boolean
 *           description: Whether the action is active
 *         metadata:
 *           type: object
 *           description: Additional metadata for the action
 */

/**
 * @swagger
 * /api/actions/createActions:
 *   post:
 *     summary: Create a new action
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Action'
 *     responses:
 *       201:
 *         description: Action created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 *       400:
 *         description: Invalid input data
 */
router.post("/createActions", actionController.createAction);

/**
 * @swagger
 * /api/actions:
 *   get:
 *     summary: Get all actions
 *     tags: [Actions]
 *     responses:
 *       200:
 *         description: List of all actions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Action'
 */
router.get("/", actionController.getActions);

/**
 * @swagger
 * /api/actions/{id}:
 *   get:
 *     summary: Get action by ID
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Action'
 *       404:
 *         description: Action not found
 */
router.get("/:id", actionController.getAction);

/**
 * @swagger
 * /api/actions/{id}:
 *   put:
 *     summary: Update action
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Action'
 *     responses:
 *       200:
 *         description: Action updated successfully
 *       404:
 *         description: Action not found
 */
router.put("/:id", actionController.updateAction);

/**
 * @swagger
 * /api/actions/{id}:
 *   delete:
 *     summary: Delete action
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Action deleted successfully
 *       404:
 *         description: Action not found
 */
router.delete("/:id", actionController.deleteAction);

module.exports = router;
