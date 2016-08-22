			window.onload=function ajRecommend(){
				function onload(){
				$.ajax({
		             type: "GET",
		             url: "/SuperCell-ELM-A/merchantmanage/getLowRating.do",
		             data: "",
		             success: function(data){
		             	$('#tbodyId2').html('')
		             	console.log(data)
		             	var merchantRating=""
		             	console.log(data.length)
		            	for(var i=0;i<data.length;i++){
	                      merchantRating+="<tr><td>"+data[i].merchantId+"</td><td>"+data[i].rating+"</td>"
	                      if(data[i].merchantState=='1'){
	                      	merchantRating+="<td>审核通过</td>"+"<td><input type='button' class='btn btn-danger' onclick='AsUpdate("+data[i].merchantId+",4);' value='加入到黑名单'></td></tr>"
		            	}
		            	  if(data[i].merchantState=='4'){
	                      	merchantRating+="<td>已拉黑</td>"+"<td><input type='button' class='btn btn-success' onclick='AsUpdate("+data[i].merchantId+",1);' value='恢复正常''></td></tr>"
		            	}
		            }
		            	$('#tbodyId2').append(merchantRating)
		                      },
		             error: function(data){
	//		            	 alert("推荐失败");
		            	 var datas = JSON.stringify(data);
		            	 console.log("!!!!"+datas);
		             }
		         });
		}
				onload();
				
			}
		 
			function AsUpdate(id,state){
				
					$.ajax({
		             type: "GET",
		             url: "/SuperCell-ELM-A/merchantmanage/changestates.do?merchantId="+id+"&merchantState="+state,
		             success: function(){
		             	onload();
                      },
		             error: function(data){
//		            	 alert("推荐失败");
		            	 var datas = JSON.stringify(data);
		            	 console.log("!!!!"+datas);
		             }
		         });
			}
