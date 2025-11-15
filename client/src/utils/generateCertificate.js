// src/utils/generateCertificate.js
import jsPDF from "jspdf";

/**
 * generateCertificate - creates and downloads a PDF certificate
 * @param {string} userName - learner's name
 * @param {string} courseTitle - course title
 * @param {object} options - optional settings {logoDataUrl, issuerName, certificateId}
 */
export default function generateCertificate(
  userName,
  courseTitle,
  options = {}
) {
  const { logoDataUrl = null, issuerName = "SkillSync", certificateId = null } =
    options;

  // landscape A4
  const doc = new jsPDF({
    unit: "pt",
    format: "a4",
    orientation: "landscape",
  });

  const width = doc.internal.pageSize.getWidth();
  const height = doc.internal.pageSize.getHeight();

  // background (optional border)
  doc.setFillColor(255, 255, 255);
  doc.rect(0, 0, width, height, "F");

  // decorative border
  const pad = 30;
  doc.setDrawColor(70, 130, 180);
  doc.setLineWidth(3);
  doc.rect(pad / 2, pad / 2, width - pad, height - pad);

  // logo (optional)
  if (logoDataUrl) {
    const logoWidth = 80;
    const logoHeight = 80;
    doc.addImage(
      logoDataUrl,
      "PNG",
      width / 2 - logoWidth / 2,
      pad + 5,
      logoWidth,
      logoHeight
    );
  }

  // Title
  doc.setFontSize(34);
  doc.setFont("helvetica", "bold");
  doc.text("Certificate of Completion", width / 2, height * 0.35, {
    align: "center",
  });

  // Subtitle text
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(
    "This is to certify that",
    width / 2,
    height * 0.45,
    { align: "center" }
  );

  // Name
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  doc.text(userName, width / 2, height * 0.52, { align: "center" });

  // Completed line
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  doc.text(
    `has successfully completed the course`,
    width / 2,
    height * 0.58,
    { align: "center" }
  );

  // Course title
  doc.setFontSize(18);
  doc.setFont("helvetica", "bold");
  doc.text(courseTitle, width / 2, height * 0.64, { align: "center" });

  // Issuer and date
  const issuedDate = new Date().toLocaleDateString();
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  doc.text(`Issued by: ${issuerName}`, width * 0.2, height * 0.8);
  doc.text(`Date: ${issuedDate}`, width * 0.8, height * 0.8, {
    align: "right",
  });

  // Certificate ID if provided
  if (certificateId) {
    doc.setFontSize(10);
    doc.text(`Certificate ID: ${certificateId}`, width * 0.5, height * 0.9, {
      align: "center",
    });
  }

  // Save file
  const safeUserName = userName.replace(/[^a-z0-9_\-]/gi, "_");
  const fileName = `${safeUserName}_${courseTitle}_certificate.pdf`;
  doc.save(fileName);
}
