
on('change:repeating_inventory', function(){

    TAS.repeating('inventory')
        .attrs('total_weight','total_cost','summary')  
        .fields('item','quantity','weight','totalweight','cost','runningtotal') 
        .reduce(function(m,r){
            m.weight+=(r.F.weight*r.I.quantity);
            r.D[3].totalweight=(r.F.weight*r.I.quantity);
            m.cost+=(r.F.cost*r.I.quantity);
            r.D[2].runningtotal=m.cost;
            m.desc.push(r.item+(r.I.quantity>1 ? ' (x'+r.S.quantity+')' : ''));
            return m;
            
        },{weight:0,cost:0, desc: []},function(m,r,a){
            a.summary=m.desc.join(', ');
            a.D[3].total_weight=m.weight;
            a.D[2].total_cost=m.cost;
        })
        .execute(); 

});

