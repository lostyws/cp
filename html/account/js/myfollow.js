/**
 * 我定制的
 */
Class({
	ready: true,
	 index:function (config){
		 var html="";
			for (var i=0; i<$_sys.lottype.length;i++){
				html+="<OPTGROUP label=\""+$_sys.lottype[i][0]+"\" id=\""+$_sys.lottype[i][1]+"\">";
				var tmp=$_sys.lottype[i][2].split(",");
				for (var j=0; j<tmp.length;j++){
					html+="<OPTION value="+tmp[j]+" >"+$_sys.getlotname(tmp[j]).replace("北京单场-","").replace("竞彩足球-","").replace("竞彩篮球-","")+"</OPTION>";
				}
				html+="</OPTGROUP>";
			}
			$("#lotid").append(html);
		this.submitbind();
		Y.C('logininfo',this.showinfo);
	    Y.C('logoutinfo',this.logoutinfo);
	    this.LoginAcc();
	 },
	 logoutinfo:function(){
	   location="/";
	 },
    showinfo:function(){
    	P.getlist("",1,10,0,0);
	},
	 submitbind:function(){
	    	P=this;
	    	this.get('#submit').click(function() { 
	    		var pn = 1;// 页码
    			var ps = 15;// 页面大小
    			var tp = 0;// 总页数
    			var tr = 0;// 总记录数
	    			var ps = $("input[name='pages']:checked").val();// 页面大小
	    			$("#page_div").hide();
	    			P.getlist(($("#lotid").val()||0),1, ps, 0, 0);
	    		});
	    	
	  },
	  
	  showpageno : function(lotid,pn,ps,tp,tr){	
			var pagehtml='<a class="a1" style="margin-right:5px" onclick="getlist(\''+lotid+'\', 1,'+ps+','+tp+','+ tr+');"  href="javascript:void(0)">首页</A>'+ 
		    	'<a class="a2" style="margin-right:5px" title="上一页 " onclick="getlist(\''+lotid+'\','+(pn-1>0?(pn-1):1)+','+ps+','+tp+','+ tr+');" href="javascript:void(0)">上一页</A>';
			pagehtml+='<span class="ac">第<INPUT onkeydown="if(event.keyCode==13){getlist(\''+lotid+'\',Y.getInt(this.value),'+ps+','+tp+','+ tr+');return false;}" id=govalue class="ac" onkeyup="this.value=this.value.replace(/[^\\d]/g,\'\');if(this.value>'+tp+')this.value='+tp+';if(this.value<=0)this.value=1"  name=page>页</span><a class="go" href="#" onclick="getlist(\''+lotid+'\',Y.getInt($(\'#govalue\').val()),'+ps+','+tp+','+ tr+');"></a><span class="gy">共'+tp+'页，'+tr+'条记录</span><a class="a2" style="margin-left:10px" onclick="getlist(\''+lotid+'\','+(pn+1>tp?tp:(pn+1))+','+ps+','+tp+','+ tr+');"  href="javascript:void(0)">下一页</a><a class="a1" style="margin-left:5px" onclick="getlist(\''+lotid+'\','+tp+','+ps+','+tp+','+ tr+');" href="javascript:void(0)">尾页</a>';
			pagehtml += '<div class="mtxs">每条显示 <input type="radio" name="pages" value="10" checked="checked" />10条<input type="radio" name="pages" value="50"  />50条</div>';
			$('.pagination').html(pagehtml);
		},
	 
	 showlist : function( pn, ps, tp, tr){
	   	P=this;
	    P.getlist(($("#lotid").val()||0),pn, ps, tp, tr);
	  },

	  getlist : function(gid, pn, ps, tp, tr) {// 页码 页面大小 总页数 总记录数
		P=this;
		Y.get("#nocount").show();
		$("#touzhulist").html();
	  	var data = "";
	  	tp=0;

	  	if (gid == 0 || gid == undefined) {

	  	} else {
	  		data += "&" + $_user.key.gid + "=" + ("0"+gid).substr(("0"+gid).length-2);
	  	}
	  	data += "&" + $_user.key.pn + "=" + pn;
	  	data += "&" + $_user.key.ps + "=" + ps;
	  	data += "&" + $_user.key.tp + "=" + tp;
	  	data += "&" + $_user.key.tr + "=" + tr;
	  	data += "&" + $_user.key.qtype + "=" + $("#qtype").val();
	  	Y.get("#nocount").hide();
	  	$("#touzhulist").hide();
	    var html = "";

	  	Y.ajax({
	  		url : $_user.url.myfollow,
	  		type : "POST",
	  		dataType : "json",
	  		data : data,
	  		end  : function (d){
				var obj = eval("(" + d.text + ")");
	   		    var code = obj.Resp.code;
	   		    var desc = obj.Resp.desc;
	  			var innum = incount = outnum = outcount = 0;
	  			rows = "";
	  			if (code == "0") {
	  				var r = obj.Resp.row;
					var rs = obj.Resp.count;
					tr=Y.getInt(rs.rc);
					tp=Y.getInt(rs.tp);
					ps=Y.getInt(rs.ps);
					pn=Y.getInt(rs.pn);
	  				if (tr % ps == 0) {
	  					tp = tr / ps;
	  				} else {
	  					tp = Math.ceil(tr / ps);
	  				}
	  				if(tr==0){
						Y.get("#nocount").show();
						$("#touzhulist").html("");
						Y.get("#page_div").hide();
					}else{
						Y.get("#nocount").hide();
						var s=Y.get("#lotid").val();
						if(s<10){s="0"+s}
						if(!this.isArray(r)){r=new Array(r);}
						var lx=1;
						r.each(function(rt,o) {
		  					var rec = rt.rec;
		  					var nickid = rt.nickid;
		  					var gameid = rt.gameid;
		  					var owner = rt.owner;
		  					var state = rt.state;
		  					var limit = rt.limit;
		  					var minmoney = rt.minmoney;
		  					var maxmoney = rt.maxmoney;
		  					var adddate = rt.adddate;
		  					var bmoney = rt.bmoney;
		  					var nums = rt.nums;
		  					var tmoney = rt.tmoney;
		  					var itype = rt.itype;
		  					var rate = rt.rate;
		  					html += "<tr>";
		  					html += " <td>"+owner+"</td>";
		  					html += " <td>"+$_sys.getlotname(gameid)+"</td>";
		  					if(itype==0){
								html += "  <td><span class=\"cm_red\">"
										+ parseFloat(bmoney).rmb(false)
										+ "</span>元</td>";
							}else{
							html += "  <td><span class=\"cm_red\">"
									+ parseFloat(rate).rmb(false)
									+ "</span>%</td>";
							}
		  					html += " <td>"+nums+"</li>";
		  					html += " <td><span class=\"cm_red\">"
		  						+ parseFloat(tmoney).rmb(false)
		  						+ "</span>元 </td>";
		  					if ( state == 0 ) {
		  						html += " <td>"+adddate+"</td>";
		  						html += ' <td><a href="javascript:void(0);" class="a1" onclick="setstate(\'' + gameid + '\',\'' + owner + '\');">禁用</a> | <a class="a1" href="javascript:void(0);" onclick="$_sys.autobuy(\''+gameid+'\',\''+owner+'\')">修改</a></td>';
		  					} else {
		  						html += " <td>"+adddate+"</td>";
		  						html += ' <td><a href="javascript:void(0);" class="a1" onclick="setstate(\'' + gameid + '\',\'' + owner + '\');">启用</a></td>';
		  					}
		  					html += " </tr>";
		  				});
						$("#touzhulist").html(html);
	  					P.showpageno(gid,pn,ps,tp,tr);
	  					$("#nocount").hide();
						$("#touzhulist").html(html);	
						
						var fn="P.showlist";
						var maxshow=5;
						var pagehtml='<ul><li style="line-height:27px;color:#444;padding-right:10px">共'+tr+'条</li><li class="disabled PagedList-skipToFirst"  ><a onclick=\"' + fn + '(1,'+ps+','+tp+','+tr+');\"  href="javascript:void(0)" >首页</a></li>';
						pagehtml += '<li class="PagedList-skipToNext"><a onclick=\"' + fn + '('+(pn-1>0?(pn-1):1)+','+ps+','+tp+','+tr+');\" href="javascript:void(0)">上一页</a></li>';
						var min=0;
						var max=0;
						
						if (tp > maxshow){
						var pageTemp=parseInt(pn*1/maxshow);

						
						max = pageTemp*maxshow+maxshow;
						min = pageTemp*maxshow;
						
						if(max>tp){
						max=tp;
						}
						if(pn>min){min=min+1;}
						}else{
						min = 1;
						max = tp;
						}
						

						
						for (var i=min;i<max*1+1;i++){
						if (i==pn){
						pagehtml+='<li class="active"><a href="javascript:void(0);" id="'+i+'" class="a4" onclick=\"' + fn + '('+i+','+ps+','+tp+','+tr+');">' + i + '</a></li>';
						}else{
							pagehtml+='<li><a href="javascript:void(0);" id="'+i+'" class="a3" onclick=\"' + fn + '('+i+','+ps+','+tp+','+tr+');">' + i + '</a></li>';
						}
						}
//						showjoin(\''+lotid+'\',\''+projid+'\','+ps+','+(pn+1>tp?tp:(pn+1))+')
						
						pagehtml+='<li class="PagedList-skipToNext"><a onclick=\"' + fn + '('+(pn+1>tp?tp:(pn+1))+','+ps+','+tp+','+tr+');\"  href="javascript:void(0)">下一页</a></li>';
						pagehtml+='<li class="disabled PagedList-skipToNext"><a onclick=\"'+ fn+'(' +tp+','+ps+','+tp+','+ tr+');" href="javascript:void(0)"> 末页</a></li><ul>';
						$("#page_div").html(pagehtml);
						
						
						
						
						
						
//						var maxshow=5;
//						
//						var pagehtml='<a class="a1" style="margin-right:5px" onclick=\"' + fn + '(1,'+ps+','+tp+','+tr+');\"  href="javascript:void(0)"">首页</A>';
//						pagehtml += '<a class="a2" style="margin-right:5px" title="上一页 " onclick=\"' + fn + '('+i+','+ps+','+tp+','+tr+');\" href="javascript:void(0)">上一页</A>';
//						var min=0;
//						var max=0;
//						if ( tp > maxshow){
//						var pageTemp=parseInt(pn*1/maxshow);
//						max = pageTemp*maxshow+maxshow;
//						min = pageTemp*maxshow;
//						
//						if(max> tp){
//						max= tp;
//						}
//						if(pn>min){
//							min=min+1;
//						}
//
//						}else{
//						min = 1;
//						max = tp;
//						}
//						for (var i=min;i<max*1+1;i++){
//						if (i==pn){
//							pagehtml+='<a href="javascript:void(0);" id="'+i+'" class="a4" onclick=\"' + fn + '('+i+','+ps+','+tp+','+tr+');\">' + i + '</a>';
//						}else{
//							pagehtml+='<a href="javascript:void(0);" id="'+i+'" class="a3" onclick=\"' + fn + '('+i+','+ps+','+tp+','+tr+');\">' + i + '</a>';
//						}
//						}
//						pagehtml+='<span class="ac">第<INPUT onkeydown="if(event.keyCode==13){page(Y.getInt(this.value));return false;}" id=govalue class="ac" onkeyup="this.value=this.value.replace(/[^\\d]/g,\'\');if(this.value>'+tp+')this.value='+tp+';if(this.value<=0)this.value=1"  name=page>页</span><a class="go"
//						href="#" onclick=\"' + fn + '(Y.getInt($(\'#govalue\').val()),'+ps+','+tp+','+tr+');\"></a><a class="a2" style="margin-left:10px" onclick=\"' + fn + '('+(pn+1>tp?tp:(pn+1))+','+ps+','+tp+','+tr+');\"  href="javascript:void(0)">下一页</a><a class="a1" style="margin-left:5px" onclick=\"' + fn + '('+tp+','+ps+','+tp+','+tr+');\" href="javascript:void(0)">尾页</a><span class="gy">共'+tp+'页，'+tr+'条记录</span>';
						$("#page_div").html(pagehtml);
					   
					    if(pn==min&&min-maxshow>0){
					    	
					    	$("#"+pn+"").click(function(){
					    		P.showlist(pn-maxshow>=0?(pn-maxshow):maxshow,ps,tp,tr);
					    	});
					    	}else if(min-maxshow==0){
					    	$("#"+pn+"").click(function(){
					    		P.showlist(1,ps,tp,tr);
					    	});
					    	} ;
//					    $("#govalue").val(pn);
						
						
//						var pagehtml='<a href="javascript:void(0);" class="a1" style="margin-right:5px" onclick=\"' + fn + '(1,'+ps+','+tp+','+tr+');\">首页</a>'+
//						' <a href="javascript:void(0);" class="a2" style="margin-right:5px" onclick=\"' + fn + '('+(pn-1>0?(pn-1):1)+','+ps+','+tp+','+tr+');\">上一页</a>'+
//						' <a href="javascript:void(0);" class="a2" style="margin-left:10px" onclick=\"' + fn + '('+(pn+1>tp?tp:(pn+1))+','+ps+','+tp+','+tr+');\">下一页</a>'+
//						' <a href="javascript:void(0);" class="a1" style="margin-left:5px" onclick=\"' + fn + '('+tp+','+ps+','+tp+','+tr+');\">尾页</a>'+
//						' <span><input type="text"  name="n_page" id="n_page"/><a href="javascript:void(0);" class="a1" style="margin-left:5px"  onclick=\"' + fn + '(Y.getInt($(\'#n_page\').val()),'+ps+','+tp+','+tr+');\">跳转</a>共'+tp+'页，'+tr+'条记录</span>';
						
						$("#touzhulist").show();
						$("#page_div").show();
						
					}
	  			} else {
	  				if (code=="1"){
						Y.postMsg('msg_login', function() {						
							window.location.reload();			
						});
					}else{
						$("#touzhulist").html(html);
						Y.get("#nocount").hide();
						$("#page_div").hide();

					}
	  			}
	  		},
	  		error : function() {
	  			Y.alert("您所请求的页面有异常！");
	  			return false;
	  		}
	  	 });
	  	}
});
var setstate = function(gid,owner) {
	var data = "gid=" + gid + "&owner=" + owner ;
	Y.ajax({
		url : $_user.modify.autostate,
		type : "POST",
		dataType : "json",
		data : data,
		end  : function (d){
			var obj = eval("(" + d.text + ")");
   		    var code = obj.Resp.code;
   		    var desc = obj.Resp.desc;
			if (code == "0") {
				Y.alert(desc);
				window.location.reload();
			} else {
				Y.alert(desc);
			}
		},
		error : function() {
			Y.alert("您所请求的页面有异常！");
			return false;
		}
	});
};

