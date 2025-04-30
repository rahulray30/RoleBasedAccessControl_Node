const express = require("express");
const router = express.Router();
const permissionController = require("../controllers/permissionController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Permission:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - module
 *         - actions
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the permission
 *         description:
 *           type: string
 *           description: Description of the permission
 *         module:
 *           type: string
 *           description: ID of the module this permission belongs to
 *         actions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of action IDs associated with this permission
 *         isActive:
 *           type: boolean
 *           description: Whether the permission is active
 *         metadata:
 *           type: object
 *           description: Additional metadata for the permission
 */

/**
 * @swagger
 * /api/permissions:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       201:
 *         description: Permission created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       400:
 *         description: Invalid input data
 *       404:
 *         description: Module or Action not found
 */
router.post("/", permissionController.createPermission);

/**
 * @swagger
 * /api/permissions:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permissions]
 *     responses:
 *       200:
 *         description: List of all permissions
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
router.get("/", permissionController.getPermissions);

/**
 * @swagger
 * /api/permissions/{id}:
 *   get:
 *     summary: Get permission by ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Permission'
 *       404:
 *         description: Permission not found
 */
router.get("/:id", permissionController.getPermission);

/**
 * @swagger
 * /api/permissions/module/{moduleId}:
 *   get:
 *     summary: Get permissions by module ID
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: moduleId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of permissions for the specified module
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Permission'
 */
router.get("/module/:moduleId", permissionController.getPermissionsByModule);

/**
 * @swagger
 * /api/permissions/{id}:
 *   put:
 *     summary: Update permission
 *     tags: [Permissions]
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
 *             $ref: '#/components/schemas/Permission'
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       404:
 *         description: Permission, Module, or Action not found
 */
router.put("/:id", permissionController.updatePermission);

/**
 * @swagger
 * /api/permissions/{id}:
 *   delete:
 *     summary: Delete permission
 *     tags: [Permissions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       404:
 *         description: Permission not found
 */
router.delete("/:id", permissionController.deletePermission);

module.exports = router;
