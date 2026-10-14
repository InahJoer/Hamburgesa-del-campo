/**
 * Delivery zones configuration for Hamburguesas del Campo.
 * Zones are ordered from nearest to farthest.
 */
export const DELIVERY_ZONES = [
  {
    id: 'zona-1',
    name: 'Zona 1 — Cercana',
    description: 'Villa Jerusalén, Sabana Grande centro, alrededores del local',
    areas: ['Villa Jerusalén', 'Sabana Grande Centro', 'Bismarck Martínez'],
    fee: 30,
    estimatedTime: '15–25 min',
  },
  {
    id: 'zona-2',
    name: 'Zona 2 — Media',
    description: 'Barrios aledaños a Sabana Grande',
    areas: ['Ciudadela Nicaragua', 'Villa Reconciliación', 'Bello Amanecer', 'Residencial Las Mercedes'],
    fee: 50,
    estimatedTime: '25–40 min',
  },
  {
    id: 'zona-3',
    name: 'Zona 3 — Extendida',
    description: 'Zonas más alejadas del sector sur de Managua',
    areas: ['Esquipulas', 'Veracruz', 'Villa Venezuela', 'Otras zonas'],
    fee: 80,
    estimatedTime: '35–55 min',
  },
];

export const PICKUP_OPTION = {
  id: 'pickup',
  name: 'Retiro en el local',
  description: 'Recogé tu pedido directamente en nuestro local.',
  fee: 0,
  estimatedTime: '15–20 min',
};

export const PAYMENT_METHODS = [
  {
    id: 'cash',
    name: 'Efectivo al recibir',
    icon: 'Banknote',
    description: 'Pagás al recibir tu pedido. Tené el monto exacto si es posible.',
  },
  {
    id: 'transfer',
    name: 'Depósito / Transferencia',
    icon: 'CreditCard',
    description: 'Realizá la transferencia y enviá el comprobante por WhatsApp.',
    bankInfo: {
      bank: 'BAC Credomatic',
      accountHolder: 'Hamburguesas del Campo',
      accountNumber: 'XXXX-XXXX-XXXX',
      accountType: 'Cuenta Corriente C$',
    },
  },
];
