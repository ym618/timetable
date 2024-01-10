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
    if (sheet.getName().startsWith('#')) {
      // return for break
      return result = sheet.getDataRange().getValues();
    }
  });
  return JSON.stringify(result);
}

function setCurrentSheetValue(x, y, value) {
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    if (sheet.getName().startsWith('#')) {
      sheet.getRange(x, y).setValue(value);
    }
  });
}

function getLevels() {
  let sheet = getSpreadsheet().getSheetByName('個案分級');
  return JSON.stringify(sheet.getDataRange().getValues());
}

function setLevel(id, level) {
  let sheet = getSpreadsheet().getSheetByName('個案分級');
  let values = sheet.getDataRange().getValues();
  values.forEach(function (row, index) {
    if (row[1] === id) {
      sheet.getRange(index+1, 1).setValue(level);
    }
  });
}

function testSetLevel() {
  setLevel(4766, 'D');
}

let logLock = LockService.getScriptLock();

function getCurrentTime() {
  let date = new Date();
  let yyyy = date.getFullYear();
  let mm = (date.getMonth() + 1).toString().padStart(2, '0');
  let dd = date.getDate().toString().padStart(2, '0');

  let hh = date.getHours().toString().padStart(2, '0');
  let mn = date.getMinutes().toString().padStart(2, '0');
  let ss = date.getSeconds().toString().padStart(2, '0');
  return `${yyyy}/${mm}/${dd} ${hh}:${mn}:${ss}`;
}

function superlog(rowContents) {
  let currentSheet = 'unknown';
  getSpreadsheet().getSheets().forEach(function (sheet, i) {
    let name = sheet.getName();
    if (name.startsWith('#')) {
      return currentSheet = name.substring(1);
    }
  });

  logLock.waitLock(30000); // 30 sec
  try {
    getSpreadsheet().getSheetByName('編輯紀錄').appendRow([`'${getCurrentTime()}`, currentSheet, ...rowContents]);
  } finally {
    logLock.releaseLock();
  }
}

function testSuperlog() {
  superlog(['更新分級', '4766', '李姿蓉', '從 A 修改為 D']);
  superlog(['新增課程', '4766', '李姿蓉', '新增星期四 16:00']);
  superlog(['刪除課程', '4766', '李姿蓉', '刪除星期四 16:00']);
}
