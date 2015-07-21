/*******************************************************************************
* @demo		NodeJS Sandbox
* @author	Jaroslaw Predki
*******************************************************************************/

$(function() {

	// create a new sandbox app
	var sandbox				= new Sandbox({
		title: 'Information',
		header: '#header',
		pages: '#nav',
		demos: '#demos'
	});
	// get pages and demos...
	sandbox
		.fetchPages()
		.fetchDemos();

});
