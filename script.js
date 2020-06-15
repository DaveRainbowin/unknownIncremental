var gameData = {
  prevPlay: false,
  saveAs: function(data, loc) {
    localStorage.setItem(loc, JSON.stringify(data));
  },
  loadAs: function(data, loc) {
    window[data] = JSON.parse(localStorage.getItem(loc));
  },
  save: function() {
    console.log("15 second auto-save");
    gameData.saveAs(mainNum, 'mainNum');
    gameData.saveAs(upgLvl, 'upgLvl');
    gameData.saveAs(upgPrice, 'upgPrice');
    gameData.saveAs(nps, 'nps');
    gameData.saveAs(npsUpg, 'npsUpg');
    gameData.saveAs(gameData.prevPlay, 'prevPlay');
  },
  load: function() {
    if (gameData.prevPlay) {
      gameData.loadAs('mainNum', 'mainNum');
      gameData.loadAs('upgLvl', 'upgLvl');
      gameData.loadAs('upgPrice', 'upgPrice');
      gameData.loadAs('nps', 'nps');
      gameData.loadAs('npsUpg', 'npsUpg');
    }
  }
}
var mainNum = 10;
var upgLvl = 0;
var upgPrice = 10;
var npsUpg = 1;
var nps = 0;
setInterval(update, 100);
setInterval(updateSec, 1000);
function get(id) {
  return document.getElementById(id);
}
function update() {
  get("mainNum").innerHTML = `${mainNum}`;
  get("price").innerHTML = `Price: ${upgPrice}`
}
function updateSec() {
  mainNum += nps;
}
function upgrade() {
  if (upgPrice <= mainNum) {
    let temp = mainNum;
    mainNum -= upgPrice;
    upgLvl++;
    upgPrice = Math.floor(upgPrice ** 1.1);
    npsUpg = npsUpg ** 1.01;
    nps += Math.round(npsUpg);
    upgrade();
  }
}
/* function init() {
  gameData.loadAs('gameData.prevPlay', 'prevPlay');
  gameData.prevPlay = true;
  window['autoSave'] = setInterval(gameData.save, 15000);
}
init(); */