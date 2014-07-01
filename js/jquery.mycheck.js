/*
 * Jquery.MyCheck
 * Create by Santiago Chen
 * Email: santiago1209@foxmail.com
 * Version: 0.0.1
 *
 *
 * Parameters:
 * skinClass : green/black/
 * onChangeEvt
 * onEnterEvt
 * onLeaveEvt
 * 
 */

(function($){

'use strict';

var opts, onChangeEvtHandler, rdlists, cblists;

$.fn.MyCheck = function (optional){	
	
	var _default = {
		skinClass : 'black',
		onChangeEvt : function (e, data) {},
		onEnterEvt : function (e, data) {},
		onLeaveEvt : function (e, data) {}
	};
	
	opts = $.extend({},_default,optional);
	cblists = []; rdlists ={}; //reset it every time, for the later return : (cblists.length>0)?cblists:rdlists;
	return MyFactory($(this));

}

function MyFactory(t){
	
	for(var i=0; i<t.length; i++){
		
		switch(t[i].type){
			case "radio":
			var content = new MyRadio(t[i]);
			if(rdlists[t[i].name]){rdlists[t[i].name].push(content)}
			else {rdlists[t[i].name]=[content]}
			//rdlists.push(content);
			break;
			default:
			var content = new MyCheckBox(t[i]);	
			cblists.push(content);
			break;
		}
	}

	return (cblists.length>0)?cblists:rdlists;
}


/*============MyCheckBox=============*/
/*============Customize the checkbox=============*/

function MyCheckBox(target){
	this.target = target;

	this.active = opts.active; //is false as default;
	
	this.skinname = 'mycheck-cb-flat-'+opts.skinClass;
	
	var  _self = this;
	
	this.wrap = $('<span></span>').addClass(_self.skinname);

	
	if($(this.target).is(":checked")){ this.wrap.addClass(this.skinname+"-active");}

	this.wrap.click(function(e){
		
		e.preventDefault();

		$(this).toggleClass((_self.skinname+"-active"));
		
		_self.active = _self.active? false:true;
		
		var datas = {
			data : $(this),
			active : _self.active 
		}

		_self.wrap.trigger("changeEvt:cb", datas);

	});


	this.wrap.mouseenter(function(e){
		
		e.preventDefault();

		$(this).addClass((_self.skinname+"-hover"));
		
		var datas = {
			data : $(this),
			hover : true
		}

		_self.wrap.trigger("enterEvt:cb", datas);

	});

	this.wrap.mouseout(function(e){
		
		e.preventDefault();

		$(this).removeClass((_self.skinname+"-hover"));
		
		var datas = {
			data : $(this),
			hover : false
		}

		_self.wrap.trigger("leaveEvt:cb", datas);

	});


	this._dom = $(target).wrap(this.wrap);

	$(target).hide();

	this.wrap.on("changeEvt:cb", opts.onChangeEvt);
	this.wrap.on("enterEvt:cb", opts.onEnterEvt);
	this.wrap.on("leaveEvt:cb", opts.onLeaveEvt);

}

MyCheckBox.prototype.beactive = function () {
	
	this._dom.parent().addClass(this.skinname+"-active");

	this.active = true;
	
} 
MyCheckBox.prototype.beinactive = function () {
	
	this._dom.parent().removeClass(this.skinname+"-active");
	
	this.active = false;

}


/*===========MyRadio============*/
/*============Customize the radio button=============*/

function MyRadio(target){
	this.target =  target;

	this.active = opts.active; //is false as default;
	
	this.skinname = 'mycheck-rd-flat-'+opts.skinClass;
	
	var  _self = this;
	
	this.wrap = $('<span></span>').addClass(this.skinname).attr('data-grp',this.target.name);

	if($(this.target).is(":checked")){this.wrap.addClass(this.skinname+"-active");}

	this.grpname = ('.'+_self.skinname+':has(input[name="'+_self.target.name+'"])');
	this.activename = ('.'+_self.skinname+'-active:has(input[name="'+_self.target.name+'"])');

	this.wrap.click(function(e){
		
		e.preventDefault();

		if($(_self.activename).length > 0 ) {
			$(_self.activename).removeClass(_self.skinname+"-active");
		}

		$(this).addClass((_self.skinname+"-active"));
		_self.active = true;
		
		var datas = {
			data : $(this),
			active : _self.active 
		}

		_self.wrap.trigger("changeEvt:rd", datas);

	});

	this.wrap.mouseenter(function(e){
		
		e.preventDefault();

		$(this).addClass((_self.skinname+"-hover"));
		
		var datas = {
			data : $(this),
			hover : true
		}

		_self.wrap.trigger("enterEvt:rd", datas);

	});

	this.wrap.mouseout(function(e){
		
		e.preventDefault();

		$(this).removeClass((_self.skinname+"-hover"));
		
		var datas = {
			data : $(this),
			hover : false
		}

		_self.wrap.trigger("leaveEvt:rd", datas);

	});

	this._dom = $(target).wrap(this.wrap);

	$(target).hide();

	this.wrap.on("changeEvt:rd", opts.onChangeEvt);
	this.wrap.on("enterEvt:rd", opts.onEnterEvt);
	this.wrap.on("leaveEvt:rd", opts.onLeaveEvt);

}


MyRadio.prototype.beactive = function () {

	if($(this.activename).length > 0 ) {
		$(this.activename).removeClass(this.skinname+"-active");
	}

	this._dom.parent().addClass(this.skinname+"-active");

	this.active = true;

	var datas = {
		data : $(this),
		active : this.active 
	}

	this.wrap.trigger("changeEvt:rd", datas);
	
} 

})(jQuery);