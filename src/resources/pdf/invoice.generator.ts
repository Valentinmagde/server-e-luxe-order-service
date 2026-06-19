import PDFDocument from "pdfkit";
import path from "path";
import fs from "fs";

const GOLD   = "#ca8a04";
const DARK   = "#1a1a1a";
const GRAY   = "#888888";
const LIGHT  = "#f7f7f7";
const BORDER = "#e0e0e0";

const STORE_LOGO_URL = process.env.STORE_LOGO_URL  || "";
const STORE_VAT      = process.env.STORE_VAT_NUMBER || "";
const STORE_ADDRESS  = process.env.STORE_ADDRESS    || "8206 Louisiana Blvd NE, Ste A #4894, Albuquerque, NM 87113";
const STORE_PHONE    = process.env.STORE_PHONE      || "+1 402 - 252 - 8545";
const STORE_EMAIL    = process.env.STORE_EMAIL      || "contact@e-luxe.fr";
const STORE_URL      = process.env.STORE_URL        || "e-luxe.fr";

const EUR = (n: number) => `€${n.toFixed(2)}`;

async function fetchLogoBuffer(): Promise<Buffer | null> {
  if (STORE_LOGO_URL) {
    try {
      const res = await fetch(STORE_LOGO_URL);
      if (res.ok) {
        return Buffer.from(await res.arrayBuffer());
      }
    } catch { /* fall through */ }
  }
  // Fallback: local logo.png copied from backoffice assets
  const localPath = path.join(__dirname, "logo.png");
  try {
    return fs.readFileSync(localPath);
  } catch {
    return null;
  }
}

