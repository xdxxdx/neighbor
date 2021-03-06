$(function () {
	var firstLvId=getFirstLvMenu();//一级菜单
	var secondLvId=getSecondLvMenu();//二级菜单
	var thirdLvId=getThirdLvMenu();//三级菜单
	var roleId=1;
	$.ajax({
		type: 'get',
		url:'menuTree?roleId='+roleId,
		dataType:'json',
		success:function(data){
			var menu=null;
			var html=null;
			var childLen=null;
			var child=null;
			var json=data;
			//console.log(json);
			for(var i in json){
				menu=json[i];
				//如果父菜单是该菜单，就展开
				if(menu.id==firstLvId){
					html=$('<li menu-id="'+i+'" class="active treeview "><li>');
				}else{
					html=$('<li menu-id="'+i+'" class="treeview "><li>');
				}
				$(".sidebar .sidebar-menu").append(html);
				html=$('<a class="first-menu" onclick="saveFirstLvMenu('+menu.id+')"><i class="fa  fa-circle"></i> <span>'+menu.menuName+'</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul menuUL-id="'+i+'" class="treeview-menu"></ul>');
				$('[menu-id="'+i+'"]').append(html);
				//继续遍历二级菜单
				childLen=menu.child.length;
				for(var j in menu.child){
					child=menu.child[j];
					//如果子菜单是该菜单，则设为active选中
					if(child.id==secondLvId){
							html=$('<li class="active"><a class="second-menu" href="../'+child.menuSrc+'" onclick="saveSecondLvMenu('+child.id+')"><i class="fa fa-circle-o"></i>'+child.menuName+'</a></li>');
					}else{
							html=$('<li><a class="second-menu" href="../'+child.menuSrc+'" onclick="saveSecondLvMenu('+child.id+')"><i class="fa fa-circle-o"></i>'+child.menuName+'</a></li>');
					}			
					$('[menuUL-id="'+i+'"]').append(html);
				}
			}
		}
	
});
});
function saveFirstLvMenu(id) {
	var id = JSON.stringify(id);
	 window.sessionStorage.setItem("firstMenuId", id);
}

function saveSecondLvMenu(id) {
	var id = JSON.stringify(id);
	 window.sessionStorage.setItem("secondMenuId", id);
}

function saveThirdLvMenu(id) {
	var id = JSON.stringify(id);
	 window.sessionStorage.setItem("thirdMenuId", id);
}

function getFirstLvMenu() {
	return JSON.parse(window.sessionStorage.getItem("firstMenuId"));
}
function getSecondLvMenu() {
	return JSON.parse(window.sessionStorage.getItem("secondMenuId"));
}
function getThirdLvMenu() {
	return JSON.parse(window.sessionStorage.getItem("thirdMenuId"));
}
