/**
 * Принимает ответы RSVP-формы (POST JSON) и дописывает строку в Google Sheet.
 * Установка — см. README.md в корне проекта.
 */

var SHEET_NAME = 'RSVP';

var COLUMNS = [
  'Дата отправки',
  'ФИО',
  'Телефон',
  'Соцсети',
  'Присутствие',
  'Количество гостей',
  'Трансфер туда',
  'Трансфер обратно',
  'Коттедж',
  'Алкоголь',
  'Еда',
  'Пожелание'
];

function getSheet_(){
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);
  if(!sheet){
    sheet = ss.insertSheet(SHEET_NAME);
  }
  if(sheet.getLastRow() === 0){
    sheet.appendRow(COLUMNS);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e){
  try{
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();

    var alcohol = data['Алкоголь'];
    if(Array.isArray(alcohol)) alcohol = alcohol.join(', ');

    sheet.appendRow([
      new Date(),
      data['ФИО'] || '',
      data['Телефон'] || '',
      data['Соцсети'] || '',
      data['Присутствие'] || '',
      data['Количество гостей'] || '',
      data['Трансфер туда'] || '',
      data['Трансфер обратно'] || '',
      data['Коттедж'] || '',
      alcohol || '',
      data['Еда'] || '',
      data['Пожелание'] || ''
    ]);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  }catch(err){
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(){
  return ContentService.createTextOutput('RSVP endpoint is alive.');
}
