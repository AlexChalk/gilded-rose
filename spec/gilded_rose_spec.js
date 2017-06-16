describe('Gilded Rose', function() {

  var chocolate1_10; var chocolate0_10; var chocolate1_0; var agedBrie1_10; var agedBrie0_10; var agedBrie15_50; var sulfuras10_10; var backstagePasses11_10; var backstagePasses11_50; var backstagePasses6_10; var backstagePasses1_10; var backstagePasses0_10; var conjuredChocolate1_10; var conjuredChocolate0_10; var gildedRose;

  beforeEach(function() {
    chocolate1_10 = new Item('chocolate', 1, 10);
    chocolate0_10 = new Item('chocolate', 0, 10);
    chocolate1_0 = new Item('chocolate', 1, 0);
    agedBrie1_10 = new Item('Aged Brie', 1, 10);
    agedBrie0_10 = new Item('Aged Brie', 0, 10);
    agedBrie15_50 = new Item('Aged Brie', 15, 50);
    sulfuras10_10 = new Item('Sulfuras, Hand of Ragnaros', 10, 10);
    backstagePasses11_10 = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 10);
    backstagePasses11_50 = new Item('Backstage passes to a TAFKAL80ETC concert', 11, 50);
    backstagePasses6_10 = new Item('Backstage passes to a TAFKAL80ETC concert', 6, 10);
    backstagePasses1_10 = new Item('Backstage passes to a TAFKAL80ETC concert', 1, 10);
    backstagePasses0_10 = new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10);
    conjuredChocolate1_10 = new Item('Conjured Chocolate', 1, 10);
    conjuredChocolate0_10 = new Item('Conjured Chocolate', 0, 10);
    gildedRose = shop([ chocolate1_10, chocolate0_10, chocolate1_0, agedBrie1_10, agedBrie0_10, agedBrie15_50, sulfuras10_10, backstagePasses11_10, backstagePasses11_50, backstagePasses6_10, backstagePasses1_10, backstagePasses0_10, conjuredChocolate1_10, conjuredChocolate0_10 ]);
    gildedRose.updateQuality();
  });

  describe('default item', function() {

    it('sellIn drops by 1 at each update', function() {
      expect(chocolate1_10.sellIn).toEqual(0);
    });
    it('degrades by 1 while sellIn begins day as > 0', function() {
      expect(chocolate1_10.quality).toEqual(9);
    });
    it('degrades by 2 when sellIn begins day as <= 0', function() {
      expect(chocolate0_10.quality).toEqual(8);
    });
    it('the quality of an item is never negative', function() {
      expect(chocolate1_0.quality).toEqual(0);
    });
  });

  describe('aged brie', function() {
    it('improves by 1 while sellIn begins day as > 0', function() {
      expect(agedBrie1_10.quality).toEqual(11);
    });
    it('improves by 2 when sellIn begins day as <= 0', function() {
      expect(agedBrie0_10.quality).toEqual(12);
    });
    it('quality never exceeds 50', function() {
      expect(agedBrie15_50.quality).toEqual(50);
    });
  });

  describe('Sulfuras, Hand of Ragnaros', function() {
    it('sellIn is unchanged by updateQuality', function() {
      expect(sulfuras10_10.sellIn).toEqual(10);
    });
    it('quality is unchanged by updateQuality', function() {
      expect(sulfuras10_10.quality).toEqual(10);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert', function() {
    it('quality increases by 1 when sellin starts day >10', function() {
      expect(backstagePasses11_10.quality).toEqual(11);
    });
    it('quality never exceeds 50', function() {
      expect(backstagePasses11_50.quality).toEqual(50);
    });
    it('quality increases by 2 when sellin starts day === 6-10', function() {
      expect(backstagePasses6_10.quality).toEqual(12);
    });
    it('quality increases by 3 when sellin starts day === 1-5', function() {
      expect(backstagePasses1_10.quality).toEqual(13);
    });
    it('quality drops to 0 when sellin < 0', function() {
      expect(backstagePasses0_10.quality).toEqual(0);
    });
  });

  describe('Conjured items', function() {
    it('degrades by 2 while sellIn begins day as > 0', function() {
      expect(conjuredChocolate1_10.quality).toEqual(8);
    });
    it('degrades by 4 when sellIn begins day as <= 0', function() {
      expect(conjuredChocolate0_10.quality).toEqual(6);
    });
  });

});
