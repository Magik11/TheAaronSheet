on('change:repeating_inventory', function(){
    TAS.repeatingSimpleSum('inventory','weight','total_weight');
});
