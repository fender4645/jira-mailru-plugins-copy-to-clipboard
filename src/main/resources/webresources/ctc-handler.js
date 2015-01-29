AJS.$(document).ready(function(){
    JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function(e, context, reason) {
        bindCtc();
    });
    bindCtc();

    function bindCtc() {
        makeCtcActionStub();
        initCopyToClipboard();
    }

    function makeCtcActionStub() {
        AJS.$('#copy-to-clipboard-issue').click(function(e){
            e.preventDefault();
        });
    }

    function initCopyToClipboard() {
        function ctcGetBaseUrl() {
            return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + contextPath;
        }

        var swfResPath = ctcGetBaseUrl() + "/download/resources/ru.mail.plugins.clipcopier.link-copy-to-clipboard:ctc-web-resources/zeroclipboard.swf";
        ZeroClipboard.config( { moviePath: swfResPath,
                                swfPath: swfResPath,
                                forceHandCursor: true
                                });
        var client = new ZeroClipboard( document.getElementById('copy-to-clipboard-issue') );

        client.on( "ready", function( readyEvent ) {
            client.on( "copy", function (event) {
              var clipboard = event.clipboardData;
              clipboard.setData( "text/plain", jQuery("#key-val").prop('textContent') + " " +  jQuery("#summary-val").prop('textContent'));
            });
          client.on( "aftercopy", function( event ) {
            // TODO add visuals
          } );
        } );

         client.on( 'error', function(event) {
                ZeroClipboard.destroy();
         } );
    }
});

