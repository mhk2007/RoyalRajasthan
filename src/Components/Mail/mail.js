
const escapeHtml = (value) =>
  String(value ?? "—").replace(/[&<>"']/g, (character) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };

    return entities[character];
  });

// Generate booking email content
export function getBookingEmailContent(booking) {
  const details = [
    ["Customer", booking.name],
    ["Email", booking.email],
    ["Phone", booking.phone],
    ["Date", booking.date],
    ["Time", booking.time],
    ["Guests", booking.guests],
    ["Special Request", booking.request],
  ];

  return {
    admin: {
      subject: "Royal Rajasthan | New Table Booking",
      intro: "A new table booking has been received.",
      details,
    },
    customer: {
      subject: "Royal Rajasthan | Booking Confirmation",
      intro: "Your table booking has been received successfully.",
      details,
    },
  };
}

// Generate order email content
export function getOrderEmailContent(order) {
  const itemsText = Array.isArray(order.items)
    ? order.items
        .map((item) => {
          const name = item.name || item.title || "Item";
          const quantity = item.quantity ?? 1;

          return `${name} — Quantity: ${quantity}`;
        })
        .join(", ")
    : String(order.items ?? "—");

  const details = [
    ["Customer", order.customerName],
    ["Email", order.email],
    ["Table Number", order.tableNumber],
    ["Items", itemsText],
    ["Total Price", order.totalPrice],
  ];

  return {
    admin: {
      subject: "Royal Rajasthan | New Order",
      intro: "A new order has been received.",
      details,
    },
    customer: {
      subject: "Royal Rajasthan | Order Confirmation",
      intro: "Your order has been received successfully.",
      details,
    },
  };
}

