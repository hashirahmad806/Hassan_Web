import { Router } from 'express';
import type { Request, Response } from 'express';

const router = Router();

const galleryItems = [
  {
    id: 'case-042',
    title: 'Complete Smile Design',
    category: 'Anterior Aesthetics',
    beforeAlt: 'Patient smile before anterior aesthetic restoration',
    afterAlt: 'Patient smile after porcelain veneer restoration',
  },
  {
    id: 'case-089',
    title: 'Conservative Rejuvenation',
    category: 'Biomimetic Restorations',
    beforeAlt: 'Discolored and micro-fractured enamel',
    afterAlt: 'Whitened and rejuvenated tooth surface',
  },
  {
    id: 'case-112',
    title: 'Single Anterior Implant',
    category: 'Implantology',
    beforeAlt: 'Missing central incisor',
    afterAlt: 'Completed implant restoration',
  },
];

/** GET /api/gallery — returns all gallery case studies */
router.get('/', (_req: Request, res: Response) => {
  const { category } = _req.query;
  if (category && typeof category === 'string') {
    const filtered = galleryItems.filter((item) => item.category === category);
    res.json({ success: true, data: filtered });
    return;
  }
  res.json({ success: true, data: galleryItems });
});

export default router;
