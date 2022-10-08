const PDFDocument = require("pdfkit");
const fs = require("fs");

let payslipService = {};

payslipService.generatePDF = async (user, month) => {
  const pdfBuffer = await new Promise((resolve) => {
    const doc = new PDFDocument({
      size: "LETTER",
      bufferPages: true,
    });

    //customize later
    doc.text("Name:" + user.name, 100, 50);
    doc.text("Age:" + user.age, 100, 100);
    doc.text("email:" + user.email, 100, 150);
    doc.text("Month:" + month, 100, 200);
    doc.end();

    const buffer = [];
    doc.on("data", buffer.push.bind(buffer));
    doc.on("end", () => {
      const data = Buffer.concat(buffer);
      resolve(data);
    });
  });

  return pdfBuffer;
};

payslipService.generateBulk = async (users, month) => {
  const pdfArr = [];
  Promise.all(
    users.map(async (user) => {
      let p = new PDFDocument();
      p.pipe(fs.createWriteStream(`${user.name}.pdf`));
      p.fontSize(25).text(`Hello ${user.name}`, 100, 100);
      p.end();

      const pdfBuffer = await new Promise((resolve) => {
        const doc = new PDFDocument({
          size: "LETTER",
          bufferPages: true,
        });
        doc.pipe(fs.createWriteStream(`${user.name}.pdf`));
        //customize later
        doc.text("Name:" + user.name, 100, 50);
        doc.text("Age:" + user.age, 100, 100);
        doc.text("email:" + user.email, 100, 150);
        doc.text("Month:" + month, 100, 200);
        doc.end();

        const buffer = [];
        doc.on("data", buffer.push.bind(buffer));
        doc.on("end", () => {
          const data = Buffer.concat(buffer);
          resolve(data);
        });
      });

      pdfArr.push(pdfBuffer);
    })
  );
  return pdfArr;
};

module.exports = payslipService;
