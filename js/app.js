(function(global) { 
    
    function init() {
    
        setupEditor();
        
        setupEvents();
        
        sourceView();
        
        /*$('#editor').css('display', 'none');
        
        JSV.init({
            plain: true,
            schema: schema,
            viewerHeight: $('#main-body').height(),
            viewerWidth: $('#main-body').width()
        }, function() {
            $('#jsv-tree').css('width', '100%');
            JSV.resizeViewer();
        });*/
    
    }
    
    function setupEditor() {
    
        global.jsonEditor = ace.edit("editor");
        global.jsonEditor.setTheme("ace/theme/chrome");
        global.jsonEditor.getSession().setMode("ace/mode/json");
        global.jsonEditor.setFontSize(14);
        global.jsonEditor.session.setOption("useWorker", false);
        
    }
    
    function setupEvents() {
        
        $('#sourceButton').click(sourceView);
        $('#visualizeButton').click(visualizeView);
        
        global.jsonEditor.on('change', function() {
            global.rootSchema = global.jsonEditor.getValue(); 
        });
    }
    
    function resetToolbar() {
        $('#app-toolbar button').attr("class", "btn btn-default");
    }
    
    function sourceView() {
        
        resetToolbar();
        $('#sourceButton').attr("class", "btn btn-primary active");
        
        $('#editor').css('display', 'block');
        
        global.jsonEditor.focus();
    }
    
    function visualizeView() {
        
        resetToolbar();
        $('#visualizeButton').attr("class", "btn btn-primary active");
        
        $('#editor').css('display', 'none');
        
        $('#main-body').empty();
        
        var schema = global.rootSchema;
        
        try {
            schema = JSON.parse(global.rootSchema);
        } catch (e) {
            //ignore.
        }
        
        $RefParser.dereference(schema).then(function(resolvedSchema) {
              JSV.init({
                plain: true,
                schema: resolvedSchema,
                viewerHeight: $('#main-body').height(),
                viewerWidth: $('#main-body').width()
            }, function() {
                $('#jsv-tree').css('width', '100%');
                JSV.resizeViewer();
            });
        });
        
    }

    $(init);
    
})(window);