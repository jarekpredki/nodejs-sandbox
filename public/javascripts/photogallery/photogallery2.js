/*******************************************************************************
* @demo		Photo Gallery: 2
* @author	Jaroslaw Predki
*******************************************************************************/

//------------------------------------------------------------------------------
// MODEL: Photo
var Photo					= Backbone.Model.extend({

	defaults: {
		// id +
		name:			'',
		description:	'',
		url:			''
	}
});

//------------------------------------------------------------------------------
// COLLECTION: Photos
var Photos					= Backbone.Collection.extend({

	model:				Photo,
	url:				'/photos-api',

	parse: function( data ) {
		return data.photos;
	}
});

//------------------------------------------------------------------------------
// VIEW: PhotoView
var PhotoView				= Backbone.View.extend({

	tagName: 			'div',
	className:			'gallery-photo',

	events: {
		"click":			"updatePreview"
	},

	render: function() {
		// get the template, compile it and populate with model data
		var template 		= $( '#photo-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	},

	updatePreview: function() {
		var previewView		= new PhotoPreviewView({ model: this.model });
		// render and add html to element
		$( '#gallery-photo-preview' ).html( previewView.render().el );

		return this;
	}
});

//------------------------------------------------------------------------------
// VIEW: PhotoPreviewView
var PhotoPreviewView		= Backbone.View.extend({

	tagName: 			'div',
	className:			'gallery-photo-preview',

	render: function() {
		if ( !this.model )	{ return this; }
		// get the template, compile it and populate with model data
		var template 		= $( '#photo-preview-template' ).html();
		var compiled 		= Handlebars.compile( template );
		var html			= compiled( this.model.attributes );
		// add rendered html to element
		this.$el.html( html );

		return this;
	}
});

//------------------------------------------------------------------------------
// VIEW: PhotosView
var PhotosView				= Backbone.View.extend({

	tagName: 			'div',
	className: 			'gallery-photos',

	render: function() {
		// render each photo in the collection
		this.collection.each( function( photo ) {
			// create a new photo view and render it
			var photoView		= new PhotoView({ model: photo });
			this.$el.append( photoView.render().el );

		}, this );

		return this;
	}
});

//------------------------------------------------------------------------------
$(function() {

	// initialize a photo list
	var demoTitle			= 'Photo Gallery: Thumbnails and Preview Pane';
	var photos				= new Photos();
	var photosElement		= '#gallery-photos';
	var previewElement		= '#gallery-photo-preview';

	console.log( 'Initializing ' + demoTitle + '...' );
	// fetch data and render the photo list
	photos.fetch({

		success: function( data ) {
			// create a new photo list view and render it
			var photosView 		= new PhotosView({ collection: data });
			// render and add html to element
			$( photosElement ).html( photosView.render().el );
			// if collection has photos, render the first one in the preview pane
			if ( data.length ) {
				// use the 1st photo in the collection (indexed:0)
				var previewView		= new PhotoPreviewView({ model: data.at(0) });
				// and draw it
				$( previewElement ).html( previewView.render().el );
			}
			console.log( demoTitle + ' Ready!' );
		},

		error: function( jqXHR, textStatus, errorThrown ) {
			// error case
			console.log( demoTitle + ' Error!\n' + textStatus.responseText );
		}
	});
});

/*******************************************************************************
*******************************************************************************/
