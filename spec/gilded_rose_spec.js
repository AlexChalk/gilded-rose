describe('Gilded Rose', function() {

  describe('default item', function() {
    it('sellIn drops by 1 at each update', function() {
      const item = new Item('chocolate', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.sellIn).toEqual(0);
    });
    it('degrades by 1 while sellIn begins day as > 0', function() {
      const item = new Item('chocolate', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(9);
    });
    it('degrades by 2 when sellIn begins day as <= 0', function() {
      const item = new Item('chocolate', 0, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(8);
    });
    it('the quality of an item is never negative', function() {
      const item = new Item('chocolate', 1, 0);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(0);
    });
    it('the quality of an item is never more than 50', function() {
      expect(function(){ new Item('chocolate', 1, 60); }).toThrow(/quality of an item cannot exceed 50/);
    });
  });

  describe('aged brie', function() {
    it('improves by 1 while sellIn begins day as > 0', function() {
      const item = new Item('Aged Brie', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(11);
    });
    it('improves by 2 when sellIn begins day as <= 0', function() {
      const item = new Item('Aged Brie', 0, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(12);
    });
  });
  describe('Sulfuras, Hand of Ragnaros', function() {
    it('sellIn is unchanged by updateQuality', function() {
      const item = new Item('Sulfuras, Hand of Ragnaros', 10, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.sellIn).toEqual(10);
    });
    it('quality is unchanged by updateQuality', function() {
      const item = new Item('Sulfuras, Hand of Ragnaros', 10, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(10);
    });
  });
  describe('Backstage passes to a TAFKAL80ETC concert', function() {
    it('quality increases by 1 when sellin >10', function() {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 15, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(11);
    });
    it('quality increases by 2 when sellin === 6-10', function() {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(12);
    });
    it('quality increases by 3 when sellin === 0-5', function() {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(13);
    });
    it('quality drops to 0 sellin < 0', function() {
      const item = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(0);
    });
  });
  describe('Conjured items', function() {
    it('degrades by 2 while sellIn begins day as > 0', function() {
      const item = new Item('Conjured Chocolate', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(8);
    });
    it('degrades by 4 when sellIn begins day as <= 0', function() {
      const item = new Item('Conjured Chocolate', 0, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(6);
    });
  });

});
