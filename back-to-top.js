/**
 * Back to top menu
 */
Drupal.behaviors.backToTop = {

	attach: function (context, settings) {
		var plugin = this;
		$('body', context).once('backToTop', function () {
			var $body = $(this);
			plugin.init($body);
			$(window).resize(function () {
				plugin.init($body);
			});

		});
	},
	/**
	 * Initialization logic
	 */
	init: function ($body) {
		var plugin = this;
		if ($(window).width() < breakpointMedium) {
			if (plugin.$backToTop === undefined) {
				$body.prepend('<div id="back-to-top">');
				plugin.$backToTop = $('#back-to-top');
				// register click event
				plugin.$backToTop.on('click', function () {
					window.scrollTo(0, 0);
				});
				plugin.sticky = plugin.waypoint();
			}
		} else {
			if (plugin.sticky !== undefined) {
				plugin.sticky.destroy();
				plugin.$backToTop.remove();
				plugin.sticky = undefined;
				plugin.$backToTop = undefined;
			}
		}
	},
	/**
	 * Configure waypoints
	 * @return a Waypoint.Sticky object
	 */
	waypoint: function () {
		var plugin = this;
		if (plugin.sticky === undefined) {
			return new Waypoint.Sticky({
				element: plugin.$backToTop,
				offset: '20%'
			});
		}
	}

}