export async function generateInvoicePdf(order: any): Promise<Buffer> {
  const logoBuffer = await fetchLogoBuffer();

  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50, size: "A4" });
    const chunks: Buffer[] = [];

    doc.on("data", (c: Buffer) => chunks.push(c));
    doc.on("end",  () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    const W = doc.page.width - 100;
    const L = 50;
    const R = L + W;

    const addr  = order.shipping_address || {};
    const items = order.order_items || [];

    // ── Header ──────────────────────────────────────────────────────────────
    // Left: INVOICE title + VAT
    doc
      .fillColor(DARK)
      .font("Helvetica-Bold")
      .fontSize(26)
      .text("INVOICE", L, 50);

    if (STORE_VAT) {
      doc
        .fillColor(GRAY)
        .font("Helvetica")
        .fontSize(10)
        .text(`Vat Number : ${STORE_VAT}`, L, 82);
    }

    // Right: logo (image from URL or local file, fallback to text)
    const logoW = 150;
    if (logoBuffer) {
      doc.image(logoBuffer, R - logoW, 38, { width: logoW });
    } else {
      doc
        .fillColor(DARK)
        .font("Times-BoldItalic")
        .fontSize(22)
        .text("é-Luxe", L, 50, { width: W, align: "right" });
    }

    // Address block (right-aligned, below logo)
    const addrLines = [STORE_ADDRESS, STORE_PHONE, STORE_EMAIL, STORE_URL];
    doc.fillColor(GRAY).font("Helvetica").fontSize(9);
    let addrY = 78;
    addrLines.forEach((line) => {
      doc.text(line, L, addrY, { width: W, align: "right" });
      addrY += doc.heightOfString(line, { width: W }) + 1;
    });

    // ── Separator 1 ─────────────────────────────────────────────────────────
    const s1Y = 136;
    doc.moveTo(L, s1Y).lineTo(R, s1Y).strokeColor(BORDER).lineWidth(0.5).stroke();

    // ── Meta row: DATE | INVOICE NO | INVOICE TO ────────────────────────────
    const mTop = s1Y + 16;
    const c1   = L;
    const c2   = L + 160;
    const c3   = L + 320;
    const c3W  = W - 320;

    doc.fillColor(GRAY).font("Helvetica-Bold").fontSize(8);
    doc.text("DATE",       c1, mTop);
    doc.text("INVOICE NO", c2, mTop);
    doc.text("INVOICE TO", c3, mTop, { width: c3W, align: "right" });

    const mVal    = mTop + 14;
    const dateStr = new Date(order.created_at || Date.now())
      .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

    doc.fillColor(DARK).font("Helvetica").fontSize(10);
    doc.text(dateStr,                          c1, mVal);
    doc.text(`#${order.invoice || order._id}`, c2, mVal);

    const street =
      typeof addr.address === "object"
        ? addr.address?.street || ""
        : addr.address || "";
    const apartment =
      typeof addr.address === "object" ? addr.address?.apartment || "" : "";

    const toLines = [
      addr.full_name || "",
      addr.phone     || "",
      addr.email     || "",
      street,
      apartment,
      [addr.city, addr.country?.toLowerCase(), addr.postal_code].filter(Boolean).join(", "),
    ].filter(Boolean);

    doc.fillColor(DARK).font("Helvetica").fontSize(9);
    let toY = mVal;
    toLines.forEach((line) => {
      doc.text(line, c3, toY, { width: c3W, align: "right" });
      toY += doc.heightOfString(line, { width: c3W }) + 2;
    });

    // ── Separator 2 ─────────────────────────────────────────────────────────
    const s2Y = Math.max(mVal + 80, toY + 10);
    doc.moveTo(L, s2Y).lineTo(R, s2Y).strokeColor(BORDER).lineWidth(0.5).stroke();

    // ── Products table ───────────────────────────────────────────────────────
    const tTop  = s2Y + 10;
    const cTitle = L + 4;
    const cQty   = L + 290;
    const cPrice = L + 370;
    const cAmt   = L + 450;
    const cQtyW  = 70;
    const cPrW   = 70;
    const cAmtW  = W - 450;

    doc.rect(L, tTop, W, 22).fill(LIGHT);
    doc.fillColor(GRAY).font("Helvetica-Bold").fontSize(8);
    doc.text("PRODUCT TITLE", cTitle, tTop + 7, { width: 280 });
    doc.text("QUANTITY",      cQty,   tTop + 7, { width: cQtyW, align: "center" });
    doc.text("ITEM PRICE",    cPrice, tTop + 7, { width: cPrW,  align: "right"  });
    doc.text("AMOUNT",        cAmt,   tTop + 7, { width: cAmtW, align: "right"  });

    let y = tTop + 30;
    items.forEach((item: any) => {
      const name         = item.title?.["fr"] || item.title?.["en"] || "—";
      const unitPrice     = Number(item.price) || 0;
      const originalPrice = Number(item.original_price) || 0;
      const hasDiscount   = originalPrice > unitPrice;
      const lineTotal     = unitPrice * (item.qty || 1);

      doc.fillColor(DARK).font("Helvetica").fontSize(10);
      doc.text(name,                  cTitle, y, { width: 280, ellipsis: true });
      doc.text(String(item.qty || 1), cQty,   y, { width: cQtyW, align: "center" });

      if (hasDiscount) {
        doc.fillColor(GRAY).font("Helvetica").fontSize(8);
        doc.text(EUR(originalPrice), cPrice, y - 9, { width: cPrW, align: "right", strike: true } as any);
        doc.fillColor(DARK).font("Helvetica").fontSize(10);
      }
      doc.text(EUR(unitPrice), cPrice, y, { width: cPrW, align: "right" });

      doc.fillColor(GOLD).font("Helvetica-Bold");
      doc.text(EUR(lineTotal), cAmt, y, { width: cAmtW, align: "right" });

      y += 22;
    });

    // ── Footer totals row ────────────────────────────────────────────────────
    y += 16;
    const fH = 38;
    doc.rect(L, y, W, fH).fill(LIGHT);

    const fCols = [
      { label: "PAYMENT METHOD", x: L + 4,   w: 110 },
      { label: "SUBTOTAL",       x: L + 120,  w: 80,  center: true },
      { label: "SHIPPING COST",  x: L + 210,  w: 90,  center: true },
      { label: "DISCOUNT",       x: L + 310,  w: 80,  center: true },
      { label: "TOTAL",          x: L + 400,  w: 90,  right: true  },
    ];

    const payLabel =
      order.payment_method === "stripe"                ? "Credit card"
      : order.payment_method === "paypal"              ? "PayPal"
      : order.payment_method === "airwallex"           ? "Credit card"
      : order.payment_method === "direct-bank-transfer"? "Bank transfer"
      : order.payment_method || "—";

    const fValues = [
      payLabel,
      EUR(Number(order.items_price   || order.sub_total    || 0)),
      EUR(Number(order.shipping_price || order.shipping_cost || 0)),
      EUR(Number(order.discount      || 0)),
      EUR(Number(order.total_price   || order.total        || 0)),
    ];

    fCols.forEach((col, i) => {
      const align    = col.right ? "right" : col.center ? "center" : "left";
      const isTotal  = i === fCols.length - 1;

      doc.fillColor(GRAY).font("Helvetica-Bold").fontSize(7.5);
      doc.text(col.label, col.x, y + 5, { width: col.w, align });

      doc
        .fillColor(isTotal ? GOLD : DARK)
        .font(isTotal ? "Helvetica-Bold" : "Helvetica")
        .fontSize(9.5);
      doc.text(fValues[i], col.x, y + 18, { width: col.w, align });
    });

    doc.end();
  });
}
