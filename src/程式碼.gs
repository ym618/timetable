function doGet(request) {
  let template = HtmlService.createTemplateFromFile('index');
  template.table = getTimetableValues();
  template.colors = getSheetDataValues('colors');
  template.sheets = JSON.stringify(getSheets());
  return template.evaluate().setTitle('阿凌的課表');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSpreadsheet() {
  return SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1KsSh-jMRwWYQM2WQMJS2lWn6uA5AYNALydndzqyLJVE/edit');
}

function getSheets() {
  let result = [];
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    let name = sheet.getName();
    if (name.includes('-')) {
      result.push(name);
    }
  });
  return result;
}

function getTimetableValues() {
  return getSheetDataValues('timetable');
}

function getSheetDataValues(tableName) {
  let sheet = getSpreadsheet().getSheetByName(tableName);
  return JSON.stringify(sheet.getDataRange().getValues());
}

function setTimetableValue(x, y, value) {
  setSheetValue('timetable', x, y, value);
}

function setSheetValue(tableName, x, y, value) {
  let sheet = getSpreadsheet().getSheetByName(tableName);
  sheet.getRange(x, y).setValue(value);
}
