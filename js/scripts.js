$(function(){
        jQuery(document).ready(function(){ jQuery('input[placeholder], textarea[placeholder]').placeholder(); });

        $(".bl_top_fix .bl_wrap_2 .bl_city_sel select").selectBox();
       // console.log($('.bl_left_fixed .bl_poisk input[type="text"]').focus());
        $('.bl_left_fixed .bl_poisk input').bind("focus", function(){
                $(this).parents(".bl_poisk").addClass("active");

        });
        $('.bl_left_fixed .bl_poisk .close_sub').bind("click", function(){
                $(this).parents(".bl_poisk").removeClass("active");
                $(this).parents(".bl_poisk").find('input[type="text"]').val("");
        });
        $(window).load(function(){
           var $win_height = $(window).height();
           var $bl_menu_left_height = $(".bl_left_fixed .bl_menu_left").height();
           if($win_height >= ($bl_menu_left_height + 183)) {
               var $bl_dop_height =  $win_height - ($bl_menu_left_height + 183);
               $(".bl_left_fixed .bl_dop_height").height($bl_dop_height).addClass("active");
           } else {
                  var $new_hei = $win_height - 183;
                   $(".bl_left_fixed .bl_menu_left").height($new_hei);
               $(".bl_left_fixed .bl_menu_left").jScrollPane({
                   showArrows: true,
                   verticalDragMaxWidth: 19,
                   verticalDragMaxHeight: 15
               });
           }
                $(".slayder_main").flexslider({
                        animation: "fade",
                        slideshow: true,
                        slideshowSpeed: 100000000000,
                        pauseOnAction: false,
                        pauseOnHover: false,
                        controlNav: true
                });

            $(".bl_novelty .novelty_slayder").sliderScroll({
                //itemWidth: 81,
                //space: 3,
                visible: 1,
                append: ".bl_novelty .bl_links_right .link_arrow"
            });

            var $window_width = $(window).width() - 293;
            var $window_width2 = Math.floor($window_width / 275);
            $(".bl_novelty .novelty_slayder").width($window_width2 * 275);



        });


});


