var selected_folder = null , curFolders = '' , wpmf_list_import = '';
(function ($) {
    
    importWpmfTaxo = function(doit, button) {
        jQuery(button).closest('div').find('.spinner').show().css('visibility','visible');
        $.ajax({
            type: "POST",
            url: ajaxurl,
            data: {
                action: "import_categories",
                doit: doit
            },
            success: function(response) {
                jQuery(button).closest('div').find('.spinner').hide();
                jQuery(button).closest('div').find('.wpmf_info_update').fadeIn(1000).delay(500).fadeOut(1000);
            }
        });
    }
    
    bindSelect = function(){
        $('.btn_deletesync_media').on('click',function(){
            var list = [];
            $('[id^="cb-select-"]:checked').each(function(i , $this){
                if($($this).val() != "on"){
                    list.push($($this).val());  
                }
            });
            
            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: 'json',
                data: {
                    action: "wpmf_remove_syncmedia",
                    key: list.toString()
                },
                success: function(response) {
                    if(response !== false){
                        $.each(response,function(i,v){
                            $('.wp-list-table-sync').find('tr[data-id="'+ v +'"]').remove();
                        });
                    }
                }
            });
        });
        
        $('#cb-select-all').on('click',function(){
            if($(this).attr('checked') == 'checked'){
                $('.wp-list-table-sync').find('[id^="cb-select-"]').prop('checked',true);
            }else{
                $('.wp-list-table-sync').find('[id^="cb-select-"]').prop('checked',false);
            }
        });
        
        $('.btn_addsync_media').on('click',function(){
            var folder_ftp = $('.dir_name_ftp').val();
            var folder_category = $('.dir_name_categories').data('id_category');
            $.ajax({
                type: "POST",
                url: ajaxurl,
                dataType: 'json',
                data: {
                    action: "wpmf_add_syncmedia",
                    folder_ftp: folder_ftp,
                    folder_category: folder_category
                },
                success: function(response) {
                    $('.wp-list-table-sync').find('tr[data-id="'+ response.folder_category +'"]').remove();
                    var tr = '<tr data-id="'+ response.folder_category +'">';
                    tr += '<td><input id="cb-select-'+ response.folder_category +'" type="checkbox" name="post[]" value="'+ response.folder_category +'"></td>';
                    tr += '<td>'+ response.folder_ftp +'</td>';
                    tr += '<td>'+ $('.dir_name_categories').val() +'</td>';
                    tr += '</tr>';
                    $('.wp-list-table-sync').append(tr);
                }
            });
        });
        
        $('.wpmf-tab-header').on('click',function(){
            var $this = $(this);
            var label = $this.data('label');
            if(label == 'wpmf-regen-thumbnail'){
                $('.btn_wpmf_saves').hide();
            }else{
                $('.btn_wpmf_saves').show();
            }
            $('.setting_tab_value').val(label);
            $('.wpmf-tab-header').removeClass('active');
            $this.addClass('active');
            $('.content-box').addClass('content-noactive').removeClass('content-active').hide();
            $('.content-'+ label +'').addClass('content-active').removeClass('content-noactive').slideDown();
        });

        $('#import_button').on('click',function(){          
            var $this = $(this);
            $('.process_import_ftp_full').show();
            $this.parent('.btnoption').find('.spinner').show().css('visibility','initial');
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data :  {
                    action : "wpmf_import_folder",
                    wpmf_list_import : wpmf_list_import
                },
                success : function(res){
                    var w = $('.process_import_ftp').data('w');
                    if(typeof res.status != "undefined" && res.status == 'error time'){
                        if(typeof res.precent != "undefined"){
                            var new_w = parseFloat(w) + parseFloat(res.precent);
                            if(new_w > 100) new_w = 100;
                            $('.process_import_ftp').data('w',new_w);
                            $('.process_import_ftp').css('width',new_w + '%');
                        }
                        $this.click();
                    }else{
                        $this.parent('.btnoption').find('.spinner').hide();
                        $this.parent('.btnoption').find('.info_import').fadeIn(500).fadeOut(3000);
                        $('.process_import_ftp_full').show();
                        $('.process_import_ftp').data('w',0);
                        $('.process_import_ftp').css('width','100%');
                        
                        setTimeout(function(){
                            $('.process_import_ftp_full').hide();
                            $('.process_import_ftp').css('width','0%');
                        },2000);
                        
                        
                    }
                }
            });
        });
        
        $('#add_weight').on('click',function(){
            if(($('.wpmf_min_weight').val() == '') || ($('.wpmf_min_weight').val() == '' && $('.wpmf_max_weight').val() == '')){
                $('.wpmf_min_weight').focus();
            }else if($('.wpmf_max_weight').val() == ''){
                $('.wpmf_max_weight').focus();
            }else{
                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data :  {
                        action : "wpmf_add_weight",
                        min_weight : $('.wpmf_min_weight').val(),
                        max_weight : $('.wpmf_max_weight').val(),
                        unit : $('.wpmfunit').val(),
                    },
                    success : function(res){
                        if(res != false){
                            var new_weight = '<li class="customize-control customize-control-select item_weight" style="display: list-item;" data-value="'+ res.key +'" data-unit="'+ res.unit +'">';
                                new_weight += '<input type="checkbox" name="weight[]" value="'+ res.key+','+res.unit+'" data-unit="'+ res.unit +'" >';
                                new_weight += '<span>'+ res.label +'</span>';
                                new_weight += '<i class="zmdi zmdi-delete wpmf-delete" data-label="weight" data-value="'+ res.key +'" data-unit="'+ res.unit +'" title="'+ wpmflangoption.unweight +'"></i>';
                                new_weight += '<i class="zmdi zmdi-edit wpmf-md-edit" data-label="weight" data-value="'+ res.key +'" data-unit="'+ res.unit +'" title="'+ wpmflangoption.editweight +'"></i>';
                                new_weight += '</li>';
                            $('.content_list_fillweight li.weight').before(new_weight);
                        }else{
                            alert(wpmflangoption.error);
                        }
                        $('li.weight input').val(null);
                        $('.wpmfunit option[value="kB"]').prop('selected',true).change();
                    }
                });
            }
        });
        
        $('#add_dimension').on('click',function(){
            if(($('.wpmf_width_dimension').val() == '') || ($('.wpmf_width_dimension').val() == '' && $('.wpmf_height_dimension').val() == '')){
                $('.wpmf_width_dimension').focus();
            }else if($('.wpmf_height_dimension').val() == ''){
                $('.wpmf_height_dimension').focus();
            }else{
                $.ajax({
                    type: 'POST',
                    url: ajaxurl,
                    data :  {
                        action : "wpmf_add_dimension",
                        width_dimension : $('.wpmf_width_dimension').val(),
                        height_dimension : $('.wpmf_height_dimension').val(),
                    },
                    success : function(res){
                        if(res != false){
                            var new_dimension = '<li class="customize-control customize-control-select item_dimension" style="display: list-item;" data-value="'+ res +'">';
                                new_dimension += '<input type="checkbox" name="dimension[]" value="'+ res +'" >';
                                new_dimension += '<span>'+ res +'</span>';
                                new_dimension += '<i class="zmdi zmdi-delete wpmf-delete" data-label="dimension" data-value="'+ res +'" title="'+ wpmflangoption.undimension +'"></i>';
                                new_dimension += '<i class="zmdi zmdi-edit wpmf-md-edit" data-label="dimension" data-value="'+ res +'" title="'+ wpmflangoption.editdimension +'"></i>';
                                new_dimension += '</li>';
                            $('.content_list_filldimension li.dimension').before(new_dimension);
                        }else{
                            alert(wpmflangoption.error);
                        }
                        $('li.dimension input').val(null);
                    }
                });
            }
        });
        
        $('.wpmf-delete').live('click',function(){
            var $this = $(this);
            var value = $this.data('value');
            var label = $this.data('label');
            var unit = $this.data('unit');
            if(label == 'dimension'){
                var action = 'wpmf_remove_dimension';
            }else{
                var action = 'wpmf_remove_weight';
            }
            
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data :  {
                    action : action,
                    value : value,
                    unit : unit
                },
                success : function(res){
                    if(res == true){
                        $this.closest('li').remove();
                    }
                }
            });
        });
        
        $('.wpmfedit').live('click',function(){
            var $this = $(this);
            var label = $this.data('label');
            var curent_value = $('#edit_'+ label +'').data('value');
            var unit = $('.wpmfunit').val();
            if(label == 'dimension'){
                var new_value = $('.wpmf_width_dimension').val()+'x'+$('.wpmf_height_dimension').val();
            }else{
                if(unit == 'kB'){
                    var new_value = ($('.wpmf_min_weight').val()*1024)+'-'+($('.wpmf_max_weight').val()*1024)+','+unit;
                }else{
                    var new_value = ($('.wpmf_min_weight').val()*(1024*1024))+'-'+($('.wpmf_max_weight').val()*(1024*1024))+','+unit;
                }
            }
                
            $.ajax({
                type: 'POST',
                url: ajaxurl,
                data :  {
                    action : 'wpmf_edit',
                    label : label,
                    old_value : $this.data('value'),
                    new_value : new_value,
                    unit : $('.wpmfunit').val(),
                },
                success : function(res){
                    if(res !=  false){
                        if(label == 'dimension'){
                            $('li.item_'+ label +'[data-value="'+ curent_value +'"]').find('.wpmf-delete').attr('data-value',res.value).data('value',res.value);
                            $('li.item_'+ label +'[data-value="'+ curent_value +'"]').find('.wpmf-md-edit').attr('data-value',res.value).data('value',res.value);
                            $('li.item_'+ label +'[data-value="'+ curent_value +'"]').find('input[name="'+ label +'[]"]').val(res.value);
                            $('.content_list_filldimension li[data-value="'+ curent_value +'"]').find('span').html(new_value);
                            $('li.item_'+ label +'[data-value="'+ curent_value +'"]').attr('data-value',res.value).data('value',res.value);
                        }else{
                            var cur_val = curent_value.split(',');
                            $('li.item_'+ label +'[data-value="'+ cur_val[0] +'"]').find('.wpmf-delete').attr('data-value',res.value).data('value',res.value);
                            $('li.item_'+ label +'[data-value="'+ cur_val[0] +'"]').find('.wpmf-md-edit').attr('data-value',res.value).data('value',res.value);
                            $('li.item_'+ label +'[data-value="'+ cur_val[0] +'"]').find('input[name="'+ label +'[]"]').val(res.value+','+cur_val[1]);
                            $('.content_list_fillweight li[data-value="'+ cur_val[0] +'"]').find('span').html(res.label);
                            $('li.item_'+ label +'[data-value="'+ cur_val[0] +'"]').attr('data-value',res.value).data('value',res.value);
                        }
                        
                    }else{
                        alert(wpmflangoption.error);
                    }
                    $('.wpmf_can,#edit_'+ label +'').hide();
                    $('#edit_'+ label +'').attr('data-value',null).data('value',null);
                    $('#add_'+ label +'').show();
                    $('li.'+ label +' input').val(null);
                }
            });
        });
        
        $('.wpmf-md-edit').live('click',function(){
            var $this = $(this);
            var value = $this.data('value');
            var unit = $this.data('unit');
            var label = $this.data('label');
            $('.wpmf_can[data-label="'+ label +'"]').show();
            $('#add_'+ label +'').hide();
            
            if(label == 'dimension'){
                $('#edit_'+ label +'').show().attr('data-value',value).data('value',value);
                var value_array = value.split('x');
                $('.wpmf_width_dimension').val(value_array[0]);
                $('.wpmf_height_dimension').val(value_array[1]);
            }else{
                $('#edit_'+ label +'').show().attr('data-value',value+','+unit).data('value',value+','+unit);
                var unit = $this.data('unit');
                var value_array = value.split('-');
                if(unit == 'kB'){
                    $('.wpmf_min_weight').val(value_array[0]/1024);
                    $('.wpmf_max_weight').val(value_array[1]/1024);
                }else{
                    $('.wpmf_min_weight').val(value_array[0]/(1024*1024));
                    $('.wpmf_max_weight').val(value_array[1]/(1024*1024));
                }
                $('select.wpmfunit option[value="'+ unit +'"]').prop('selected',true).change();
            }
        });
        
        $('.wpmf_can').live('click',function(){
            var $this = $(this);
            var label = $this.data('label');
            $this.hide();
            $('#edit_'+ label +'').hide();
            $('#edit_'+ label +'').attr('data-value',null).data('value',null);
            $('#add_'+ label +'').show();
            $('li.'+ label +' input').val(null);
            if(label == 'weight'){
                $('.wpmfunit option[value="kB"]').prop('selected',true).change();
            }
        });
        
        $('.wpmf-section-title').on('click',function(){
            var title = $(this).data('title');
            if($(this).closest('li').hasClass('open')){
                $('.content_list_'+ title +'').slideUp('fast');
                $(this).closest('li').removeClass('open');
            }else{
                $('.content_list_'+ title +'').slideDown('fast');
                $(this).closest('li').addClass('open')
            }
        });
        
        $('#wmpfImpoBtn').on('click',function(){
            $(this).addClass('button-primary');
            importWpmfTaxo(true,this);
        });
        
        $('.btn_import_gallery').on('click',function(){
            var $this = $(this);
            $('.btn_import_gallery').closest('div').find('.spinner').show().css('visibility','visible');
            $(this).addClass('button-primary');
            $.ajax({
                type: 'POST',
                url : ajaxurl,
                data :  {
                    action : "import_gallery",
                    doit : true
                },
                success : function(res){
                    if(res == 'error time'){
                        $this.click();
                    }else{
                        $('.btn_import_gallery').closest('div').find('.spinner').hide();
                        $('.btn_import_gallery').closest('div').find('.wpmf_info_update').fadeIn(1000).delay(500).fadeOut(1000);
                    }
                }
            });
        });
        
        $('.cb_option').unbind('click').bind('click', function() {
            var check = $(this).attr('checked');
            var type = $(this).attr('type');
            var value;
            var $this = $(this);
            if (type == 'checkbox') {
                if (check == 'checked') {
                    value = 1;
                    if($(this).data('label') == 'wpmf_active_media'){
                        $('.wpmf_show_media').slideDown('fast');
                    }
                } else {
                    if($(this).data('label') == 'wpmf_active_media'){
                        $('.wpmf_show_media').slideUp('fast');
                    }
                    value = 0;
                }
                $('input[name="'+ $(this).data('label') +'"]').val(value);
            }else{
                $this.closest('div').find('.spinner').show().css('visibility','visible');
                $('.cb_option').removeClass('button-primary');
                $(this).addClass('button-primary');
                value = $(this).data('value');
                $.ajax({
                    type: "POST",
                    url: ajaxurl,
                    data: {
                        action: "update_opt",
                        label: $(this).data('label'),
                        value: value
                    },
                    success: function(res) {
                        $this.closest('div').find('.spinner').hide();
                        $this.closest('div').find('.wpmf_info_update').fadeIn(1000).delay(500).fadeOut(1000);
                    }
                });
            } 
        });
    }
    
    
    
    $(document).ready(function(){
        var options =  {
        'root'            : '/',
        'showroot'        : 'root',
        'onclick'         : function(elem,type,file){},
        'oncheck'         : function(elem,checked,type,file){},
        'usecheckboxes'   : true, //can be true files dirs or false
        'expandSpeed'     : 500,
        'collapseSpeed'   : 500,
        'expandEasing'    : null,
        'collapseEasing'  : null,
        'canselect'       : true
      };

        var methods = {
            init : function( o ) {
                if($(this).length==0){
                    return;
                }
                $this = $(this);
                $.extend(options,o);

                if(options.showroot!=''){
                    checkboxes = '';
                    if(options.usecheckboxes===true || options.usecheckboxes==='dirs'){
                        checkboxes = '<input type="checkbox" /><span class="check" data-file="'+options.root+'" data-type="dir"></span>';
                    }
                    $this.html('<ul class="jaofiletree"><li class="drive directory collapsed selected">'+checkboxes+'<a href="#" data-file="'+options.root+'" data-type="dir">'+options.showroot+'</a></li></ul>');
                }
                openfolder(options.root);
            },
            open : function(dir){
                openfolder(dir);
            },
            close : function(dir){
                closedir(dir);
            },
            getchecked : function(){
                var list = new Array();            
                var ik = 0;
                $this.find('input:checked + a').each(function(){
                    list[ik] = {
                        type : $(this).attr('data-type'),
                        file : $(this).attr('data-file')
                    }                
                    ik++;
                });
                return list;
            },
            getselected : function(){
                var list = new Array();            
                var ik = 0;
                $this.find('li.selected > a').each(function(){
                    list[ik] = {
                        type : $(this).attr('data-type'),
                        file : $(this).attr('data-file')
                    }                
                    ik++;
                });
                return list;
            }
        };

        openfolder = function(dir) {
                if($this.find('a[data-file="'+dir+'"]').parent().hasClass('expanded')){
                    return;
                }
                var ret;
                ret = $.ajax({
                    url : ajaxurl,
                    data : {dir : dir, action: 'wpmf_get_folder'},
                    context : $this,
                    dataType: 'json',
                    beforeSend : function(){$('#wpmf_foldertree').find('a[data-file="'+dir+'"]').parent().addClass('wait');}
                }).done(function(datas) {
                    
                    selected_folder = dir;
                    ret = '<ul class="jaofiletree" style="display: none">';
                    for(ij=0; ij<datas.length; ij++){
                        if(datas[ij].type=='dir'){
                            classe = 'directory collapsed';
                            isdir = '/';
                        }else{
                            classe = 'file ext_'+datas[ij].ext;
                            isdir = '';
                        }
                        ret += '<li class="'+classe+'">'                    
                        if(options.usecheckboxes===true || (options.usecheckboxes==='dirs' && datas[ij].type=='dir') || (options.usecheckboxes==='files' && datas[ij].type=='file')){
                            ret += '<input type="checkbox" data-file="'+dir+datas[ij].file+isdir+'" data-type="'+datas[ij].type+'" />';                        
                            testFolder = dir+datas[ij].file; 
                            if (testFolder.substring(0,1) ==  '/') {
                                testFolder = testFolder.substring(1,testFolder.length);
                            }
                            
                            if(curFolders.indexOf(testFolder) > -1 ) {    
                                ret += '<span class="check checked" data-file="'+dir+datas[ij].file+isdir+'" data-type="'+datas[ij].type+'"></span>';
                            }else if(datas[ij].pchecked===true) {
                                ret += '<span class="check pchecked" data-file="'+dir+datas[ij].file+isdir+'" data-type="'+datas[ij].type+'" ></span>';
                            }else {
                                ret += '<span class="check" data-file="'+dir+datas[ij].file+isdir+'" data-type="'+datas[ij].type+'" ></span>';
                            }

                        }
                        else{
    //                        ret += '<input disabled="disabled" type="checkbox" data-file="'+dir+datas[ij].file+'" data-type="'+datas[ij].type+'"/>';
                        }
                        ret += '<a href="#" data-file="'+dir+datas[ij].file+isdir+'" data-type="'+datas[ij].type+'">'+datas[ij].file+'</a>';
                        ret += '</li>';
                    }
                    ret += '</ul>';

                    $('#wpmf_foldertree').find('a[data-file="'+dir+'"]').parent().removeClass('wait').removeClass('collapsed').addClass('expanded');
                    $('#wpmf_foldertree').find('a[data-file="'+dir+'"]').after(ret);
                    $('#wpmf_foldertree').find('a[data-file="'+dir+'"]').next().slideDown(options.expandSpeed,options.expandEasing);

                    setevents();

                    if(options.usecheckboxes){
                        this.find('a[data-file="'+dir+'"]').parent().find('li input[type="checkbox"]').attr('checked',null);
                        for(ij=0; ij<datas.length; ij++){
                            testFolder = dir+datas[ij].file;
                            if (testFolder.substring(0,1) ==  '/') {
                                testFolder = testFolder.substring(1,testFolder.length);
                            }
                            if( curFolders.indexOf(testFolder) > -1) {                                                            
                                this.find('input[data-file="'+dir+datas[ij].file+isdir+'"]').attr('checked','checked');
                            }
                        }

                        if( this.find('input[data-file="'+dir+'"]').is(':checked')) {                        
                             this.find('input[data-file="'+dir+'"]').parent().find('li input[type="checkbox"]').each(function(){                              
                                 $(this).prop('checked',true).trigger('change');
                             })                                 
                             this.find('input[data-file="'+dir+'"]').parent().find('li span.check').addClass("checked");
                        }

                    }


                }).done(function(){              
                    //Trigger custom event
                    $this.trigger('afteropen');
                    $this.trigger('afterupdate');
                });
                
                wpmf_bindeventcheckbox($this);
        }
        
        wpmf_bindeventcheckbox = function($this){
            $this.find('li input[type="checkbox"]').bind('change', function() {
                var dir_checked = [];
                $('.directory span.check').each(function(){
                    if($(this).hasClass('checked')){
                        if($(this).data('file') != undefined){
                            dir_checked.push($(this).data('file'));
                        }
                    }
                });

                var fchecked = [];    
                fchecked.sort();
                for(i=0;i< dir_checked.length;i++) {
                    curDir = dir_checked[i];
                    valid = true;
                    for(j=0;j<i;j++) {
                        if(curDir.indexOf(dir_checked[j])==0) {
                          valid = false;
                        }
                    }          
                    if(valid) {
                         fchecked.push(curDir);
                    }
                }

                wpmf_list_import = fchecked.toString();
                $.ajax({
                    type : "POST",
                    url : ajaxurl,
                    data :  {
                        action : "wpmfjao_checked",
                        dir_checked      : wpmf_list_import,
                    }
                });
            });
        }
        
        closedir = function(dir) {
                $this.find('a[data-file="'+dir+'"]').next().slideUp(options.collapseSpeed,options.collapseEasing,function(){$(this).remove();});
                $this.find('a[data-file="'+dir+'"]').parent().removeClass('expanded').addClass('collapsed');
                setevents();

                //Trigger custom event
                $this.trigger('afterclose');
                $this.trigger('afterupdate');

        }

        setevents = function(){
            $this = $('#wpmf_foldertree');
            $this.find('li a').unbind('click');
            //Bind userdefined function on click an element
            $this.find('li a').bind('click', function() {
                
                options.onclick(this, $(this).attr('data-type'),$(this).attr('data-file'));
                if(options.usecheckboxes && $(this).attr('data-type')=='file'){
                        $this.find('li input[type="checkbox"]').attr('checked',null);
                        $(this).prev(':not(:disabled)').attr('checked','checked');
                        $(this).prev(':not(:disabled)').trigger('check');
                }
                if(options.canselect){
                    $this.find('li').removeClass('selected');
                    $(this).parent().addClass('selected');
                }
                return false;
            });
            //Bind checkbox check/uncheck
            $this.find('li input[type="checkbox"]').bind('change', function() {
                options.oncheck(this,$(this).is(':checked'), $(this).next().attr('data-type'),$(this).next().attr('data-file'));
                if($(this).is(':checked')){
                    $(this).parent().find('li input[type="checkbox"]').attr('checked','checked');
                    $this.trigger('check');
                }else{
                    $(this).parent().find('li input[type="checkbox"]').attr('checked',null);
                    $this.trigger('uncheck');
                }

            });
            //Bind for collapse or expand elements
            $this.find('li.directory.collapsed a').bind('click', function() {methods.open($(this).attr('data-file'));return false;});
            $this.find('li.directory.expanded a').bind('click', function() {methods.close($(this).attr('data-file'));return false;});        
        }

        $.fn.jaofiletree = function( method ) {
            // Method calling logic
            if ( methods[method] ) {
                return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof method === 'object' || ! method ) {
                return methods.init.apply( this, arguments );
            } else {
                //error
            }    
        };
        
        bindSelect();
    });
})(jQuery);