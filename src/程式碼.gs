function doGet(request) {
  let template = HtmlService.createTemplateFromFile('index');
  Logger.log(JSON.stringify(getSheetValues('1113-1117')));
  return template.evaluate();
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function getSheetValues(tableName) {
  let spreadsheet = SpreadsheetApp.openByUrl('https://docs.google.com/spreadsheets/d/1KsSh-jMRwWYQM2WQMJS2lWn6uA5AYNALydndzqyLJVE/edit');
  let sheet = spreadsheet.getSheetByName(tableName);
  let values = sheet.getDataRange().getValues();
  return values;
}