/**
 * @swagger
 * tags: [Ads]
 *
 * components:
 *   schemas:
 *     Ad:
 *       type: object
 *       properties:
 *         id:         { type: integer }
 *         filename:   { type: string }
 *         url:        { type: string }
 *         status:     { type: string, enum: [pending, approved, rejected] }
 *         active:     { type: boolean }
 *         duration:   { type: integer }
 */

//
//  Upload  /api/ads/upload
//  List    /api/ads?status=pending
//  Approve /api/ads/:id/approve
//  Reject  /api/ads/:id/reject
//  Toggle  /api/ads/:id/active
//  Book    /api/ads/book
//

const express  = require('express');
const multer   = require('multer');
const upload   = multer({ dest: 'uploads/', limits: { fileSize: 60 * 1024 * 1024 } });

const { Ad, Booking, User } = require('../models');
const processAd   = require('../utils/processAd');
const auth        = require('../middleware/authenticateToken');
const requireRole = require('../middleware/requireRole');
const verifiedPhone = require('../middleware/requireVerifiedPhone');

const createTransporter = require('../config/transporter');
const templates = require('../utils/emailTemplates');

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const router = express.Router();

/* ------------------------------------------------- helpers */
async function sendMail(to, subject, html) {
  try {
    const t = await createTransporter();
    await t.sendMail({ from: process.env.COMPANY_EMAIL, to, subject, html });
  } catch (err) {
    console.error('📧 Mail error:', err.message);
  }
}
function adminList() {
  return (process.env.ADMIN_ALERT_LIST || '')
    .split(',').map(e => e.trim()).filter(Boolean);
}

/**
 * @swagger
 * /api/ads/upload:
 *   post:
 *     summary: Upload ad creative
 *     tags: [Ads]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               file:     { type: string, format: binary }
 *               duration: { type: integer, example: 30 }
 *     responses:
 *       200:
 *         description: Ad stored as pending
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/Ad' }
 */
router.post('/ads/upload',
  auth,
  verifiedPhone,
  upload.single('file'),
  async (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file' });

    const outName   = Date.now() + '_' + req.file.originalname;
    await processAd(req.file.path, outName);

    const baseUrl = process.env.BASE_URL || 'http://localhost:5004';
    const url     = `${baseUrl}/ads/${outName}`;

    const ad = await Ad.create({
      filename: outName,
      url,
      duration: req.body.duration || 30,
      uploaderId: req.user.id
    });

    sendMail(req.user.email,
      'Your ad is submitted and awaiting review',
      templates.adPending(req.user.email, ad.filename));

    if (adminList().length) {
      sendMail(adminList(),
        'New ad pending approval',
        templates.adminPending(ad.filename, req.user.email));
    }
    res.json(ad);
  });

/**
 * @swagger
 * /api/ads:
 *   get:
 *     summary: List ads by status (admin)
 *     tags: [Ads]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema: { type: string, enum: [pending, approved, rejected] }
 *         default: pending
 *     responses:
 *       200:
 *         description: Array of ads
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Ad' }
 */
router.get('/ads',
  auth,
  requireRole('admin', 'superAdmin'),
  async (req, res) => {
    const status = req.query.status || 'pending';
    const rows = await Ad.findAll({ where: { status }, include: User });
    res.json(rows);
  });

/**
 * @swagger
 * /api/ads/{id}/approve:
 *   patch:
 *     summary: Approve ad
 *     tags: [Ads]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses: { 200: { description: ok } }
 */
router.patch('/ads/:id/approve',
  auth,
  requireRole('admin', 'superAdmin'),
  async (req, res) => {
    const ad = await Ad.findByPk(req.params.id, { include: User });
    if (!ad) return res.status(404).json({ error: 'Not found' });

    await ad.update({ status: 'approved', active: true, approvedBy: req.user.id });
    sendMail(ad.User.email,'Your ad has been approved 🎉',
             templates.adApproved(ad.User.email, ad.filename));
    res.json({ ok: true });
  });

/**
 * @swagger
 * /api/ads/{id}/reject:
 *   patch:
 *     summary: Reject ad
 *     tags: [Ads]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: { reason: { type: string } }
 *     responses: { 200: { description: ok } }
 */
router.patch('/ads/:id/reject',
  auth,
  requireRole('admin', 'superAdmin'),
  async (req, res) => {
    const ad = await Ad.findByPk(req.params.id, { include: User });
    if (!ad) return res.status(404).json({ error: 'Not found' });

    await ad.update({
      status: 'rejected',
      active: false,
      rejectionReason: req.body.reason || '',
      approvedBy: req.user.id
    });
    sendMail(ad.User.email, 'Your ad has been rejected',
             templates.adRejected(ad.User.email, ad.filename, ad.rejectionReason));
    res.json({ ok: true });
  });

/**
 * @swagger
 * /api/ads/{id}/active:
 *   patch:
 *     summary: Toggle ad active flag
 *     tags: [Ads]
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties: { active: { type: boolean } }
 *     responses: { 200: { description: ok } }
 */
router.patch('/ads/:id/active',
  auth,
  requireRole('admin', 'superAdmin'),
  async (req, res) => {
    const ad = await Ad.findByPk(req.params.id);
    if (!ad) return res.status(404).json({ error: 'Not found' });

    await ad.update({ active: !!req.body.active });
    res.json({ ok: true, active: ad.active });
  });

/**
 * @swagger
 * /api/ads/book:
 *   post:
 *     summary: Book approved ad to a motorbike screen
 *     tags: [Ads]
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [motorbikeId, adId, startTime, endTime]
 *             properties:
 *               motorbikeId: { type: string, example: bike001 }
 *               adId:        { type: integer }
 *               startTime:   { type: string, format: date-time }
 *               endTime:     { type: string, format: date-time }
 *               volume:      { type: integer, example: 80 }
 *               brightness:  { type: integer, example: 100 }
 *     responses: { 200: { description: ok } }
 */
router.post('/ads/book',
  auth,
  verifiedPhone,
  async (req, res) => {
    const { motorbikeId, adId, startTime, endTime,
            volume = 80, brightness = 100 } = req.body;

    const ad = await Ad.findByPk(adId);
    if (!ad || ad.status !== 'approved' || !ad.active)
      return res.status(400).json({ error: 'Ad not approved/active' });

    if (new Date(endTime) <= new Date(startTime))
      return res.status(400).json({ error: 'endTime must be after startTime' });

    await Booking.create({ motorbikeId, adId, startTime, endTime, volume, brightness, paid: false });
    res.json({ ok: true });
  });

module.exports = router;
