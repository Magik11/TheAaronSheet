on('change:repeating_inventory', function(){

// all of these operations could likely have been done in a single reduce operation, but
// doing them in multiple operations shows that this is something that can be done.

    TAS.repeating('inventory')
        .attrs('total_weight','total_cost','summary')  //< getting the attributes for the totals
        .fields('item','quantity','weight','totalweight','cost','runningtotal') //< specifying the fields we care about
        .tap(function(rows,attrs){
			attrs.summary=_.pluck(_.values(rows),'item').join(', ');  //< grabing all the names of items and setting summary
        })
		.each(function(r){
			r.D[3].totalweight=(r.I.quantity*r.F.weight);  //< for each row, set the total weight with 3 decimal places (use integer quantity and floating weight)
		})
		.map(function(r){
			return r.F.weight*r.I.quantity; //< calculate the weight for the row (could have used the totalweight)
		},function(m,r,a){
            a.D[3].total_weight=_.reduce(m,function(m,v){ //<sum the array of total weights and set it on the total weight attribute
				return m+v;
			},0);
		})
		.reduce(function(m,r){
			m+=(r.I.quantity*r.F.cost); //< Generate a running cost
			r.D[2].runningtotal=m; //< set it for the current row (the running part)
			return m;
		},0,function(m,r,a){
			a.D[2].total_cost=m;  //< take the final sum and set it on the total cost attribute
		})
        .execute();  //< begin executing the above operations

});
