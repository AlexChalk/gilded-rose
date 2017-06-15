class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

var adjustSellIn = function(item) {
  if (item.name.includes('Sulfuras') === false) {
    item.sellIn -= 1;
  }
};

var universalRules = {
  fiftyMaxQuality: function(item) {
    if (item.quality > 50) {
      item.quality = 50;
    }
  },
  zeroMinQuality: function(item) {
    if (item.quality < 0) {
      item.quality = 0;
    }
  }
};

var rules = {
  conjured: {
    condition: function(item) {
      return item.name.includes('Conjured');
    },
    preSellByAction: function(item) {
      item.quality -= 2;
    },
    postSellByAction: function(item) {
      item.quality -= 4;
    },
  },

  agedBrie: {
    condition: function(item) {
      return item.name === 'Aged Brie';
    },
    preSellByAction: function(item) {
      item.quality += 1;
    },
    postSellByAction: function(item) {
      item.quality += 2;
    },
  },

  sulfuras: {
    condition: function(item) {
      return item.name.includes('Sulfuras');
    },
    preSellByAction: function() {
      return;
    },
    postSellByAction: function() {
      return;
    },
  },

  backstagePass: {
    condition: function(item) {
      return item.name.includes('Backstage pass');
    },
    preSellByAction: function(item) {
      if (item.sellIn >= 10) {
        item.quality += 1;
      } else if (item.sellIn >= 5) {
        item.quality += 2;
      } else if (item.sellIn >= 0) {
        item.quality += 3;
      }
    },
    postSellByAction: function(item) {
      item.quality = 0;
    },
  },

  default: {
    condition: function(item) {
      return Object.keys(rules).slice(0,-1).every(function(key) {
        return rules[key]['condition'](item) === false;
      });
    },
    preSellByAction: function(item) {
      item.quality -= 1;
    },
    postSellByAction: function(item) {
      item.quality -= 2;
    },
  }
};

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    this.items.forEach(function(item) {
      adjustSellIn(item);
      Object.keys(rules).forEach(function(rule) {
        if (rules[rule]['condition'](item)) {
          if (item.sellIn < 0) {
            rules[rule]['postSellByAction'](item);
          } else {
            rules[rule]['preSellByAction'](item);
          }
        }
      });
      Object.keys(universalRules).forEach(function(uR) {
        universalRules[uR](item);
      });
    });
    return this.items;
  }
}
