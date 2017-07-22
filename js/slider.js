(function($){
    $.fn.sliderScroll = function(options){
        var options = $.extend({
            visible: 1,
            space:0,
            itemWidth: 70,
            start:0,
            append: "this"
        }, options);
        
        var $this = this;
        //console.log($this);
        
        return this.each(
            function(){
                
                var items = [], viewport = $('div', $this), overview = $(this).find(".slides"), arrows = '<div class="buttons"><a href="#" class="prev"></a><a href="#" class="next"></a></div>', allWidth;

                //console.log(overview);

                
                
                
                $(this).find('.slides > li').each(function(){
                    items.push($(this));
                });
                
                options.itemWidth = $(this).find('.slides > li').outerWidth();
                
                options.visible = Math.round(overview.parent().width() / options.itemWidth -1 );
                //console.log(options.visible);
                
                allWidth = (items.length * options.itemWidth) + (items.length * options.space) + options.itemWidth; 
                //console.log(allWidth);
                overview.width(allWidth);
                //console.log(overview);
                //console.log(options.visible)
                if(items.length){

                    $(options.append).append(arrows);

                    var arrow = $(options.append).find(".buttons a");
                    //console.log();
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



                }
            }
        );
    }
})(jQuery);