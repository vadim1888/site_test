(function($){
    $.fn.sliderScroll2 = function(options){
        var options = $.extend({
            visible: 1,
            space:0,
            itemWidth: 70,
            start:0
        }, options);
        
        var $this = this;
        //console.log($this);
        
        return this.each(
            function(){
                
                var items = [], viewport = $('div', $this), overview = $(this).find(".slides"), arrows = '<div class="buttons"><div class="carousel-button-left"><a href="#" class="prev"></a></div><div class="carousel-button-right"><a href="#" class="next"></a></div></div>', allWidth;

                //console.log(overview);

                
                
                
                $(this).find('.slides > li').each(function(){
                    items.push($(this));
                });
                
                options.itemWidth = $(this).find('.slides > li').outerWidth();
                
                options.visible = Math.round(overview.parent().width() / options.itemWidth );
                //console.log(options.visible);
                
                allWidth = (items.length * options.itemWidth) + (items.length * options.space) + options.itemWidth; 
                //console.log(allWidth);
                overview.width(allWidth);
                //console.log(overview);
                
                if(items.length > options.visible){
                    $this.append(arrows);
                    
                    var arrow = $('.buttons a', this);
                    //console.log(arrow);
                    arrow.click(function(e){
                        e.preventDefault();
                        var goTo;
                        overview.stop();
                        //console.log(options.start);
                        var $data = $(this).hasClass("prev") ? 0 : items.length - options.visible;
                        //console.log($data);
                        options.start = $(this).hasClass("prev") ? options.start-1 : options.start+1;
                        //console.log(options.start);
                        options.start = typeof items[options.start] === "undefined" || typeof items[(options.start-1) + options.visible] === "undefined" ? $data : options.start;         //console.log(items[options.start-1]);
                        goTo = -((options.itemWidth+options.space) * options.start);
                        overview.animate({"margin-left": goTo});
                        //console.log(goTo);
                    });

                    $(function() {
//Раскомментируйте строку ниже, чтобы включить автоматическую прокрутку карусели
	auto_right('.bl_product_widget .bl_center .dop_wrap > ul.slides:first');
                    });

                    // Автоматическая прокрутка
                    function auto_right(carusel){
                        setInterval(function(){
                            if (!$(".bl_product_widget").is('.hover')) {
                                var goTo;
                                overview.stop();
                                //console.log(options.start);
                                //var $data = $(this).hasClass("prev") ? 0 : items.length - options.visible;
                                //console.log($data);
                                options.start = $(this).hasClass("hover") ? options.start - 1 : options.start + 1;
                                //console.log(options.start);
                                options.start = typeof items[options.start] === "undefined" || typeof items[(options.start - 1) + options.visible] === "undefined" ? 0 : options.start;         //console.log(items[options.start-1]);
                                goTo = -((options.itemWidth + options.space) * options.start);
                                overview.animate({"margin-left": goTo}, 1000,  "linear");
                            }
                        }, 3000)

                    }
// Навели курсор на карусель
                    $(document).on('mouseenter', '.bl_product_widget', function(){$(this).addClass('hover')})
//Убрали курсор с карусели
                    $(document).on('mouseleave', '.bl_product_widget', function(){$(this).removeClass('hover')})


                }
            }
        );
    }
})(jQuery);