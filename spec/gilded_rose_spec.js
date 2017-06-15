describe('Gilded Rose', function() {

  describe('default item', function() {
    it('sellIn drops by 1 at each update', function() {
      const gildedRose = new Shop([ new Item('chocolate', 1, 10) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].sellIn).toEqual(0);
    });
    it('degrades by 1 while sellIn begins day as > 0', function() {
      const gildedRose = new Shop([ new Item('chocolate', 1, 10) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(9);
    });
    it('degrades by 2 when sellIn begins day as <= 0', function() {
      const gildedRose = new Shop([ new Item('chocolate', 0, 10) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(8);
    });
  });

  describe('aged brie', function() {
    it('improves by 1 while sellIn begins day as > 0', function() {
      const gildedRose = new Shop([ new Item('Aged Brie', 1, 10) ]);
      const items = gildedRose.updateQuality();
      console.log(items[0].sellIn);
      expect(items[0].quality).toEqual(11);
    });
    it('improves by 2 when sellIn begins day as <= 0', function() {
      const gildedRose = new Shop([ new Item('Aged Brie', 0, 10) ]);
      const items = gildedRose.updateQuality();
      expect(items[0].quality).toEqual(12);
    });
  });

});
