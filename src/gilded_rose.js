class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
var newRule = function(params) {
  var rule = {
    condition: params.condition,
    preSellByAction: params.preSellByAction,
    postSellByAction: params.postSellByAction
  };
  rules.push(rule);
  return rule;
};

var globalRules = {
  fiftyMax: function(item) {
    if (item.value > 50) {
      item.value = 50;
    }
  },
  zeroMin: function(item) {
    if (item.value < 0) {
      item.value = 0;
    }
  }
};

var rules = {
  conjured: {
    condition: function(item) {
      return item.name.includes('Conjured');
    },
    preSellByAction: function(item) {
      item.value -= 2;
    },
    postSellByAction: function(item) {
      item.value -= 4;
    },
  },

  agedBrie: {
    condition: function(item) {
      return item.name === 'Aged Brie';
    },
    preSellByAction: function(item) {
      item.value += 1;
    },
    postSellByAction: function(item) {
      item.value += 2;
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
        item.value += 1;
      } else if (item.sellIn >= 5) {
        item.value += 2;
      } else if (item.sellIn >= 0) {
        item.value += 3;
      }
    },
    postSellByAction: function(item) {
      item.value = 0;
    },
  },

  default: {
    condition: function(item) {
      var keys = Object.keys(rules).slice(0,-1);
      for (var i = 0; i < keys.length; i ++ ) {
        if (rules.keys[i].condition(item)) {
          return false;
        }
      }
      return true;
    },
    preSellByAction: function(item) {
      item.value -= 1;
    },
    postSellByAction: function(item) {
      item.value -= 2;
    },
  }
};

class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        if (this.items[i].quality > 0) {
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            this.items[i].quality = this.items[i].quality - 1;
          }
        }
      } else {
        if (this.items[i].quality < 50) {
          this.items[i].quality = this.items[i].quality + 1;
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].sellIn < 11) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
            if (this.items[i].sellIn < 6) {
              if (this.items[i].quality < 50) {
                this.items[i].quality = this.items[i].quality + 1;
              }
            }
          }
        }
      }
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      if (this.items[i].sellIn < 0) {
        if (this.items[i].name != 'Aged Brie') {
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            if (this.items[i].quality > 0) {
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                this.items[i].quality = this.items[i].quality - 1;
              }
            }
          } else {
            this.items[i].quality = this.items[i].quality - this.items[i].quality;
          }
        } else {
          if (this.items[i].quality < 50) {
            this.items[i].quality = this.items[i].quality + 1;
          }
        }
      }
    }

    return this.items;
  }
}
