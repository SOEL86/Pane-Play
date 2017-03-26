//Cross Beams (tm)

//depends on desktop resolution
var closewindowScale = 80;
var handleScale = 80;
var offset = handleScale/2;
//cleaner code - html element ids
var c_h = "#close_horizontal";
var f_h = "#far_horizontal";
var c_v = "#close_vertical";
var f_v = "#far_vertical";
var a_c = "#AVERAGE_CENTRE";
var con = "#constrainer";
var win1 = "#win1";
var win2 = "#win2";
var win3 = "#win3";
var win4 = "#win4";
var WindowNumber = 4;
//delay for recalculating positions
var delay=20;
//when HTML has finished loading...
$(document).ready(function()
{
	go();
	//window.setInterval(function()
	//{
  	//	console.log("reposition");
  	//	AVERAGE_CENTRE();
  	//	WINDOWS();
  	//	REPOSITION_ALL();
	//}, 1000);
});
//on window resize...
$(window).resize(function()
{
	x = getWindowWidth();
	y = getWindowheight();
	handles(x/2,y/2);
});
//build website...
function go()
{
	x = getWindowWidth();
	y = getWindowheight();
	//make Top-Left, Top-Right Window Boundary
	$(c_h).draggable(
	{ 
		containment: "#constrainer", 
		scroll: false,
		axis: "x",
  		start: function() 
  		{
  			$(c_v).draggable('disable');
  			$(f_v).draggable('disable');
  			AVERAGE_CENTRE();
  		},
  		drag: function() 
  		{
  			AVERAGE_CENTRE();
  			WINDOWS();
  			CLOSEREADY(win1);
	  		CLOSEREADY(win2);
	  		CLOSEREADY(win3);
			CLOSEREADY(win4);
  		},
  		stop: function() 
  		{
  			if ($(c_h).offset().left <= $(f_h).offset().left+(x/20) && $(c_h).offset().left >= $(f_h).offset().left-(x/20))
  			{
  				$(c_h)
  					.css("left",$(f_h).offset().left)
  					.width(handleScale)
  					.height($(c_v).offset().top+offset);
 				$(c_v)
 					.width($(c_h)
 					.offset().left+offset);
 				$(f_v)
 					.width(x-$(c_v).width())
 					.css("left", $(c_h).offset().left+offset);
  				AVERAGE_CENTRE();
  				WINDOWS();
  				$(c_v).draggable('enable');
  				$(f_v).draggable('enable');
  			}
  		}
	});
	$(f_h).draggable(
	{
		axis: "x",
		containment: "#constrainer", 
		scroll: false,
  		start: function() 
  		{
  			$(c_v).draggable('disable');
  			$(f_v).draggable('disable');
  			AVERAGE_CENTRE();
  		},
  		drag: function() 
  		{
  			AVERAGE_CENTRE();
  			WINDOWS();
  			CLOSEREADY(win1);
	  		CLOSEREADY(win2);
	  		CLOSEREADY(win3);
			CLOSEREADY(win4);
  		},
  		stop: function() 
  		{
  			if ($(f_h).offset().left <= $(c_h).offset().left+(x/20) && $(f_h).offset().left >= $(c_h).offset().left-(x/20))
  			{
  				$(f_h).width(handleScale).height(y-$(c_h).height()).css("left",$(c_h).offset().left);
				$(c_v).width($(c_h).offset().left+offset);
  				$(f_v).width(x-$(c_v).width()).css("left", $(c_h).offset().left+offset);
	  			AVERAGE_CENTRE();
  				WINDOWS();
	  			$(c_v).draggable('enable');
  				$(f_v).draggable('enable');
  			}
  		}
	});
	$(c_v).draggable(
	{
		axis: "y",
		containment: "#constrainer", 
		scroll: false,
  		start: function() 
  		{
  			$(c_h).draggable('disable');
  			$(f_h).draggable('disable');
  			AVERAGE_CENTRE();
  			WINDOWS();
  		},
  		drag: function() 
  		{
  			AVERAGE_CENTRE();
  			WINDOWS();
  			CLOSEREADY(win1);
	  		CLOSEREADY(win2);
	  		CLOSEREADY(win3);
			CLOSEREADY(win4);
  		},
  		stop: function() 
  		{
  			if ($(c_v).offset().top <= $(f_v).offset().top+(y/20) && $(c_v).offset().top >= $(f_v).offset().top-(y/20))
  			{
  				$(c_v).height(handleScale).width($(c_h).offset().left+offset).css("top",$(f_v).offset().top);
 				$(c_h).height($(c_v).offset().top+offset);
 				$(f_h).height(y-$(c_h).height()).css("top", $(c_h).height()+offset);
  				AVERAGE_CENTRE();
  				WINDOWS();
  				$(c_h).draggable('enable');
  				$(f_h).draggable('enable');
  			}	
  		}
	});
	$(f_v).draggable(
	{
		axis: "y",
		containment: "#constrainer", 
		scroll: false,
  		start: function() 
  		{
  			$(c_h).draggable('disable');
  			$(f_h).draggable('disable');
  			AVERAGE_CENTRE();
  			WINDOWS();
  		},
  		drag: function() 
  		{
  			AVERAGE_CENTRE();
  			WINDOWS();
  			CLOSEREADY(win1);
	  		CLOSEREADY(win2);
	  		CLOSEREADY(win3);
			CLOSEREADY(win4);
  		},
  		stop: function() 
  		{
  			if ($(f_v).offset().top <= $(c_v).offset().top+(y/20) && $(f_v).offset().top >= $(c_v).offset().top-(y/20))
  			{
  				$(f_v).height(handleScale).width(x-$(c_v).width()).css("top",$(c_v).offset().top);
 				$(c_h).height($(c_v).offset().top+offset);
 				$(f_h).height(y-$(c_h).height()).css("top", $(c_h).height()+offset);
	  			AVERAGE_CENTRE();
  				$(c_h).draggable('enable');
  				$(f_h).draggable('enable');
  			}	
  		}
	});
	$(a_c).draggable(
	{
		containment: "#constrainer", 
		scroll: false,
  		start: function() 
  		{
  		},
  		drag: function() 
  		{
			REPOSITION_ALL();
  			WINDOWS();
  			CLOSEREADY(win1);
	  		CLOSEREADY(win2);
	  		CLOSEREADY(win3);
			CLOSEREADY(win4);
  		},
  		stop: function() 
  		{
  			REPOSITION_ALL();
  			WINDOWS();

  		}
	});
	handles(x/2,y/2);
}
function activate()
{

}
//resize handles...
function handles(width, height)
{
	$(con).width(x-(closewindowScale*2)).height(y-(closewindowScale*2)).css("left", closewindowScale).css("top", closewindowScale);
	$(c_v).draggable('enable');
  	$(f_v).draggable('enable');
	$(c_h).draggable('enable');
	$(f_h).draggable('enable');
	$(c_h).width(handleScale).height(height).css("left",width-offset);
	$(f_h).width(handleScale).height(height).css({left: width-offset, top: height});
	$(c_v).width(width).height(handleScale).css("top",height-offset);
	$(f_v).width(width).height(handleScale).css({top: height-offset, left: width});
	$(a_c).width(handleScale).height(handleScale).css("left",width-offset).css("top",height-offset);
}
//returns window width
function getWindowWidth(){return $(window).width();}
//returns window width
function getWindowheight(){return $(window).height();}
//returns div positions as an array [y,x]
function c_h(){return [$(c_h).offset().top,$(c_h).offset().left];}
function f_h(){return [$(f_h).offset().top,$(f_h).offset().left];}
function c_v(){return [$(c_v).offset().top,$(c_v).offset().left];}
function f_v(){return [$(f_v).offset().top,$(f_v).offset().left];}
function a_c(){return [$(a_c).offset().top,$(a_c).offset().left];}
//*TODO: change average centre depending on no of windows
function AVERAGE_CENTRE()
{
	setTimeout(function() {
		chol = $(c_h).offset().left;
		fhol = $(f_h).offset().left;
		cvot = $(c_v).offset().top;
		fvot = $(f_v).offset().top;
		if (WindowNumber == 4)
		{
			if(chol > fhol){
				$(a_c)
					.width(chol-fhol+offset+offset)
					.css("left",fhol);

			} else {
				$(a_c)
					.width(fhol-chol+offset+offset)
					.css("left",chol);
			}
			if(cvot > fvot){
				$(a_c)
					.height(cvot-fvot+offset+offset)
					.css("top",fvot);

			} else {
				$(a_c)
					.height(fvot-cvot+offset+offset)
					.css("top",cvot);
			}
		}
		else if (WindowNumber == 3)
		{
			$(a_c)
					.width(handleScale)
					.height(handleScale)
					.css("left",chol)
					.css("top",cvot);
		}
	}, delay);
}
//repositions all handles and windows around the average centre
function REPOSITION_ALL()
{
	setTimeout(function() {
		chol = $(c_h).offset().left;
		fhol = $(f_h).offset().left;
		acol = $(a_c).offset().left;
		acot = $(a_c).offset().top;
		cvot = $(c_v).offset().top;
		fvot = $(f_v).offset().top;
		
		if(chol < fhol)
		{
			$(c_h)
				.css("left", acol)
			  	.css("top", 0)
				.height(acot+offset);
			$(f_h)
			  	.css("left", acol+$(a_c).width()-handleScale)
			  	.css("top", acot+offset)
				.height(y-$(c_h).height());
			$(c_v)
				.css("left", 0)
			  	.css("top", acot)
				.width(acol+offset);
			$(f_v)
				.css("left", acol+offset)
			  	.css("top", acot)
				.width(x-$(c_v).width());	
		}   
		else if(chol > fhol)
		{
			$(c_h)
				.css("left", acol+$(a_c).width()-handleScale)
			  	.css("top", 0)
				.height(acot+offset);
			$(f_h)
			  	.css("left", acol)
			  	.css("top", acot+offset)
				.height(y-$(c_h).height());
			$(c_v)
				.css("left", 0)
			  	.css("top", acot)
				.width(acol+offset);
			$(f_v)
				.css("left", acol+offset)
			  	.css("top", acot)
				.width(x-$(c_v).width());	
		}   			
		else if(cvot > fvot)
		{
			$(c_h)
				.css("left", acol)
			  	.css("top", 0)
				.height(acot+offset);
			$(f_h)
			  	.css("left", acol)
			  	.css("top", acot+offset)
				.height(y-$(c_h).height());
			$(c_v)
				.css("left", 0)
			  	.css("top", acot+$(a_c).height()-handleScale)
				.width(acol+offset);
			$(f_v)
				.css("left", acol+offset)
			  	.css("top", acot)
				.width(x-$(c_v).width());	
		}   			
		else if(cvot < fvot)
		{
			$(c_h)
				.css("left", acol)
			  	.css("top", 0)
				.height(acot+offset);
			$(f_h)
			  	.css("left", acol)
			  	.css("top", acot+offset)
				.height(y-$(c_h).height());
			$(c_v)
				.css("left", 0)
			  	.css("top", acot)
				.width(acol+offset);
			$(f_v)
				.css("left", acol+offset)
			  	.css("top", acot+$(a_c).height()-handleScale)
				.width(x-$(c_v).width());	
		}  
		else 
		{ 
			//reposition all window boundaries
			$(c_h)
				.css("left", acol)
			  	.css("top", 0)
				.height(acot+offset)
			;
			$(f_h)
			  	.css("left", acol)
			  	.css("top", acot+offset)
				.height(y-$(c_h).height())
			;
			$(c_v)
				.css("left", 0)
			  	.css("top", acot)
				.width(acol+offset)
			;
			$(f_v)
				.css("left", acol+offset)
			  	.css("top", acot)
				.width(x-$(c_v).width())
			;
		}
	}, delay);
}
function WINDOWS()
{
	setTimeout(function() {
		chol = $(c_h).offset().left;
		fvot = $(f_v).offset().top;
		$(win1)
			.width(chol)
			.height(cvot)
		;
		$(win2)
			.width(x-chol-handleScale)
			.height(fvot)
			.css("left", chol+handleScale)
		;
		$(win3)
			.width(fhol)
			.height(y-cvot-handleScale)
			.css("top", cvot+handleScale)
		;
		$(win4)
			.width(x-fhol-handleScale)
			.height(y-fvot-handleScale)
			.css("top", fvot+handleScale)
			.css("left", fhol+handleScale)
		;
	}, delay);

}
function CLOSEREADY(objname)
{
	$(objname).off();
	$(a_c).draggable( 'enable' );
	if ($(objname).height() == closewindowScale || $(objname).width() == closewindowScale)
	{
		$(objname).css("background-color", "red");
		$(objname).click(function()
		{
			WindowNumber =- 1;
			console.log("here");
			if (objname == win1)
			{
				console.log("here2");
				$(c_h).css("left", 0);
				$(a_c).draggable( 'disable' );
				AVERAGE_CENTRE();
				REPOSITION_ALL();
				WINDOWS();
			}
		});
	}
	if ($(objname).height() > closewindowScale && $(objname).width() > closewindowScale)
	{
		$(objname).css("background-color", "black");
	}
}