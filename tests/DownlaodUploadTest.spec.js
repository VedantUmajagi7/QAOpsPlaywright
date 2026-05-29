const ExcelJs = require('exceljs');
const { test, expect } = require('@playwright/test');

async function writeExcelTest(searchText,replaceText,change,filePath) {
   
    const workbook = new ExcelJs.Workbook();
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText);

    const cell = worksheet.getCell(output.row, output.column+change.columnChange);
    cell.value = replaceText;
    await workbook.xlsx.writeFile(filePath);

}

async function readExcel(worksheet,searchText) {
    let output = { row: -1, column: -1 };
    worksheet.eachRow((row, rowNumber) => {
        row.eachCell((cell, colNumber) => {
            if (cell.value === searchText) {
                output.row = rowNumber;
                output.column = colNumber;
            }

        })

    })
    return output;
}

//writeExcelTest("Mango",350,{rowChange:0,columnChange:2},"/Users/Admin/Downloads/downloadTest.xlsx");
test('Upload download excel validation', async function({page})
{
    const textSearch = 'Mango';
    const updateValue = '550';
   await page.goto("https://rahulshettyacademy.com/upload-download-test/");
    //await page.locator("#downloadButton").click();
   const downloadPromise = page.waitForEvent('download');
   await page.locator("text=Download").click();
   const download = await downloadPromise;
   const filePath = 'C:/Users/Admin/Downloads/download.xlsx';
   await download.saveAs(filePath);
   await writeExcelTest(textSearch,updateValue,{ rowChange: 0, columnChange: 2 },filePath);
   await page.locator("#fileinput").setInputFiles(filePath);
   const textLocator =  page.getByText(textSearch);
   const desireRow = await page.getByRole('row').filter({has: textLocator });
   await expect(desireRow.locator("#cell-4-undefined")).toContainText(updateValue);

   await page.pause();
});