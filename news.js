"use strict";
var obj=[];

$(document).ready(function () {
		$.ajax({	
        	url: 'https://freegeoip.net/json/',
        	dataType: 'jsonp',
        	success: function (location){
        		ajaxCall(location.city);   
        		ajaxCall(location.region_name);
        		ajaxCall(location.country_name);	     	
	 		}
    	});
	
    	var ajaxCall=function(country){
    		$.ajax({	
        		url: 'https://ajax.googleapis.com/ajax/services/search/news?v=1.0&q='+country,
        		dataType: 'jsonp',
        		success: function (data){
        			data.responseData.results.filter(function(x){
						obj.push(x);
						console.log(country+"yes");
	 				});
	 				clearMainDiv();
	 				print(obj);
	 			}
    		});
		};

});


var clearMainDiv = function(){
	var divs=$("#maindiv");
	var children = divs.children();
	divs.empty();
};
var print=function(y){
	var divs=$("#maindiv");
	for(var i=0; i < y.length;i++)
	{
		var newdiv = $("<section></section>");
		var sectionIdName = 'my'+i+'Section';
		newdiv.attr('id',sectionIdName);
		newdiv.attr('class','innerDiv');
		//var newdiv = document.createElement('section');
		//newdiv.setAttribute('class','innerDiv');
		//newdiv.innerHTML += y[i];
		
		var newimg = $("<img>");
		if(y[i].image != undefined)
		{
			var img_index = y[i].image.url.indexOf("http");
    		var img_src=y[i].image.url.slice(img_index);
			newimg.attr('src',img_src);
			//newimg.setAttribute('src',img_src);
		}
		else
		{
			newimg.attr('src','images/img_not_found.png');	
			//newimg.setAttribute('src','images/img_not_found.png');	
		}
		newimg.attr('class','image');
		//newimg.setAttribute('class','image');

		
		var newspan = $('<span></span>');
		newspan.attr('class','title');
		//var newspan = document.createElement('span');
		//newspan.setAttribute('class','title');
		
		var newhref = $('<a></a>');
		//var newhref = document.createElement('a');
		newhref.attr('href',y[i].signedRedirectUrl);
		//newhref.setAttribute('href',y[i].signedRedirectUrl);
		
        newhref.html(y[i].title);
		//newhref.innerHTML += y[i].title;
		newspan.append(newhref);
		//newspan.appendChild(newhref);
		
		var newsection_div = $('<div></div>');
		//var newsection_div = document.createElement('div');
		
        newsection_div.attr('class','description');
		//newsection_div.setAttribute('class','description');
		
        newsection_div.html(y[i].content);
		//newsection_div.innerHTML += y[i].content;
		
		newdiv.append(newimg);
		newdiv.append(newspan);
		newdiv.append(newsection_div);
		
		// newdiv.appendChild(newimg);
		// newdiv.appendChild(newspan);
		// newdiv.appendChild(newsection_div);
		
		divs.append(newdiv);
	}
};







