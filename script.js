var listofstuff = ['mainNum', 'upgLvl', 'upgPrice', 'upg2Lvl', 'upg2Price','upg3Lvl', 'upg3Price', 'unlockedPerks', 'nps', 'npsUpg', 'visitedBefore', 'tickSpeed', 'c', 'time', 'speedTokens'];
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
var pUpg1 = false;
var cGain = 0;
var c = 0;
var unlockedPerks = false;
var visitedBefore = false;
var speedTokens = 0;
var speedOn = false;
var time = Math.round((new Date()).getTime() / 1000);
setInterval(update, 100);
var tickKeeper = setInterval(updateSec, 1000);
function get(id) {
  return document.getElementById(id);
}
function update() {
  calcPrestige();
  get("mainNum").innerHTML = `${mainNum} n`;
  get("price").innerHTML = `Price: ${upgPrice} n`;
  get("price2").innerHTML = `Price: ${upg2Price} n`;
  get("price3").innerHTML = `Price: ${upg3Price} n`;
  get("upgInfo").innerHTML = `Increases nps by ${Math.round(npsUpg)}`;
  get("tickSpeed").innerHTML = `${tickSpeed}ms tickspeed`;
  get("nps").innerHTML = `${nps} nps`;
  get("prestigeButton").innerHTML = `Prestige for ${cGain} Crystals`;
  get("pp").innerHTML = `${c} C`;
  get("ppBoost").innerHTML = `Boosting production by ^${Math.round((c ** 0.1) * 100) / 100}`;
}
function updateSec() {
  get("st").innerHTML = `${speedTokens} speed tokens <button onclick="speed(true)" id="speedButton">Activate</button>`;
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
    get("unlockPerks").style.display = "none";
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
  get("pp").style.display = "flex";
  get("ppBoost").style.display = "flex";
  c += Math.floor(cGain * 10) / 10;
  npsUpg *= (c ** 0.1);
}
function calcPrestige() {
  if (mainNum >= 10000) {
    cGain = Math.floor((mainNum ** 0.1) * 10) / 10;
  } else {
    cGain = 0;
  }
}
function pUpg() {
  if (c >= 5 && !pUpg1) {
    setInterval(maxAll, 5000);
  }
}
function maxAll() {
  while (mainNum >= upg3Price) {
    upgrade3();
  }
  while (mainNum >= upg2Price) {
    upgrade2();
  }
  while (mainNum >= upgPrice) {
    upgrade();
  }
}
function speed(pressed) {
  if (pressed) {
    speedOn = true;
    setTimeout(speed, 1000, false);
    clearInterval(tickKeeper);
    tickKeeper = setInterval(updateSec, 50);
  } else if (!pressed) {
    if (speedTokens >= 1) {
      speedTokens--;
      setTimeout(speed, 1000, false);
    } else if (speedTokens == 0) {
      speedOn = false;
      clearInterval(tickKeeper);
      tickKeeper = setInterval(updateSec, tickSpeed);
    }
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
var saveload = {
  save: function() {
    listofstuff.forEach(x => localStorage.setItem(x, JSON.stringify(window[x])));
  },
  load: function() {
    visitedBefore = JSON.parse(localStorage.getItem('visitedBefore'));
    if (visitedBefore == null || visitedBefore == undefined) {
      visitedBefore = false;
    }
    if (visitedBefore) {
      listofstuff.forEach(x => window[x] = JSON.parse(localStorage.getItem(x)));
    }
  },
  init: function() {
    setTimeout(saveload.activateAutosave, 5000);
    saveload.load();
    if (!visitedBefore) {
      visitedBefore = true;
      saveload.save();
    }
    if (unlockedPerks) {
      get("perkMenuB").style.display = "flex";
      get("pp").style.display = "flex";
      get("ppBoost").style.display = "flex";
      get("unlockPerks").style.display = "none";
    }
    clearInterval(tickKeeper);
    tickKeeper = setInterval(updateSec, tickSpeed);
    let timeTemp = Math.round((new Date()).getTime() / 1000);
    mainNum += Math.round(((timeTemp - time) / (tickSpeed / 1000)) * nps);
    speedTokens += Math.round((timeTemp - time) * (1 / 60));
    get("st").innerHTML = `${speedTokens} speed tokens <button onclick="speed(true)" id="speedButton">Activate</button>`;
  },
  activateAutosave: function() {
    setInterval(saveload.save, 5000);
  },
  wipeSave: function() {
    let listofdefault = [10, 0, 10, 0, 1000, 0, 2500, false, 0, 1.25, false, 1000, 0, 0, 0];
    for (i = 0; i <= listofdefault.length; i++) {
      window[listofstuff[i]] = listofdefault[i];
    }
  }
};
setTimeout(saveload.init, 1000);