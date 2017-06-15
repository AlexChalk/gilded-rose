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
  });

  describe('aged brie', function() {
    it('improves by 1 while sellIn begins day as > 0', function() {
      const item = new Item('Aged Brie', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(11);
    });
    it('improves by 2 when sellIn begins day as <= 0', function() {
      const item = new Item('Aged Brie', 1, 10);
      const gildedRose = new Shop([ item ]);
      gildedRose.updateQuality();
      expect(item.quality).toEqual(12);
    });
  });

});
