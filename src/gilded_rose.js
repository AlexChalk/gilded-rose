class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

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
  }

};

var defaultBehaviour = {
  condition: function(item) {
    return Object.keys(rules).every(function(key) {
      return rules[key]['condition'](item) === false;
    });
  },
  preSellByAction: function(item) {
    item.quality -= 1;
  },
  postSellByAction: function(item) {
    item.quality -= 2;
  },
};

class Shop {
  constructor(items=[]){
    this.items = items;
    this.rules = rules;
    this.defaultBehaviour = defaultBehaviour;
    this.universalRules = universalRules;
  }

  adjustSellIn(item) {
    if (item.name.includes('Sulfuras') === false) {
      item.sellIn -= 1;
    }
  }

  applyItemSpecificRules(item) {
    var that = this;
    Object.keys(this.rules).forEach(function(rule) {
      if (that.rules[rule]['condition'](item)) {
        if (item.sellIn < 0) {
          that.rules[rule]['postSellByAction'](item);
        } else {
          that.rules[rule]['preSellByAction'](item);
        }
      }
    });
  }

  applyDefaultsToRest(item) {
    if (this.defaultBehaviour['condition'](item)) {
      if (item.sellIn < 0) {
        this.defaultBehaviour['postSellByAction'](item);
      } else {
        this.defaultBehaviour['preSellByAction'](item);
      }
    }
  }

  applyUniversalRules(item) {
    var that = this;
    Object.keys(this.universalRules).forEach(function(uR) {
      that.universalRules[uR](item);
    });
  }

  updateQuality() {
    var that = this;
    this.items.forEach(function(item) {
      that.adjustSellIn(item);
      that.applyItemSpecificRules(item);
      that.applyDefaultsToRest(item);
      that.applyUniversalRules(item);
    });
    return this.items;
  }
}
