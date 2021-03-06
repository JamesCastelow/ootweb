(function ($) {
    $(document).ready(function () {
        var options_sync = {
            'root': '/',
            'showroot': 'root',
            'onclick': function (elem, type, file) {
            },
            'oncheck': function (elem, checked, type, file) {
            },
            'usecheckboxes': false, //can be true files dirs or false
            'expandSpeed': 500,
            'collapseSpeed': 500,
            'expandEasing': null,
            'collapseEasing': null,
            'canselect': true
        };

        var methods_sync = {
            init_sync: function (o) {
                if ($(this).length == 0) {
                    return;
                }
                $thisftp = $(this);
                $.extend(options_sync, o);

                if (options_sync.showroot != '') {
                    $thisftp.html('<ul class="jaofiletree"><li class="drive directory collapsed selected"><a href="#" data-file="' + options_sync.root + '" data-type="dir">' + options_sync.showroot + '</a></li></ul>');
                }
                openfolder_sync(options_sync.root);
            },
            open_sync: function (dir) {
                openfolder_sync(dir);
            },
            close_sync: function (dir) {
                closedir_sync(dir);
            },
        };

        openfolder_sync = function (dir) {
            if ($thisftp.find('a[data-file="' + dir + '"]').parent().hasClass('expanded')) {
                return;
            }
            var ret;
            ret = $.ajax({
                url: ajaxurl,
                data: {dir: dir, action: 'wpmf_get_folder'},
                context: $thisftp,
                dataType: 'json',
                beforeSend: function () {
                    $('#wpmf_foldertree_sync').find('a[data-file="' + dir + '"]').parent().addClass('wait');
                }
            }).done(function (datas) {
                ret = '<ul class="jaofiletree" style="display: none">';
                for (ij = 0; ij < datas.length; ij++) {
                    if (datas[ij].type == 'dir') {
                        classe = 'directory collapsed';
                        isdir = '/';
                    } else {
                        classe = 'file ext_' + datas[ij].ext;
                        isdir = '';
                    }
                    ret += '<li class="' + classe + '">'
                    ret += '<a href="#" data-file="' + dir + datas[ij].file + isdir + '" data-type="' + datas[ij].type + '">' + datas[ij].file + '</a>';
                    ret += '</li>';
                }
                ret += '</ul>';

                $('#wpmf_foldertree_sync').find('a[data-file="' + dir + '"]').parent().removeClass('wait').removeClass('collapsed').addClass('expanded');
                $('#wpmf_foldertree_sync').find('a[data-file="' + dir + '"]').after(ret);
                $('#wpmf_foldertree_sync').find('a[data-file="' + dir + '"]').next().slideDown(options_sync.expandSpeed, options_sync.expandEasing);
                $('.dir_name_ftp').val(wpmflangoption.wpmf_root_site + dir);
                setevents_sync();
            }).done(function () {
                //Trigger custom event
                $thisftp.trigger('afteropen');
                $thisftp.trigger('afterupdate');
            });

        }

        closedir_sync = function (dir) {
            $thisftp.find('a[data-file="' + dir + '"]').next().slideUp(options_sync.collapseSpeed, options_sync.collapseEasing, function () {
                $(this).remove();
            });
            $thisftp.find('a[data-file="' + dir + '"]').parent().removeClass('expanded').addClass('collapsed');
            $('.dir_name_ftp').val('');
            setevents_sync();

            //Trigger custom event
            $thisftp.trigger('afterclose');
            $thisftp.trigger('afterupdate');

        }

        setevents_sync = function () {
            $thisftp = $('#wpmf_foldertree_sync');
            $thisftp.find('li a').unbind('click');
            //Bind userdefined function on click an element
            $thisftp.find('li a').bind('click', function () {
                options_sync.onclick(this, $(this).attr('data-type'), $(this).attr('data-file'));
                if (options_sync.canselect) {
                    $thisftp.find('li').removeClass('selected');
                    $(this).parent().addClass('selected');
                }
                return false;
            });

            //Bind for collapse or expand elements
            $thisftp.find('li.directory.collapsed a').bind('click', function () {
                methods_sync.open_sync($(this).attr('data-file'));
                return false;
            });
            $thisftp.find('li.directory.expanded a').bind('click', function () {
                methods_sync.close_sync($(this).attr('data-file'));
                return false;
            });
        }

        $.fn.jaofiletreesync = function (method) {
            // Method calling logic
            if (methods_sync[method]) {
                return methods_sync[ method ].apply(this, Array.prototype.slice.call(arguments, 1));
            } else if (typeof method === 'object' || !method) {
                return methods_sync.init_sync.apply(this, arguments);
            } else {
                //error
            }
        };
    });
})(jQuery);