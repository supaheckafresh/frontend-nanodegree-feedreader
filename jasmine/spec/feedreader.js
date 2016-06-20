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
            expect( allFeeds ).toBeDefined();
            expect( allFeeds.length ).not.toBe(0);
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

        /* TODO: Write a test that ensures the menu element is
         * hidden by default. You'll have to analyze the HTML and
         * the CSS to determine how we're performing the
         * hiding/showing of the menu element.
         */
        it('is hidden by default', function () {
            expect( $('body').hasClass('menu-hidden') ).toBeTruthy();

            // Make sure that the element is positioned completely to the left of the viewport
            var slideMenu = $('.slide-menu');
            expect( slideMenu.offset().left + slideMenu.width() ).toBeLessThan(0);
        });


        /* TODO: Write a test that ensures the menu chan    ges
         * visibility when the menu icon is clicked. This test
         * should have two expectations: does the menu display when
         * clicked and does it hide when clicked again.
         */
    });



    /* TODO: Write a new test suite named "Initial Entries" */

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());
