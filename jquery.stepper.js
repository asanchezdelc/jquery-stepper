/**
 * jQuery Numeric and Array Stepper Plugin
 * by Adrian Sanchez del C.
 */
 

 var Stepper = function(element, options){
 	this.init(element,options);
 }

 Stepper.prototype = {
 	constructor: Stepper,
 	init: function(element, options){
		this.$element = $(element)
 		this.options = this.getOptions(options)
			
		//create plugin markup data
		this.$element.append(this.options.template)		
			
		//assign pointer to buttons
		this.$upButton = this.$element.find('.up-btn');
		this.$downButton = this.$element.find('.down-btn');
		//setup events
		this.$upButton.on('click', false, $.proxy(this.up, this));
		this.$downButton.on('click', false, $.proxy(this.down, this));

		//get text field element reference
		this.$field = this.$element.find('input[name="ns_textbox"]')

		//display value on field			
		this.isArrayDriven = (typeof this.options.source == "object") ? true:false
		
		//making sure the initial value is a valid one
		this.initChecks();
		
		this.display()
 	},
	
	//get plugin's default and user options combined.
 	getOptions: function(options)
 	{
 		options = $.extend({}, $.fn.stepper.defaults, options, this.$element.data());
 		return options;
 	},
	
	//makes sure we have valid data
	initChecks: function(){
		var v = this.options.value,
			inc = this.options.increment,
			min = this.options.min,
			arr = this.options.source,
			max = this.options.max;
		
		if(!this.isArrayDriven)
		{
			if(min != 0 && max != 0) if(v < min || v > max) v = min;
		}else{
			if((v > arr.length-1) || (v < 0)) v = 0;
		}
		
		
		this.options.value = v;
	},
	
	//click listener for up event
	up: function(e){
		var v = this.options.value;		
		if(this.isArrayDriven){
			this.sourceActions('up');
		}else{
			this.increment()			
		}
		this.display()
	},
	
	increment: function(){
		var v = this.options.value,
			inc = this.options.increment,
			min = this.options.min,
			r = this.options.autoReset,
			max = this.options.max;	
		if(max != 0) v = (v < max)? v+inc:(!r)?max:min
		else v += inc
				
		this.options.value = v;
	},
	
	//click listener for down event
	down: function(e){
		if(this.isArrayDriven){
			this.sourceActions('down');
		}else{
			this.decrement()			
		}
		this.display()
	},
	
	decrement: function(){
		var v = this.options.value,
			inc = this.options.increment,
			min = this.options.min,
			max = this.options.max,
			r = this.options.autoReset;
		
		if(min != 0) v = (v > min)? v-inc:(!r)?min:max
		else v -= inc
		
		this.options.value = v;
	},

	display: function()
	{
		var value = this.options.value
		if(typeof this.options.label == "function") value = this.options.label(value);
		else if(typeof this.options.label == "string") value = this.options.label.replace('%n', value);
		
		if(this.isArrayDriven) value = this.options.source[value];
		
		this.$field.val(value);
	},
	
	sourceActions: function(type){
		var v = this.options.value,
			r = this.options.autoReset,
			arr = this.options.source;
		if(type == "up") {
			if(arr[v+1]) v++;
			else if(r) v = 0;
		}else if (type == "down") {
			if(arr[v-1]) v--;
			else if(r) v = arr.length -1;
		}
		
		this.options.value = v
	}
	
 }


 $.fn.stepper = function( option)
 {
 	return this.each(function(){
 		var $this= $(this),
		data = $this.data('stepper'),
 		options = typeof option == 'object' && option
		if(!data) $this.data('stepper', (data = new Stepper(this, options)))
 		if(typeof option == 'string') data[option]()
 	});
 }

 $.fn.stepper.Constructor = Stepper

 $.fn.stepper.defaults = {
 	value: 1,
 	increment: 1,
 	max: 0, //0 is infinite
 	min:0, //0 is infinite
 	source: false,
 	label: false,
	autoReset: false,
	template: '<input class="value" name="ns_textbox" size="2" type="text"/> <button type="button" class="btn up-btn">+</button><button type="button" class="btn down-btn">-</button>'
}
