	$(function() {

		var initClass = $('#classId').val();
		var intiCid = initClass.split(',')[0];
		var intiCname = initClass.split(',')[1];
		$('#sndclassId').attr('tp', intiCid);
		$
				.ajax({
					type : 'get',
					url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
							+ intiCid,
					dataType : 'json',
					success : function(json) {
						var temp = $('#sndclassId').attr('temp');
						if (temp) {
							var tempid = temp.split(',')[0];
							var tempname = temp.split(',')[1];
						}
						$('#sndclassId option').remove();
						$('#sndclassId').append(
								'<option value="'+intiCid + ',' + intiCname + '">'
										+ intiCname + '</option>');
						for ( var ci in json.classList) {
							var select = tempid == json.classList[ci].commodityClassId ? ' selected'
									: '';
							var option = '<option '+select+' value="'+json.classList[ci].commodityClassId + ',' + json.classList[ci].commodityClassName + '">|-'
									+ json.classList[ci].commodityClassName
									+ '</option>';
							$('#sndclassId').append(option);
						}

						var initSecClass = $('#sndclassId').val();
						var intiSecCid = initSecClass.split(',')[0];
						var intiSecCname = initSecClass.split(',')[1];
						$('#trdclassId').attr('tp', intiSecCid);
						$
								.ajax({
									type : 'get',
									url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
											+ intiSecCid,
									dataType : 'json',
									success : function(json) {
										var sectemp = $('#trdclassId').attr(
												'temp');
										if (sectemp) {
											var sectempid = sectemp.split(',')[0];
											var sectempname = sectemp
													.split(',')[1];
										}

										$('#trdclassId option').remove();
										$('#trdclassId').append(
												'<option value="'+intiSecCid + ',' + intiSecCname + '">'
														+ intiSecCname
														+ '</option>');
										for ( var ct in json.classList) {
											var secselect = sectempid == json.classList[ct].commodityClassId ? ' selected'
													: '';
											var option = '<option '+secselect+' value="'+json.classList[ct].commodityClassId + ',' + json.classList[ct].commodityClassName + '">|-'
													+ json.classList[ct].commodityClassName
													+ '</option>';
											$('#trdclassId').append(option);
										}
									}
								})
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
													'<option value="'+cid + ',' + cname + '" temp="1">'
															+ cname
															+ '</option>');
											for ( var ci in json.classList) {
												var option = '<option value="'+json.classList[ci].commodityClassId + ',' + json.classList[ci].commodityClassName + '">|-'
														+ json.classList[ci].commodityClassName
														+ '</option>';
												$('#sndclassId').append(option);
											}

											var vt = $('#sndclassId').find(
													'option').eq(0).val();
											var cidt = vt.split(',')[0];
											var cnamet = vt.split(',')[1];
											$('#trdclassId option').remove();
											$('#trdclassId').append(
													'<option value="'+cidt + ',' + cnamet + '">'
															+ cnamet
															+ '</option>');
											$
													.ajax({
														type : 'get',
														url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
																+ cidt,
														dataType : 'json',
														success : function(json) {
															$(
																	'#trdclassId option')
																	.remove();
															$('#trdclassId')
																	.append(
																			'<option value="'+cidt + ',' + cnamet + '">'
																					+ cnamet
																					+ '</option>');
															for ( var ct in json.classList) {
																var option = '<option value="'+json.classList[ct].commodityClassId + ',' + json.classList[ct].commodityClassName + '">|-'
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
										'<option value="'+cid + ',' + cname + '">'
												+ cname + '</option>');
								return false;
							}

							$('#trdclassId option').remove();
							$('#trdclassId').append(
									'<option value="'+cid + ',' + cname + '">'
											+ cname + '</option>');
							$
									.ajax({
										type : 'get',
										url : '/commodityClass/commodityClassJsonByParentId?parentClassId='
												+ cid,
										dataType : 'json',
										success : function(json) {
											$('#trdclassId option').remove();
											$('#trdclassId').append(
													'<option value="'+cid + ',' + cname + '">'
															+ cname
															+ '</option>');
											for ( var ci in json.classList) {
												var option = '<option value="'+json.classList[ci].commodityClassId + ',' + json.classList[ci].commodityClassName + '">|-'
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
			}
		});

		$('.isdel').click(
			function() {
				var _this = $(this)
				var isdel = _this.attr('isdel');
				var specid = _this.attr('specid');
				$.ajax({
					type : 'get',
					url : '/commodity/specHidden?specId=' + specid
							+ '&isHidden=' + (isdel == 1 ? '0' : '1'),
					dataType : 'html',
					success : function(data) {
						console.log(isdel)
						if (isdel == 1) {
							console.log()
							_this.attr('isdel', '0')
						} else {
							_this.attr('isdel', '1');
						}
					}
				})
			})
		$("#submit1")
				.click(
						function() {
							//alert($("#thisForm").valid())
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
												+ spcenamepush[i]
												+ '","price":"' + price[i]
												+ '","promotionPrice":"'
												+ promotionPrice[i]
												+ '","barCode":"' + barCode[i]
												+ '"},';
									}

								}
								specjson = specjson + ']'
								specjson = specjson.replace(',]', ']');
								console
										.log(specjson
												.replace(
														'{"specId":"","specName":"","price":"","promotionPrice":"","barCode":""}',
														''))
								$('#specJ')
										.val(
												specjson
														.replace(
																'{"specId":"","specName":"","price":"","promotionPrice":"","barCode":""}',
																''));
								console.log($('.fileimg').val());
								if ($('#specJ').val() == '[]') {
									alert('请填写完整的规格信息');
									return false;
								}
								if ($('.fileimg').val() == '') {
//									if (confirm('亲！完善的商品信息可以吸引更多买家购买哦！\r 还有不少商品信息没有填写是否继续提交。\r 点击“是”，继续提交，按“否”则返回修改')) {
//									} else {
//										return false
//									}
								}
								if (specjson == '[{"specId":"","specName":"","price":"","promotionPrice":"","barCode":""}]') {
									alert('请完整填写规格')
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
										} else {
											alert("失败，请联系技术人员");
										}
									}
								});
								}

							}
						});
	});