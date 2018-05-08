/*
 * This is the spec file that Jasmine will read and contains
 */

// Run if DOM is ready
$(function() {
    
    // First test suite "RSS Feeds"
    describe('RSS Feeds', function() {
        
        // Test if variables are defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        // Test if Feeds have URLs definded and not empty
        it("have URLs definded and not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });


        // Test if Feeds have names definded and not empty
        it("have names definded and not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });

    // Test suite "The menu"
    describe("The menu", function() {
        var body,
            menu;
        
        // Run before each test
        beforeEach(function() {
            body = document.querySelector("body");
            menu = body.classList;
        });
        
        // Test if menu is hidden by default
        it(" is hidden by default", function() {
            
            // Solution in Vanilla JS
            expect(menu == "menu-hidden").toBe(true);
            
            // Solution in jQuery
            // expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        // Test if menu changes visibility when the menu icon is clicked
        it("changes visibility when the menu icon is clicked", function() {
            var menuIcon = document.querySelector(".menu-icon-link")
            menuIcon.click();
            
            //Solution in Vanilla JS
            expect(menu == "menu-hidden").not.toBe(true);
            
            // Solution in jQuery
            // expect($('body').hasClass('menu-hidden')).not.toBe(true);
            
            menuIcon.click();
            
            //Solution in Vanilla JS
            expect(menu == "menu-hidden").toBe(true);
            
            // Solution in jQuery
            // expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });
    
    
    // Test suite "Initial Entries"
    describe("Initial Entries", function() {
        
        // Async loading
        beforeEach(function(done) {
            loadFeed(0, function() {
                done();
            });
        });
        
        // Test if the loadFeed function is called and completes its work (Async)
        it("ensures when the loadFeed function is called and completes its work", function(done) {
            var entry = document.querySelector(".feed .entry");
            expect(entry.textContent.length).toBeGreaterThan(0);
            done();
        });
    }); 

    // Test suite "New Feed Selection"
    describe("New Feed Selection", function() {
        var textContainer,
            entryTextContent,
            updatedTextContent;
        
        // Async loading feed
        beforeEach(function(done) {
            //Load one Feed 
            loadFeed(0, function() {
                textContainer = document.querySelectorAll(".entry h2");
                entryTextContent = textContainer[0].textContent;
                
                //Load another feed inside first feed
                loadFeed(1, function() {
                    textContainer = document.querySelectorAll(".entry h2");
                    updatedTextContent = textContainer[0].textContent;
                    done();
                });
                
            });
        });
        
        //Test if New Feed Selection is loaded and content changes
        it("is loaded and content changes", function(done) {
            expect(entryTextContent).not.toBe(updatedTextContent);
            done();
        });
    });
}());
