import exceljs from 'exceljs'

export const exportData = (data) => {
    let workbook = new exceljs.Workbook();
    let worksheet = workbook.addWorksheet("Worksheet");

    if (data.length == 0) {
        return null
    }
    const columns = Object.keys(data[0])

    worksheet.columns = columns.map((el) => { 
        return { header: el, key: el, width: 20 }
    });

    worksheet.addRows(data);

    return workbook;
  };
