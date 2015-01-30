AJS.$(document).ready(function() {
    JIRA.bind(JIRA.Events.NEW_CONTENT_ADDED, function(e, context, reason) {
        bindCtc();
    });
    bindCtc();

    function bindCtc() {
        initCopyToClipboard();
    }

    function initCopyToClipboard() {
        function ctcGetBaseUrl() {
            return location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + contextPath;
        }

        var swfResPath = ctcGetBaseUrl() + "/download/resources/ru.mail.plugins.clipcopier.link-copy-to-clipboard:ctc-web-resources/zeroclipboard.swf";
        ZeroClipboard.config({
            moviePath: swfResPath,
            swfPath: swfResPath,
            forceHandCursor: true
        });

        // attach ctc to custom fields
        var ctcFields = jQuery(".ctc-field-indicator");
        for (var i = 0; i < ctcFields.length; i++) {
            var elementId = ctcFields.eq(i).attr("id");
            attachCtcToElemId(elementId);
        }

        // attach ctc to ops bar
        attachCtcToOpsBar();
    }

    function attachCtcToElemId(elemId) {
        var clipElem = document.getElementById(elemId);
        var zcClient = new ZeroClipboard(clipElem);

        zcClient.on("ready", function(readyEvent) {
            zcClient.on("copy", function(event) {
                var clipboard = event.clipboardData;
                var clipboardData;
                var clipHolder = jQuery("#" + event.target.id);
                if (clipHolder.hasClass('ctc-column-view')) {
                    clipboardData = clipHolder.attr("ctc-value");
                } else {
                    clipboardData = jQuery("#key-val").prop('textContent') + " " + jQuery("#summary-val").prop('textContent');
                }
                clipboard.setData("text/plain", clipboardData);
            });
            zcClient.on("aftercopy", function(event) {
                // TODO add visuals
            });
        });

        zcClient.on('error', function(event) {
            ZeroClipboard.destroy();
        });
    }

    function attachCtcToOpsBar() {
        var toolbarItems = jQuery(".toolbar-item");
        if (toolbarItems.find(".type-link-copytoclip").length <= 0) {
            var opsBarCtcItemId = 'ctc-ops-bar-item';
            var ctcOpsItemHtml = "<li id='" + opsBarCtcItemId + "' class='toolbar-item'><span title='Copy to clipboard' class='toolbar-trigger type-link-copytoclip'>&copy;</span></li>";
            toolbarItems.first().after(ctcOpsItemHtml);
            attachCtcToElemId(opsBarCtcItemId);
        }
    }
});