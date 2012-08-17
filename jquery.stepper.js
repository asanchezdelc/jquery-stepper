(function( $ ){
  var methods = {
     init : function( options ) {
	
       return this.each(function(){
		 
		 
         var $this = $(this),
             data = $this.data('stepper'),
			 $valEL = $this.find('input.value'),
			 increment = 1,
			current = 0,
			max = 0,
			min = 0,
			autoReset = false,
			source = options.source,
			 up = $this.append('<button type="button" class="btn up-btn"/>'),
			down = $this.append('<button type="button" class="btn down-btn"/>');
			
		$up = $this.find('.up-btn');
		$down = $this.find('.down-btn');
		$up.text('+');
		$down.text('-');
		
						
		//set common variables
		if(typeof options != "undefined")
		{
			//set max param
			if((typeof options.source) == "object")
			{
				max = options.source.length-1;
				min = 0;
				if((typeof options.value) == "number")
				{
					if(options.value >= min && options.value <= max) current = value;
					$valEL.val(options.source[current]);
				}
			}
			
			if((typeof options.max) == "number"){
				max = options.max;
			}
			
			if((typeof options.min) == "number"){
				min = options.min;
			}
			
			//set min param
			if((typeof options.value) == "number")
			{
				if(options.value >= min && options.value <= max) current = options.value;
				$valEL.val(current);
			}
			
			if((typeof options.autoReset) == "boolean")
			{
				autoReset = options.autoReset;
			}
			
			if((typeof options.increment) == "number")
			{
				increment = options.increment;
			}
		}
		
			            
		 $('.up-btn', this).click(function(e)
		{
			if((typeof source) == "object")
			{		
				current = (++current <= max) ? current:0;				
				$valEL.val(options.source[current]);						
			}else{
				current += increment;
				if(autoReset) 
				{
					//current = (++current <= max) ? current:0;
					current = (current <= max) ? current:0;
				}
				else {
					//current = (++current <= max) ? current:--current;	
					current = (current <= max) ? current:(current -= increment);
				}
							
				$valEL.val(current);
			}
			return false;
		});
		
		$('.down-btn', this).click(function(e)
		{
			if((typeof source) == "object")
			{
				current = (--current >= min) ? current:max;				
				$valEL.val(options.source[current]);
			}else{
				current -= increment;
				if(autoReset)
				{
					//current = (--current >= min) ? current:max;
					current = (current >= min) ? current:max;
				}else{
					//current = (--current >= min) ? current:++current;
					current = (current >= min) ? current:(current += increment);
				}
				
				$valEL.val(current);
			}
			return false;
		});

         // If the plugin hasn't been initialized yet
         if ( ! data ) {
           /*
             Do more setup stuff here
           */
           $(this).data('stepper', {
               target : $this,		            
           });
         }
		
       });
     },
     destroy : function( ) {

       return this.each(function(){

         var $this = $(this),
             data = $this.data('stepper');

         // Namespacing FTW
         $(window).unbind('.stepper');
         data.stepper.remove();
         $this.removeData('stepper');

       })

     },
  };

  $.fn.stepper = function( method ) {

    if ( methods[method] ) {
      return methods[method].apply( this, Array.prototype.slice.call( arguments, 1 ));
    } else if ( typeof method === 'object' || ! method ) {
      return methods.init.apply( this, arguments );
    } else {
      $.error( 'Method ' +  method + ' does not exist on jQuery.Stepper' );
    }    

  };

})( jQuery );