// Create the email design
export function renderMail(subject, details, intro) {
  const configuredWebsiteUrl = String(process.env.WEBSITE_URL || "").trim();
  let websiteUrl = "";

  try {
    const parsedWebsiteUrl = new URL(configuredWebsiteUrl);
    if (["http:", "https:"].includes(parsedWebsiteUrl.protocol)) {
      websiteUrl = parsedWebsiteUrl.toString().replace(/\/$/, "");
    }
  } catch {
    // Leave the website link out until a valid public URL is configured.
  }

  const cleanSubject = subject.replace(/\s*#\s*\S+$/, "");
  const emailTitle = cleanSubject.replace(
    /^Royal Rajasthan\s*\|\s*/,
    ""
  );

  const visibleDetails = details.filter(
    ([label]) =>
      !/\b(?:order|booking)?\s*id\b/i.test(String(label))
  );

  const textDetails = visibleDetails
    .map(([label, value]) => `${label}: ${value ?? "—"}`)
    .join("\n");

  const rows = visibleDetails
    .map(([label, value]) => {
      const commonCellStyle =
        "padding:12px 10px;border-bottom:1px solid #f1e8dc;font-size:14px;";

      if (/^Quantity:/i.test(String(value ?? ""))) {
        return `
          <tr>
            <td colspan="2" style="${commonCellStyle}color:#27211d;line-height:1.6;text-align:left;overflow-wrap:anywhere;word-break:break-word">
              <div style="font-weight:700">${escapeHtml(label)}</div>
              <div style="margin-top:3px;color:#6b6258;font-weight:400">${escapeHtml(value)}</div>
            </td>
          </tr>`;
      }

      return `
        <tr>
          <td class="detail-label" style="width:30%;${commonCellStyle}color:#6b6258;white-space:nowrap;word-break:normal">
            ${escapeHtml(label)}
          </td>
          <td class="detail-value" style="width:70%;${commonCellStyle}color:#27211d;font-weight:600;text-align:right;overflow-wrap:anywhere;word-break:break-word">
            ${escapeHtml(value)}
          </td>
        </tr>`;
    })
    .join("");

  const recipientName = visibleDetails.find(([label]) =>
    /^(customer|name)$/i.test(String(label))
  )?.[1];

  const showGreeting = /confirmation|table booking/i.test(cleanSubject);

  const greetingText = showGreeting
    ? `Dear${recipientName ? ` ${recipientName}` : ""}, thank you for choosing Royal Rajasthan. We are delighted to serve you.`
    : "";

  const greetingHtml = showGreeting
    ? `<p style="max-width:680px;box-sizing:border-box;margin:0 auto 14px;padding:0 8px;color:#51483f;font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.7">Dear${recipientName ? ` ${escapeHtml(recipientName)}` : ""}, thank you for choosing <strong style="color:#7f1d1d">Royal Rajasthan</strong>. We are delighted to serve you.</p>`
    : "";

  const text = `${
    greetingText ? `${greetingText}\n\n` : ""
  }${intro}\n\n${textDetails}\n\nWarm regards,\nRoyal Rajasthan${
    websiteUrl
      ? `\n\nReady for another royal experience? Visit us: ${websiteUrl}`
      : ""
  }`;

  const html = `
    <style>
      @media only screen and (max-width: 480px) {
        .email-shell { padding: 8px 6px !important; }
        .email-header { padding: 12px !important; }
        .email-footer { padding: 18px 12px !important; }
        .email-body { padding: 14px 4px !important; }
        .email-title { font-size: 20px !important; }
        .detail-table {
          display: table !important;
          width: calc(100% + 8px) !important;
          margin-left: -4px !important;
          table-layout: fixed !important;
        }
        .detail-table tbody { display: table-row-group !important; width: 100% !important; }
        .detail-table tr { display: table-row !important; width: 100% !important; }
        .detail-table td {
          display: table-cell !important;
          box-sizing: border-box !important;
          padding: 9px 8px !important;
          text-align: left !important;
          vertical-align: top !important;
          overflow-wrap: anywhere !important;
          word-break: normal !important;
        }
        .detail-label { width: 30% !important; white-space: nowrap !important; }
        .detail-value { width: 70% !important; text-align: left !important; }
      }
    </style>

    <div class="email-shell" style="width:100%;box-sizing:border-box;margin:0;background:#f7f3ed;padding:28px 12px;font-family:Arial,Helvetica,sans-serif;color:#29231e">
      ${greetingHtml}
      <div class="email-card" style="width:100%;max-width:680px;box-sizing:border-box;margin:0 auto;background:#ffffff;border:1px solid #eee3d5;border-radius:14px;overflow:hidden">
        <div class="email-header" style="padding:18px 24px;background:#7f1d1d;text-align:center">
          <div style="color:#f3cf82;font-size:12px;font-weight:700;letter-spacing:3px;text-transform:uppercase">Royal Rajasthan</div>
          <h1 class="email-title" style="margin:6px 0 0;color:#ffffff;font-family:Georgia,serif;font-size:24px;font-weight:600">${escapeHtml(emailTitle)}</h1>
        </div>

        <div class="email-body" style="padding:28px 30px">
          <p style="margin:0 0 22px;color:#51483f;font-size:15px;line-height:1.7">${escapeHtml(intro)}</p>

          <table class="detail-table" role="presentation" style="width:calc(100% + 16px);margin-left:-8px;table-layout:fixed;border:1px solid #f1e8dc;border-radius:10px;border-spacing:0;overflow:hidden">
            <tbody>${rows}</tbody>
          </table>

          <p style="margin:24px 0 0;color:#51483f;font-size:14px;line-height:1.7">We look forward to welcoming you and serving you soon.</p>
        </div>

        <div class="email-footer" style="padding:18px 30px;background:#fbf8f3;border-top:1px solid #eee3d5;text-align:center;color:#766b60;font-size:12px;line-height:1.6">
          Thank you for choosing <strong style="color:#7f1d1d">Royal Rajasthan</strong>.<br />
          A taste of Rajasthan, served with warmth.
          ${websiteUrl ? `<p style="margin:12px 0 0">Ready for another royal experience? <a href="${escapeHtml(websiteUrl)}" style="color:#7f1d1d;font-weight:700;text-decoration:underline">Visit Royal Rajasthan</a></p>` : ""}
        </div>
      </div>
    </div>`;

  return { subject: cleanSubject, text, html };
}
