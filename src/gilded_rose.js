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

var shop = function(itemsStocked) {
  var items = itemsStocked;
  var ruleData = rules;
  var ruleNames = Object.keys(ruleData);
  var universalRuleData = universalRules;
  var universalRuleNames = Object.keys(universalRuleData);
  var defaultBehaviour = {
    condition: function(item) {
      return ruleNames.every(function(key) {
        return ruleData[key]['condition'](item) === false;
      });
    },
    preSellByAction: function(item) {
      item.quality -= 1;
    },
    postSellByAction: function(item) {
      item.quality -= 2;
    },
  };

  return {
    applyItemSpecificRules: function(item) {
      ruleNames.forEach(function(rule) {
        if (ruleData[rule]['condition'](item)) {
          if (item.sellIn < 0) {
            ruleData[rule]['postSellByAction'](item);
          } else {
            ruleData[rule]['preSellByAction'](item);
          }
        }
      });
    },
    applyDefaultsToRest: function(item) {
      if (defaultBehaviour['condition'](item)) {
        if (item.sellIn < 0) {
          defaultBehaviour['postSellByAction'](item);
        } else {
          defaultBehaviour['preSellByAction'](item);
        }
      }
    },
    adjustSellIn: function(item) {
      if (item.name.includes('Sulfuras') === false) {
        item.sellIn -= 1;
      }
    },

    applyUniversalRules: function(item) {
      universalRuleNames.forEach(function(uR) {
        universalRuleData[uR](item);
      });
    },

    updateQuality: function() {
      var that = this;
      items.forEach(function(item) {
        that.adjustSellIn(item);
        that.applyItemSpecificRules(item);
        that.applyDefaultsToRest(item);
        that.applyUniversalRules(item);
      });
      return this.items;
    }
  };
};
