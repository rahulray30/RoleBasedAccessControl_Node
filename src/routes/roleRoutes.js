const express = require("express");
const router = express.Router();
const { auth, authorize } = require("../middleware/auth");
const roleController = require("../controllers/roleController");
const superadminAuth = require("../middleware/superadminAuth");

/**
 * @swagger
 * components:
 *   schemas:
 *     Role:
 *       type: object
 *       required:
 *         - name
 *         - description
 *         - permissions
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the role
 *         description:
 *           type: string
 *           description: Description of the role
 *         permissions:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of permission IDs associated with this role
 *         isActive:
 *           type: boolean
 *           description: Whether the role is active
 *         metadata:
 *           type: object
 *           description: Additional metadata for the role
 */

/**
 * @swagger
 * /api/roles:
 *   post:
 *     summary: Create a new role (Superadmin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       201:
 *         description: Role created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       400:
 *         description: Invalid input data
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (not a superadmin)
 *       404:
 *         description: Permission not found
 */
router.post("/", [auth, superadminAuth], roleController.createRole);

/**
 * @swagger
 * /api/roles:
 *   get:
 *     summary: Get all roles (Superadmin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all roles
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Role'
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (not a superadmin)
 */
router.get("/", [auth, superadminAuth], roleController.getRoles);

/**
 * @swagger
 * /api/roles/{id}:
 *   get:
 *     summary: Get role by ID (Superadmin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Role'
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (not a superadmin)
 *       404:
 *         description: Role not found
 */
router.get("/:id", [auth, superadminAuth], roleController.getRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   put:
 *     summary: Update role (Superadmin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
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
 *             $ref: '#/components/schemas/Role'
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (not a superadmin)
 *       404:
 *         description: Role or Permission not found
 */
router.put("/:id", [auth, superadminAuth], roleController.updateRole);

/**
 * @swagger
 * /api/roles/{id}:
 *   delete:
 *     summary: Delete role (Superadmin only)
 *     tags: [Roles]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *       401:
 *         description: Not authenticated
 *       403:
 *         description: Not authorized (not a superadmin)
 *       404:
 *         description: Role not found
 */
router.delete("/:id", [auth, superadminAuth], roleController.deleteRole);

module.exports = router;
