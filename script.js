var mainNum = 10;
var upgLvl = 0;
var upgPrice = 10;
var npsUpg = 1;
var nps = 0;
setInterval(update, 100);
setInterval(updateSec, 1000);
setInterval(gameData.save, 15000);
function update() {
  get("mainNum").innerHTML = `${mainNum}`;
}
function updateSec() {
  mainNum += nps;
}
function upgrade() {
  if (upgPrice <= mainNum) {
    mainNum -= upgPrice;
    upgLvl++;
    upgPrice = Math.floor(upgPrice ** 1.1);
    npsUpg = npsUpg ** 1.01;
    nps += Math.round(npsUpg);
    upgrade();
  }
}
var gameData = {
  saveAs: function(data, loc) {
    localStorage.setItem(loc, JSON.stringify(data));
  },
  loadAs: function(data, loc) {
    window[data] = JSON.parse(localStorage.getItem(loc));
  },
  save: function() {
    this.saveAs(mainNum, 'mainNum');
    this.saveAs(upgLvl, 'upgLvl');
    this.saveAs(upgPrice, 'upgPrice');
    this.saveAs(nps, 'nps');
    this.saveAs(npsUpg, 'npsUpg');
    this.saveAs(gameData.prevPlay, 'prevPlay');
  },
  load: function() {
    if (this.prevPlay) {
      this.loadAs('mainNum', 'mainNum');
      this.loadAs('upgLvl', 'upgLvl');
      this.loadAs('upgPrice', 'upgPrice');
      this.loadAs('nps', 'nps');
      this.loadAs('npsUpg', 'npsUpg');
      this.loadAs('gameData.prevPlay', 'prevPlay');
    }
  },
  prevPlay: false
}
function get(id) {
  return document.getElementById(id);
}
gameData.load();