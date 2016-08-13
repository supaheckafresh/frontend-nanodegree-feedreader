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

            (function (feed) {
                // Make a copy of each feed object, so that we are
                // not directly using the mutable feed object in our test.
                var feedCopy = feed;

                /*
                 * Ensure each feed has a URL that is defined and not empty.
                 */
                ensure.definedAndNotEmpty(feedCopy, 'url');

                /*
                 * Ensure that each feed has a name that is defined and not empty
                 */
                ensure.definedAndNotEmpty(feedCopy, 'name');

            })(allFeeds[i]); // Immediately execute the closure function to make feedCopy.
        }
    });


    describe('The menu', function () {
        /*
         * Ensure that the slide menu is hidden by default.
         */
        it('is hidden by default', function () {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

            // Make sure that the element is positioned completely to the left of the viewport when the page loads.
            var slideMenu = $('.slide-menu');
            expect(slideMenu.offset().left + slideMenu.width()).toBeLessThan(0);
        });


        /* This test ensures the menu changes visibility when
         * the menu icon is clicked. This test should have two
         * expectations: does the menu display when clicked
         * and does it hide when clicked again.
         */
        // Side note: it seems kind of weird to me that we're essentially testing if jQuery's click
        // function is working, but I'll roll with it...
        describe('The menu icon', function () {
            var menuIcon = $('.menu-icon-link');

            var menuIsVisible = function () {
                return !$('body').hasClass('menu-hidden') && $('.slide-menu').offset().left === 0;
            };

            it('toggles opening and closing of the slide menu', function (done) {
                // We've already tested that the menu is hidden by default, so let's click the menu icon a first time
                // & make sure that this action actually displays the slide menu:
                menuIcon.click();
                setTimeout(function () {
                    expect(menuIsVisible()).toEqual(true);

                    // Now, let's make sure clicking the menu icon again hides the slide menu.
                    menuIcon.click();
                    setTimeout(function () {
                        expect(menuIsVisible()).toEqual(false);
                        done();

                    }, 100);
                }, 100);
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
            expect(_.isFunction(loadFeed)).toEqual(true);
        });

        /* Ensure that when the loadFeed function is called and completes its work, there is at least a single
         * .entry element within the .feed container. Remember, loadFeed() is asynchronous
         * so this test will require the use of Jasmine's beforeEach
         * and asynchronous done() function.
         */
        it('loads at least one entry into the feed', function (done) {
            setTimeout(function () {
                expect($('.feed').children().find('.entry').length).toBeGreaterThan(0);
                done();
            }, 200);
        });
    });


    describe('New Feed Selection', function () {
        var initialFeedId = 0;
        var newFeedId = 0;
        var feedI, feedJ;

        // Wait a moment for the async call & then grab the current feed results.
        setTimeout(function () {
            feedI = $('.feed').children();
        }, 200);

        // Generate a random feed id that is different than the initial one.
        while(newFeedId === initialFeedId) {
            newFeedId = _.random(allFeeds.length - 1);
        }

        /* Ensures that when a new feed is loaded by the loadFeed function that the content actually changes.
         */
        it('changes the entries in the feed', function (done) {
            loadFeed(newFeedId);
            setTimeout(function () {
                feedJ = $('.feed').children();
                expect(feedJ).not.toEqual(feedI);
                done();
            }, 200);
        });
    });

}());
