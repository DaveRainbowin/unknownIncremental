var listofstuff = ['mainNum', 'upgLvl', 'upgPrice', 'upg2Lvl', 'upg2Price','upg3Lvl', 'upg3Price', 'unlockedPerks', 'nps', 'npsUpg', 'visitedBefore', 'tickSpeed', 'pp'];
function save() {
  listofstuff.forEach(x => localStorage.setItem(x, JSON.stringify(window[x])));
}
function load() {
  visitedBefore = JSON.parse(localStorage.getItem('visitedBefore'));
  if (visitedBefore == null || visitedBefore == undefined) {
    visitedBefore = false;
  }
  if (visitedBefore) {
    listofstuff.forEach(x => window[x] = JSON.parse(localStorage.getItem(x)));
  }
}
var mainNum = 10;
var upgLvl = 0;
var upgPrice = 10;
var tickSpeed = 1000;
var priceIncrease = 1.1;
var npsUpg = 1.25;
var nps = 0;
var upg2Lvl = 0;
var upg2Price = 1000;
var upg3Lvl = 0;
var upg3Price = 2500;
var ppGain = 0;
var pp = 0;
var unlockedPerks = false;
var visitedBefore = false;
setInterval(update, 100);
var tickKeeper = setInterval(updateSec, 1000);
function get(id) {
  return document.getElementById(id);
}
function update() {
  calcPrestige();
  get("mainNum").innerHTML = `${mainNum}`;
  get("price").innerHTML = `Price: ${upgPrice}`;
  get("price2").innerHTML = `Price: ${upg2Price}`;
  get("price3").innerHTML = `Price: ${upg3Price}`;
  get("upgInfo").innerHTML = `Increases nps by ${Math.round(npsUpg)}`;
  get("tickSpeed").innerHTML = `${tickSpeed}ms tickspeed`;
  get("nps").innerHTML = `${nps} nps`;
  get("prestigeButton").innerHTML = `Prestige for ${ppGain} PP`;
  get("pp").innerHTML = `${pp} PP`;
  get("ppBoost").innerHTML = `Boosting by ^${Math.round((pp ** 0.25) * 100) / 100}`;
}
function updateSec() {
  mainNum += nps;
}
function upgrade() {
  if (upgPrice <= mainNum) {
    mainNum -= upgPrice;
    upgLvl++;
    upgPrice = Math.floor(upgPrice ** priceIncrease);
    npsUpg = npsUpg ** priceIncrease;
    nps += Math.round(npsUpg);
    update();
  }
}
function upgrade2() {
  if (upg2Price <= mainNum) {
    mainNum -= upg2Price;
    upg2Lvl++;
    upg2Price = Math.floor(upg2Price ** 1.1);
    nps = Math.round(1.5 * nps);
    npsUpg *= 1.5;
    update();
  }
}
function upgrade3() {
  if (upg3Price <= mainNum && upg3Lvl < 19) {
    mainNum -= upg3Price;
    upg3Lvl++;
    upg3Price = Math.floor(upg3Price ** priceIncrease);
    tickSpeed -= 50;
    clearInterval(tickKeeper);
    tickKeeper = setInterval(updateSec, tickSpeed);
    update();
  } else if (upg3Lvl == 19) {
    upg3Price = "max";
  }
}
function unlockPerks() {
  if (10000 <= mainNum && !unlockedPerks) {
    mainNum -= 10000;
    unlockedPerks = true;
    update();
    get("perkMenuB").style.display = "block";
  }
}
function prestige() {
  let listofreset = ['mainNum', 'nps', 'upgLvl', 'upgPrice', 'upg2Lvl', 'upg2Price', 'upg3Lvl', 'upg3Price', 'npsUpg', 'tickSpeed'];
  let listofresetTo = [10, 0, 0, 10, 0, 1000, 0, 2500, 1.25, 1000];
  for (i = 0; i <= listofreset.length; i++) {
    window[listofreset[i]] = listofresetTo[i];
  }
  clearInterval(tickKeeper);
  tickKeeper = setInterval(updateSec, tickSpeed);
  pp += ppGain;
  npsUpg *= (pp ** 0.25);
}
function calcPrestige() {
  if (mainNum >= 10000) {
    ppGain = Math.floor((mainNum ** 0.1) * 10) / 10;
  } else {
    ppGain = 0;
  }
}
function optionsMenu(dir) {
  if (dir == 0) {
    get("options").style.display = "block";
  }
  if (dir == 1) {
    get("options").style.display = "none";
  }
}
function openTab(pageName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("menu");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("menuBtn");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }
  get(pageName).style.display = "flex";
}
function init() {
  setTimeout(activateAutosave, 5000);
  load();
  if (!visitedBefore) {
    visitedBefore = true;
    save();
  }
  if (unlockedPerks) {
    get("perkMenuB").style.display = "flex";
    get("pp").style.display = "flex";
    get("ppBoost").style.display = "flex";
  }
  clearInterval(tickKeeper);
  tickKeeper = setInterval(updateSec, tickSpeed);
}
function activateAutosave() {
  setInterval(save, 5000);
}
function wipeSave() {
  let listofdefault = [10, 0, 10, 0, 1000, 0, 2500, false, 0, 1.25, false, 1000, 0];
  for (i = 0; i <= listofdefault.length; i++) {
    window[listofstuff[i]] = listofdefault[i];
  }
}
setTimeout(init, 1000);