/************************************************************************
*************************************************************************
@Name :       	QapTcha - jQuery Plugin
@Revison :    	4.2
@Date : 		06/09/2012  - dd/mm/YYYY
@Author:     	 ALPIXEL Agency - (www.myjqueryplugins.com - www.alpixel.fr)
@License :		 Open Source - MIT License : http://www.opensource.org/licenses/mit-license.php

**************************************************************************
*************************************************************************/
jQuery.QapTcha = {
	build : function(options)
	{
        var defaults = {
			txtLock : $('<div>').html('<div class="text">Подвинте стрелку в право</div>'),
			txtUnlock : $('<div>').html('<div class="text">Можно отправить форму.</div>'),
			disabledSubmit : true,
			autoRevert : true,
			PHPfile : 'php/Qaptcha.jquery.php',
			autoSubmit : false,
            language: "ru"
        };

		if(this.length>0)
		return jQuery(this).each(function(i) {
            switch(options.language){
                case "en":{
                    options.txtLock = $('<span>').html('<div class="text">Move the arrow to the right.</div>');
                    options.txtUnlock = $('<span>').html('<div class="text">You can send the form.</div>');
                } break;
                case "uz":{
                    options.txtLock = $('<span>').html('<div class="text">Peredvinte milini ongga.</div>');
                    options.txtUnlock = $('<span>').html('<div class="text">Mumkin jonatmoq shaklni.</div>');
                } break;
            }

			/** Vars **/
			var
				opts = $.extend(defaults, options),
				$this = $(this),
				form = $('form').has($this),
				Clr = jQuery('<div>',{'class':'clr'}),
				bgSlider = jQuery('<div>',{'class':'bgSlider'}),
				Slider = jQuery('<div>',{'class':'Slider'}),
				dopD = jQuery('<div>',{'class':'dop_d'}),
				TxtStatus = jQuery('<div>',{'class':' TxtStatus dropError'}).html(opts.txtLock),
				inputQapTcha = jQuery('<input>',{name:generatePass(32),value:generatePass(7),type:'hidden'});

			/** Disabled submit button **/
			if(opts.disabledSubmit) form.find('input[type=\'submit\']').attr('disabled','disabled');

			/** Construct DOM **/
			
            TxtStatus.appendTo($this);
            bgSlider.appendTo($this);

			//Clr.insertAfter(bgSlider);
			//TxtStatus.insertAfter(Clr);
			inputQapTcha.appendTo($this);
			dopD.appendTo(bgSlider);
            Slider.appendTo(dopD);
			$this.show();

			Slider.draggable({
				revert: function(){
					if(opts.autoRevert)
					{
						if(parseInt(Slider.css("left")) > (bgSlider.width()-Slider.width()-10)) return false;
						else return true;
					}
				},
				containment: bgSlider,
				axis:'x',
				stop: function(event,ui){
					if(ui.position.left > (bgSlider.width()-Slider.width()-10))
					{
						// set the SESSION iQaptcha in PHP file
						$.post(opts.PHPfile,{
							action : 'qaptcha',
							qaptcha_key : inputQapTcha.attr('name')
						},
						function(data) {
							if(!data.error)
							{
								Slider.draggable('disable').css('cursor','default');
								inputQapTcha.val('');
								TxtStatus.html(opts.txtUnlock).addClass('dropSuccess').removeClass('dropError');
								form.find('input[type=\'submit\']').removeAttr('disabled');
								if(opts.autoSubmit) form.find('input[type=\'submit\']').trigger('click');
							}
						},'json');
					}
				}
			});

			function generatePass(nb) {
		        var chars = 'azertyupqsdfghjkmwxcvbn23456789AZERTYUPQSDFGHJKMWXCVBN_-#@';
		        var pass = '';
		        for(i=0;i<nb;i++){
		            var wpos = Math.round(Math.random()*chars.length);
		            pass += chars.substring(wpos,wpos+1);
		        }
		        return pass;
		    }

		});
	}
}; jQuery.fn.QapTcha = jQuery.QapTcha.build;