const fs = require('fs');
const Handlebars = require('handlebars');
const puppeteer = require('puppeteer');

async function generatePDFFromHTML(htmlContent, outputPath) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    const pdfOptions = {
        path: outputPath,
        format: 'A4',
        margin: {
            top: '2cm',
            bottom: '2cm',
            left: '2cm',
            right: '2cm'
        }
    };
    await page.pdf(pdfOptions);
    await browser.close();
    console.log(`PDF generated at: ${outputPath}`);
}

const getCompiledHTMLContentFromTemplatedHTMLContent = (templatedHTMLContent, emailTemplateData) => {
    const template = Handlebars.compile(templatedHTMLContent);
    const html = template(emailTemplateData);
    return html;
};

// Example data
// Data to be passed to the template, will have to replace with whatever way we get the data
const emailTemplateData = {
    date: "23rd Feb",
    place: "India",
    applicationId: 2,
    sanctionedAmount: 500,
    interestRate: 100,
    trancheAmount: 200,
    trancheAmountInWords: "Two Hundred",
    bankName: "ICIC",
    IFSC: 19893,
    accountNo: 1982983,
    borrowerName: "Jayesh",
};

const templatedHTMLContent = fs.readFileSync('template.html', 'utf8');

const compiledHTMLContent = getCompiledHTMLContentFromTemplatedHTMLContent(templatedHTMLContent, emailTemplateData);


console.log("Compiled HTML Content")
console.log(compiledHTMLContent);

const outputPath = 'example.pdf';


generatePDFFromHTML(compiledHTMLContent, outputPath);