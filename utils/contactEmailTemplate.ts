interface Contact {
  name: string;
  phone: string;
  vehicle: string;
  date: string;
  additional?: string;
}

export const emailTemplate = (data: Contact) => {
  const { name, phone, vehicle, date, additional } = data;

  return `
    <div>
      <h2>New Contact Form Submission</h2>
      <p><strong>Name:</strong> ${name || "-"}</p>
      <p><strong>Phone:</strong> ${phone || "-"}</p>
      <p><strong>Vehicle Make & Model:</strong> ${vehicle || "-"}</p>
      <p><strong>Preferred Date:</strong> ${date || "-"}</p>
      ${additional ? `<p><strong>Additional Info:</strong> ${additional}</p>` : ""}
      <hr />
      <p style="font-size: 13px; color: #555;">Email from EHD Detailing Website</p>
    </div>
  `;
};