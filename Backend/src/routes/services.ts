import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const services = [
  {
    id: 'cosmetic',
    title: 'Cosmetic Dentistry',
    description: 'Veneers, whitening, and complete smile makeovers tailored to your unique facial structure.',
    duration: '1-3 hours',
    priceFrom: '$500',
    icon: 'sparkles',
  },
  {
    id: 'implants',
    title: 'Dental Implants',
    description: 'Permanent, natural-looking tooth replacement utilizing the latest surgical advancements.',
    duration: '2-3 visits',
    priceFrom: '$2,500',
    icon: 'shield',
  },
  {
    id: 'orthodontics',
    title: 'Orthodontics',
    description: 'Discreet alignment solutions including Invisalign for a perfectly balanced smile.',
    duration: '12-24 months',
    priceFrom: '$3,500',
    icon: 'award',
  },
  {
    id: 'general',
    title: 'General Care',
    description: 'Comprehensive preventative and restorative treatments to maintain optimal oral health.',
    duration: '45-60 min',
    priceFrom: '$150',
    icon: 'heart',
  },
];

/** GET /api/services — returns the full list of services */
router.get('/', (_req: Request, res: Response) => {
  res.json({ success: true, data: services });
});

/** GET /api/services/:id — returns a single service */
router.get('/:id', (req: Request, res: Response) => {
  const service = services.find((s) => s.id === req.params['id']);
  if (!service) {
    res.status(404).json({ success: false, message: 'Service not found' });
    return;
  }
  res.json({ success: true, data: service });
});

export default router;
