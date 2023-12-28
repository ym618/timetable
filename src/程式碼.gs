function doGet(request) {
  let template = HtmlService.createTemplateFromFile('index');
  template.groups = getGroupsValues();
  template.sheets = JSON.stringify(getSheets());
  return template.evaluate().setTitle('阿凌的課表').setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSpreadsheet() {
  return SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1KsSh-jMRwWYQM2WQMJS2lWn6uA5AYNALydndzqyLJVE/edit');
}

function getGroupsSpreadsheet() {
  return SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/12Oj58fpRR4ROyVHOraRok96QwnAOK7oSYgwsFYxBX9I/edit');
}

function getSheets() {
  let result = [];
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    let name = sheet.getName();
      result.push(name);
  });
  return result;
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function getTimetableValues() {
  return getSheetDataValues('timetable');
}

function getSheetDataValues(tableName) {
  let sheet = getSpreadsheet().getSheetByName(tableName);
  return JSON.stringify(sheet.getDataRange().getValues());
}

function getCurrentSheetDataValues() {
  let result = null;
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    let name = sheet.getName();
    if (name.includes('#')) {
      return result = sheet.getDataRange().getValues();
    }
  });
  return JSON.stringify(result);
}

function setTimetableValue(x, y, value) {
  setSheetValue('timetable', x, y, value);
}

function setSheetValue(tableName, x, y, value) {
  let sheet = getSpreadsheet().getSheetByName(tableName);
  sheet.getRange(x, y).setValue(value);
}

function setCurrentSheetValue(x, y, value) {
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    let name = sheet.getName();
    if (name.includes('#')) {
      sheet.getRange(x, y).setValue(value);
    }
  });
}

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

function getGroupsValues() {
  let sheet = getGroupsSpreadsheet().getSheetByName('個案分級');
  return JSON.stringify(sheet.getDataRange().getValues());
}


