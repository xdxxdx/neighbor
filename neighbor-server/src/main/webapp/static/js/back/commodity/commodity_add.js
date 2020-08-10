$(function() {
	var initClass = $('#classId').find('option').eq(0).val();
	var intiCid = initClass.split(',')[0];
	var intiCname = initClass.split(',')[1];
	$('#sndclassId').attr('tp', intiCid);
	$.ajax({
		type : 'get',
		url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
				+ intiCid,
		dataType : 'json',
		success : function(json) {
			$('#sndclassId option').remove();
			$('#sndclassId').append(
					'<option value="' + intiCid + ',' + intiCname + '">'
							+ intiCname + '</option>');
			for ( var ci in json.classList) {
				var option = '<option value="'
						+ json.classList[ci].commodityClassId + ','
						+ json.classList[ci].commodityClassName + '">|-'
						+ json.classList[ci].commodityClassName + '</option>';
				$('#sndclassId').append(option);
			}

		}
	});

	$('#classId')
			.change(
					function() {
						var v = $(this).val();
						var cid = v.split(',')[0];
						var cname = v.split(',')[1];
						$
								.ajax({
									type : 'get',
									url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
											+ cid,
									dataType : 'json',
									success : function(json) {
										$('#sndclassId option').remove();
										$('#sndclassId').attr('tp', cid);
										$('#sndclassId').append(
												'<option value="' + cid + ','
														+ cname + '" temp="1">'
														+ cname + '</option>');
										for ( var ci in json.classList) {
											var option = '<option value="'
													+ json.classList[ci].commodityClassId
													+ ','
													+ json.classList[ci].commodityClassName
													+ '">|-'
													+ json.classList[ci].commodityClassName
													+ '</option>';
											$('#sndclassId').append(option);
										}

										var vt = $('#sndclassId')
												.find('option').eq(0).val();
										var cidt = vt.split(',')[0];
										var cnamet = vt.split(',')[1];
										$('#trdclassId option').remove();
										$('#trdclassId').append(
												'<option value="' + cidt + ','
														+ cnamet + '">'
														+ cnamet + '</option>');
										$
												.ajax({
													type : 'get',
													url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
															+ cidt,
													dataType : 'json',
													success : function(json) {
														$('#trdclassId option')
																.remove();
														$('#trdclassId')
																.append(
																		'<option value="'
																				+ cidt
																				+ ','
																				+ cnamet
																				+ '">'
																				+ cnamet
																				+ '</option>');
														for ( var ct in json.classList) {
															var option = '<option value="'
																	+ json.classList[ct].commodityClassId
																	+ ','
																	+ json.classList[ct].commodityClassName
																	+ '">|-'
																	+ json.classList[ct].commodityClassName
																	+ '</option>';
															$('#trdclassId')
																	.append(
																			option);
														}
													}
												})
									}
								})

					});

	$('#sndclassId')
			.change(
					function() {
						var v = $(this).val();
						var cid = v.split(',')[0];
						var cname = v.split(',')[1];
						if ($(this).attr('tp') == cid) {
							$('#trdclassId option').remove();
							$('#trdclassId').append(
									'<option value="' + cid + ',' + cname
											+ '">' + cname + '</option>');
							return false;
						}

						$('#trdclassId option').remove();
						$('#trdclassId').append(
								'<option value="' + cid + ',' + cname + '">'
										+ cname + '</option>');
						$.ajax({
									type : 'get',
									url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
											+ cid,
									dataType : 'json',
									success : function(json) {
										$('#trdclassId option').remove();
										$('#trdclassId').append(
												'<option value="' + cid + ','
														+ cname + '">' + cname
														+ '</option>');
										for ( var ci in json.classList) {
											var option = '<option value="'
													+ json.classList[ci].commodityClassId
													+ ','
													+ json.classList[ci].commodityClassName
													+ '">|-'
													+ json.classList[ci].commodityClassName
													+ '</option>';
											$('#trdclassId').append(option);
										}
									}
								})

					})
	$("#thisForm").validate({
		ignore : ".fileimg",
		onkeyup : function(element) {
			$(element).valid();
		},
		errorElement : "label",
		errorPlacement : function(error, element) {
			element.addClass('invalid-text');
			error.appendTo(element.parent());
		},
		success : function(label) {
			label.addClass("valid").append('&nbsp;');
			label.parent().find('*:first').removeClass('invalid-text');
			label.parent().find('*:first').addClass('valid-text');
		},

	});
	$("#submit1")
			.click(
					function() {
						if ($("#thisForm").valid()) {
							var specId = [];
							var spcenamepush = [];
							var price = [];
							var promotionPrice = [];
							var barCode = [];
							$('.specId').each(function() {
								specId.push($(this).val())
							});
							$('.specNameM').each(function() {
								spcenamepush.push($(this).val())
							});
							$('.priceM').each(function() {
								price.push($(this).val())
							});
							$('.promotionPriceM').each(function() {
								promotionPrice.push($(this).val())
							});
							$('.barCode').each(function() {
								barCode.push($(this).val())
							});
							var specjson = '[';
							var jsonlen = spcenamepush.length;
							for (var i = 0; i < jsonlen; i++) {
								if (promotionPrice[i] != '') {
									specjson = specjson + '{"specId":"'
											+ specId[i] + '","specName":"'
											+ spcenamepush[i] + '","price":"'
											+ price[i] + '","promotionPrice":"'
											+ promotionPrice[i]
											+ '","barCode":"' + barCode[i]
											+ '"},';
								}
							}
							specjson = specjson + ']';
							specjson = specjson.replace(',]', ']');
							$('#specJ')
									.val(
											specjson
													.replace(
															'{"specId":"","specName":"","price":"","promotionPrice":"","barCode":""}',
															''));
							// console.log($('.fileimg').val());
							if ($('#specJ').val() == '[]') {
								alert('请至少填写一种规格,且规格的价格项请填写数字');
								return false;
							}
							if ($('.fileimg').val() == '') {
								// if (confirm('亲！完善的商品信息可以吸引更多买家购买哦！\r
								// 还有不少商品信息没有填写是否继续提交。\r 点击“是”，继续提交，按“否”则返回修改'))
								// {
								// //alert('yes')
								// } else {
								// return false
								// }
							}
							if (specjson == '[{"specId":"","specName":"","price":"","promotionPrice":"","barCode":""}]') {
								alert('请至少填写一种规格,且规格的价格项请填写数字')
							} else {
								$.ajax({
									type : 'post',
									url : './save',
									cache : false,
									data : new FormData($('#thisForm')[0]),
									processData : false,
									contentType : false,
									dataType : 'html',
									success : function(data) {
										if (data > 0) {
											alert("成功");
//											document.getElementById("thisForm")
//													.reset();// 清空表单
											location.href="./home";
										} else {
											alert("失败，请联系技术人员");
										}
									}
								});
							}
						}
					});

});
