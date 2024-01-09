function doGet(request) {
  let template = HtmlService.createTemplateFromFile('index');
  return template.evaluate().setTitle('阿凌的課表').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSpreadsheet() {
  return SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1KsSh-jMRwWYQM2WQMJS2lWn6uA5AYNALydndzqyLJVE/edit');
}

/*
function getSheets() {
  let result = [];
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    let name = sheet.getName();
    result.push(name);
  });
  return result;
}
*/

function getCurrentSheetDataValues() {
  let result = [];
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    if (sheet.getName().includes('#')) {
      // return for break
      return result = sheet.getDataRange().getValues();
    }
  });
  return JSON.stringify(result);
}

function setCurrentSheetValue(x, y, value) {
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    if (sheet.getName().includes('#')) {
      sheet.getRange(x, y).setValue(value);
    }
  });
}

function getLevels() {
  let sheet = getSpreadsheet().getSheetByName('個案分級');
  return JSON.stringify(sheet.getDataRange().getValues());
}

function setLevel(id, level) {
  let sheet = getSpreadsheet().getSheetByName('個案分級')
  let values = sheet.getDataRange().getValues();
  values.forEach(function (row, index) {
    if (row[1] === id) {
      sheet.getRange(index+1, 1).setValue(level);
    }
  });
}
