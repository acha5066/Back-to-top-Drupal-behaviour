/**
 * Back to top menu
 */
Drupal.behaviors.backToTop = {

	attach: function (context, settings) {
		var plugin = this;
		$('body', context).once('backToTop', function () {
			var $body = $(this);
			var $window = $(window);
			plugin.init($body);
			$window.on('resize', function() {
				plugin.init($body);
			});
			$window.on('scroll', function() {
				plugin.scrollVal = document.body.scrollTop;
				plugin.init($body);
			});
		});
	},
	/**
	 * Initialization logic
	 */
	init: function ($body) {
		var plugin = this;
		var $windowWidth = $(window).width();
		if ($windowWidth < breakpointMedium && plugin.scrollVal > 100) {
			if (plugin.$backToTop === undefined) {
				$body.prepend('<div id="back-to-top">');
				plugin.$backToTop = $('#back-to-top');
				// register click event
				plugin.$backToTop.unbind('click').on('click', function() {
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
	 * @return a Waypoint object
	 */
	waypoint: function () {
		var plugin = this;
		if (plugin.sticky === undefined) {
			return new Waypoint.Sticky({
				element: plugin.$backToTop,
				offset: 40
			});
		}
	}
};