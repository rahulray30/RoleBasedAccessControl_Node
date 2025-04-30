const express = require("express");
const router = express.Router();
const moduleController = require("../controllers/moduleController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Module:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the module
 *         description:
 *           type: string
 *           description: Description of the module
 *         version:
 *           type: string
 *           description: Version of the module
 *           default: 1.0.0
 *         isActive:
 *           type: boolean
 *           description: Whether the module is active
 *         metadata:
 *           type: object
 *           description: Additional metadata for the module
 */

/**
 * @swagger
 * /api/modules/createModule:
 *   post:
 *     summary: Create a new module
 *     tags: [Modules]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       201:
 *         description: Module created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 */
router.post("/createModule", moduleController.createModule);

/**
 * @swagger
 * /api/modules:
 *   get:
 *     summary: Get all modules
 *     tags: [Modules]
 *     responses:
 *       200:
 *         description: List of all modules
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Module'
 */
router.get("/", moduleController.getModules);


/**
 * @swagger
 * /api/modules/{id}:
 *   get:
 *     summary: Get module by ID
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Module'
 */
router.get("/:id", moduleController.getModule);

/**
 * @swagger
 * /api/modules/{id}:
 *   put:
 *     summary: Update module
 *     tags: [Modules]
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
 *             $ref: '#/components/schemas/Module'
 *     responses:
 *       200:
 *         description: Module updated successfully
 */
router.put("/:id", moduleController.updateModule);

/**
 * @swagger
 * /api/modules/{id}:
 *   delete:
 *     summary: Delete module
 *     tags: [Modules]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Module deleted successfully
 */
router.delete("/:id", moduleController.deleteModule);

module.exports = router;
