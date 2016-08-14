/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function () {

    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function () {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function () {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /*
        * Loop through each feed in the allFeeds object for URL and name tests.
        */
        for (var i = 0, len = allFeeds.length; i < len; i++) {
            var feed = allFeeds[i];

            //Ensure each feed has a URL that is defined and not empty.
            ensure.definedAndNotEmpty(feed, 'url');

            //Ensure that each feed has a name that is defined and not empty
            ensure.definedAndNotEmpty(feed, 'name');
        }
    });


    describe('The menu', function () {
        /*
         * Ensure that the slide menu is hidden by default.
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


        /* This test ensures the menu changes visibility when
         * the menu icon is clicked. This test should have two
         * expectations: does the menu display when clicked
         * and does it hide when clicked again.
         */
        describe('The menu icon', function () {
            var menuIcon = $('.menu-icon-link');

            var menuIsVisible = function () {
                return !$('body').hasClass('menu-hidden');
            };

            it('toggles opening and closing of the slide menu', function () {
                // We've already tested that the menu is hidden by default, so let's click the menu icon a first time
                // & make sure that this action actually displays the slide menu:
                menuIcon.click();
                expect(menuIsVisible()).toBe(true);

                // Click the menu icon a second time & make sure it's hidden.
                menuIcon.click();
                expect(menuIsVisible()).toBe(false);
            });
        });
    });


  /**
   * Make sure our page is initializing correctly & we're getting entries in the feed.
   */
  describe('Initial Entries', function () {
        beforeEach(function (done) {
            loadFeed(1, done);
        });

        // Make sure no one changed the name of the function.
        it('loadFeed function is defined', function () {
            expect(_.isFunction(loadFeed)).toBe(true);
        });

        /* Ensure that when the loadFeed function is called and completes its work, there is at least a single
         * .entry element within the .feed container. Remember, loadFeed() is asynchronous
         * so this test will require the use of Jasmine's beforeEach
         * and asynchronous done() function.
         */
        it('loads at least one entry into the feed', function () {
            expect($('.feed').children().find('.entry').length).toBeGreaterThan(0);
        });
    });


  /**
   * Make sure selecting feeds in the menu works properly.
   */
  describe('New Feed Selection', function () {
        var initialFeedId = 0;
        var testFeedId = 0;
        var feedI, feedJ;

        beforeEach(function (done) {
            // Generate a random feed id for the test that is different than the initial one.
            while(testFeedId === initialFeedId) {
                testFeedId = _.random(allFeeds.length - 1);
            }

            // Load up the initial feed before the test.
            loadFeed(initialFeedId, function () {
                feedI = $('.feed').text();
                done();
            });
        });

        // Ensures that when a new feed is loaded by the loadFeed function
        // that the content actually changes.
        it('changes the entries in the feed', function (done) {
            loadFeed(testFeedId, function () {
                feedJ = $('.feed').text();
                expect(feedJ).not.toEqual(feedI);
                done();
            });
        });
    });

}());
