			
			window.onload=function ajRecommend(){
				var urlParm=window.location.search.substr(1)
				console.log(urlParm)
				var merchentlist=urlParm.split("&")
				var merchentId=(merchentlist[0].split("="))[1]
				console.log(merchentId)
				var merchentstate=(merchentlist[1].split("="))[1]
				console.log(merchentstate)
				$.ajax({
		             type: "GET",
		             url: "/SuperCell-ELM-A/merchantmanage/getinfo.do?merchantId="+merchentId,
		             
		             success: function(data){	
		              var result = JSON.parse(data)
		             // alert(result)
		              // console.log(data.length)	 	    
		              console.log(result.phoneNumber) 
		              $("#imgCardPicPath").attr("src","http://10.222.232.34:8080/SuperCell-ELM-M/pic/pic.do/"+result.idCardPicPath) 
		              $("#imglicensePicPath").attr("src","http://10.222.232.34:8080/SuperCell-ELM-M/pic/pic.do/"+result.licensePicPath)
		              $("#imgshopPicPath").attr("src",src="http://10.222.232.34:8080/SuperCell-ELM-M/pic/pic.do/"+result.shopPicPath)   	
		            	var merchantr=""		            	
		                merchantr+="<td>"+result.shopName+"</td><td>"+result.address+"</td><td>"+result.phoneNumber+"</td><td>"+result.numberOfOrders+"</td>"
		                merchantr+="<td><a data-toggle='modal' data-target='#idCardModal' href='#'>查看</a></td>"+"<td><a data-toggle='modal' data-target='#licenseModal' href='#'>查看</a></td>"+"<td><a data-toggle='modal' data-target='#shopModal' href='#'>查看</a></td>"
		                if(merchentstate=='1'){
		                merchantr+="<td><a href='/SuperCell-ELM-A/merchantmanage/changestates.do?merchantId="+result.id+"&merchantState=4'><button class='btn btn-danger'>拉黑</button></a></td>"
		                }
		                if(merchentstate==2){
		                	merchantr+="<td><a href='/SuperCell-ELM-A/merchantmanage/changestates.do?merchantId="+result.id+"&merchantState=1'><button class='btn btn-success'>审核通过</button></a>"+
							"<a href='/SuperCell-ELM-A/merchantmanage/changestates.do?merchantId="+result.id+"&merchantState=3'><button class='btn btn-danger'>审核不通过</button></a></td>"
		                }
		                if(merchentstate== '3'){
		                	merchantr+="<td><a href='/SuperCell-ELM-A/merchantmanage/changestates.do?merchantId="+result.id+"&merchantState=2'><button class='btn btn-info'>重新审核</button></a></td>"
		                }
		                if(merchentstate=='4'){
		                	merchantr+="<td><a href='/SuperCell-ELM-A/merchantmanage/changestates.do?merchantId="+result.id+"&merchantState=1'><button class='btn btn-default'>恢复正常</button></a></td>"
		                	
		                }
		                $('#trId').append(merchantr);
		                      },
		             error: function(data){
//		            	 alert("推荐失败");
		            	 var datas = JSON.stringify(data);
		            	 console.log("!!!!"+datas);
		             }
		         });
			}