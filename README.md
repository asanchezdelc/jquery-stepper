Getting Started
---------------

Create a container as shown:

	<div class="numeric-stepper" id="stepper"></div>
	
Initiate the plugin:
	
	$('#stepper').stepper();
	
Options:
* autoReset - Reset to min or max when value if reached
* min - minimun numeric value
* max - maximum numeric value
* source - Pass an array to use as values
* value - current display value

You may also pass the value by using data attributes as shown:

	<div class="numeric-stepper" id="stepper" data-value="7">
	
