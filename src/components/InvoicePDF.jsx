import jsPDF from 'jspdf';

/**
 * Generates a professional invoice PDF for an order.
 * Uses jsPDF to create the document entirely client-side.
 */
export function generateInvoicePDF({ orderNumber, cart, form, deliveryOption, paymentMethod, subtotal, deliveryFee, total }) {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' });
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  const contentWidth = pageWidth - margin * 2;
  let y = margin;

  // ─── Colors ──────────────────────────────
  const darkBrown = [46, 31, 23];     // #2E1F17
  const deepRed = [107, 31, 26];      // #6B1F1A
  const amber = [217, 119, 6];        // #D97706
  const lightCream = [250, 242, 223]; // #FAF2DF
  const borderGray = [213, 197, 163]; // #D5C5A3

  const now = new Date();
  const dateStr = now.toLocaleDateString('es-NI', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeStr = now.toLocaleTimeString('es-NI', { hour: '2-digit', minute: '2-digit' });

  // ─── Header Background ──────────────────
  doc.setFillColor(...darkBrown);
  doc.rect(0, 0, pageWidth, 42, 'F');

  // ─── Brand Name ─────────────────────────
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.text('HAMBURGUESAS', margin, 16);
  doc.setFontSize(26);
  doc.text('DEL CAMPO', margin, 26);

  // ─── Slogan ─────────────────────────────
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...amber);
  doc.text('El verdadero sabor de la buena hamburguesa', margin, 33);

  // ─── FACTURA label ──────────────────────
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('FACTURA', pageWidth - margin, 14, { align: 'right' });
  doc.setFontSize(14);
  doc.setTextColor(...amber);
  doc.text(orderNumber, pageWidth - margin, 22, { align: 'right' });
  doc.setFontSize(8);
  doc.setTextColor(200, 200, 200);
  doc.text(`${dateStr}  •  ${timeStr}`, pageWidth - margin, 30, { align: 'right' });

  y = 50;

  // ─── Customer Info Box ──────────────────
  doc.setFillColor(...lightCream);
  doc.setDrawColor(...borderGray);
  doc.roundedRect(margin, y, contentWidth, 28, 2, 2, 'FD');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...amber);
  doc.text('DATOS DEL CLIENTE', margin + 4, y + 6);

  doc.setFontSize(9);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...darkBrown);
  doc.text(form.name || 'Sin nombre', margin + 4, y + 13);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.text(`Tel: ${form.phone || 'N/A'}`, margin + 4, y + 19);

  if (form.address) {
    doc.text(`Dirección: ${form.address}`, margin + 4, y + 24);
  }

  // Delivery & Payment info on the right side
  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...amber);
  doc.text('ENTREGA', pageWidth - margin - 50, y + 6);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkBrown);
  doc.text(deliveryOption?.name || 'N/A', pageWidth - margin - 50, y + 12);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(...amber);
  doc.text('PAGO', pageWidth - margin - 50, y + 18);

  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkBrown);
  doc.text(paymentMethod?.name || 'N/A', pageWidth - margin - 50, y + 24);

  y += 36;

  // ─── Table Header ───────────────────────
  doc.setFillColor(...darkBrown);
  doc.rect(margin, y, contentWidth, 8, 'F');

  doc.setFontSize(7);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('PRODUCTO', margin + 4, y + 5.5);
  doc.text('CANT.', margin + contentWidth * 0.58, y + 5.5);
  doc.text('P. UNIT.', margin + contentWidth * 0.70, y + 5.5);
  doc.text('TOTAL', margin + contentWidth - 4, y + 5.5, { align: 'right' });

  y += 8;

  // ─── Table Rows ─────────────────────────
  cart.forEach((item, index) => {
    const rowH = 8;
    const isEven = index % 2 === 0;

    if (isEven) {
      doc.setFillColor(255, 255, 255);
    } else {
      doc.setFillColor(252, 248, 240);
    }
    doc.rect(margin, y, contentWidth, rowH, 'F');

    // Left border accent
    doc.setFillColor(...amber);
    doc.rect(margin, y, 1.5, rowH, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkBrown);

    const productName = item.name.length > 35 ? item.name.substring(0, 33) + '...' : item.name;
    doc.text(productName, margin + 5, y + 5.5);

    doc.setFont('helvetica', 'bold');
    doc.text(`x${item.quantity}`, margin + contentWidth * 0.58, y + 5.5);
    doc.text(`C$ ${item.price}`, margin + contentWidth * 0.70, y + 5.5);
    doc.setTextColor(...deepRed);
    doc.text(`C$ ${item.price * item.quantity}`, margin + contentWidth - 4, y + 5.5, { align: 'right' });

    y += rowH;
  });

  // ─── Bottom border line ─────────────────
  doc.setDrawColor(...borderGray);
  doc.line(margin, y, margin + contentWidth, y);

  y += 6;

  // ─── Totals Section ─────────────────────
  const totalsX = margin + contentWidth * 0.58;

  // Subtotal
  doc.setFontSize(8);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(...darkBrown);
  doc.text('Subtotal:', totalsX, y);
  doc.text(`C$ ${subtotal}`, margin + contentWidth - 4, y, { align: 'right' });

  y += 6;

  // Delivery
  doc.text(`Delivery (${deliveryOption?.name || ''})`, totalsX, y);
  doc.text(deliveryFee === 0 ? 'A coordinar' : `C$ ${deliveryFee}`, margin + contentWidth - 4, y, { align: 'right' });

  y += 4;
  doc.setDrawColor(...amber);
  doc.setLineWidth(0.5);
  doc.line(totalsX, y, margin + contentWidth, y);

  y += 7;

  // Total
  doc.setFillColor(...amber);
  doc.roundedRect(totalsX - 2, y - 5, contentWidth - (totalsX - margin) + 6, 12, 2, 2, 'F');

  doc.setFontSize(11);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('TOTAL:', totalsX + 2, y + 3);
  doc.setFontSize(13);
  doc.text(`C$ ${total}`, margin + contentWidth - 2, y + 3, { align: 'right' });

  y += 18;

  // ─── Notes ──────────────────────────────
  if (form.notes) {
    doc.setFillColor(...lightCream);
    doc.setDrawColor(...borderGray);
    doc.roundedRect(margin, y, contentWidth, 14, 2, 2, 'FD');

    doc.setFontSize(7);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...amber);
    doc.text('NOTAS:', margin + 4, y + 5);

    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...darkBrown);
    doc.text(form.notes, margin + 4, y + 11);

    y += 20;
  }

  // ─── Footer ─────────────────────────────
  const footerY = doc.internal.pageSize.getHeight() - 20;

  doc.setDrawColor(...borderGray);
  doc.line(margin, footerY - 4, margin + contentWidth, footerY - 4);

  doc.setFontSize(7);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(150, 150, 150);
  doc.text('Hamburguesas del Campo — Villa Jerusalén, Sabana Grande, Managua', pageWidth / 2, footerY, { align: 'center' });
  doc.text('WhatsApp: 7506-7035  •  Martes a Domingo: 4:00 PM – 10:30 PM', pageWidth / 2, footerY + 5, { align: 'center' });
  doc.text('¡Gracias por tu preferencia!', pageWidth / 2, footerY + 10, { align: 'center' });

  // ─── Save ───────────────────────────────
  doc.save(`Factura_${orderNumber}.pdf`);
}
