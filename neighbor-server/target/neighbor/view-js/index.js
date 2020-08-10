

$(function () {
    $.widget.bridge('uibutton', $.ui.button);
    initMenu();
    changeFrameHeight();
});

function changeFrameHeight() {
    $('#iframepage').height(document.documentElement.clientHeight);

}

window.onresize = function () {
    changeFrameHeight();

}
var account=$("body").attr("account");
var lastActive = null;
var pages = ['', 'userMgr', 'itemMgr', 'shareMgr', 'communityMgr', 'reportMgr', 'withdrawMgr', 'noticeMgr', 'systemMsg', 'suggestMgr', 'commentMgr', 'carSharingMgr','guard'];
var titles = ['控制台', '用户管理', '发布管理', '动态管理', '小区信息管理', '运营报表', '提现审核', '公告管理', '系统消息', '报事报修', '评论管理', '顺风车管理','门禁管理'];
var icons = ['fa-dashboard', 'fa-users', 'fa-cloud-upload', 'fa-podcast', 'fa-building', 'fa-bar-chart', 'fa-credit-card-alt', 'fa-bullhorn', 'fa-envelope', 'fa-bug', 'fa-commenting', 'fa-car','fa-lock'];
// function initMenu() {
//     var htmlstr = $('#menuUL').html();
//     //根据角色获取左侧菜单
//
//     for (var i = 0; i < titles.length; i++)
//     {
//
// 		if(account=='brand@icrat.cn'){
// 			if (i == 1|| i == 2 || i == 3 || i == 4 || i == 5 || i == 6|| i == 9|| i == 10|| i == 11|| i == 12)
// 			    continue;
// 		}
//        else{
//        	if (i == 2 || i == 4 || i == 5 || i == 6 || i == 11)
//        	    continue;
//        }
//         htmlstr += '<li id="menu' + i + '" class="' + ((i == 0) ? 'active ' : '') + 'treeview">' +
//             '<a href="javascript:void(0)" onclick="changeFrameSrc(' + i + ')">' +
//             '<i class="fa ' + icons[i] + '"></i> <span>' + titles[i] + '</span>' +
//             '</a></li>';
//     }
//     $('#menuUL').html(htmlstr);
// }

function initMenu() {
    var firstLvId = getFirstLvMenu();//一级菜单
    var secondLvId = getSecondLvMenu();//二级菜单
    var thirdLvId = getThirdLvMenu();//三级菜单
    var roleId = $("#roleId").val();
    $.ajax({
        type: 'get',
        url: 'menuTree?roleId=' + roleId,
        dataType: 'json',
        success: function (data) {
            var menu = null;
            var html = null;
            var childLen = null;
            var child = null;
            var json = data;
            //console.log(json);
            for (var i in json) {
                menu = json[i];
                //如果父菜单是该菜单，就展开
                if (menu.id == firstLvId) {
                    html = $('<li menu-id="' + i + '" class="active treeview "><li>');
                } else {
                    html = $('<li menu-id="' + i + '" class="treeview "><li>');
                }
                $(".sidebar .sidebar-menu").append(html);
                html = $('<a class="first-menu" href="javascript:void(0);" onclick=saveFirstLvMenu(' + menu.id + ',"'+menu.menuSrc+'","'+menu.menuName+'")><i class="fa  fa-circle"></i> <span>' + menu.menuName + '</span><span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span></a><ul menuUL-id="' + i + '" class="treeview-menu"></ul>');
                $('[menu-id="' + i + '"]').append(html);
                //继续遍历二级菜单
                childLen = menu.child.length;
                for (var j in menu.child) {
                    child = menu.child[j];
                    //如果子菜单是该菜单，则设为active选中
                    if (child.id == secondLvId) {
                        html = $('<li class="active"><a class="second-menu" href="javascript:void(0);"  onclick=saveSecondLvMenu(' + child.id + ',"'+child.menuSrc+'","'+child.menuName+'")><i class="fa fa-circle-o"></i>' + child.menuName + '</a></li>');
                    } else {
                        html = $('<li><a class="second-menu" href="javascript:void(0);"  onclick=saveSecondLvMenu(' + child.id+ ',"'+child.menuSrc+'","'+child.menuName+'")><i class="fa fa-circle-o"></i>' + child.menuName + '</a></li>');
                    }
                    $('[menuUL-id="' + i + '"]').append(html);
                }
            }
        }

    });
}
function saveFirstLvMenu(id,menuSrc,menuName) {
    var id = JSON.stringify(id);
    window.sessionStorage.setItem("firstMenuId", id);
    if(menuSrc!=null&&menuSrc!=""){
        $('#iframepage').attr("src", menuSrc);
        $('#page-title').html(menuName);
    }
}

function saveSecondLvMenu(id,menuSrc,menuName) {
    var id = JSON.stringify(id);
    window.sessionStorage.setItem("secondMenuId", id);
    if(menuSrc!=null&&menuSrc!=""){
        $('#iframepage').attr("src", menuSrc);
        $('#page-title').html(menuName);
    }
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
function changeFrameSrc(index) {

    if (lastActive == null) {

        lastActive = $('#menu0');
    }
    $('#iframepage').attr("src", pages[index]);
    $('#page-title').html(titles[index]);
    lastActive.removeClass("active");
    lastActive = $('#menu' + index);
    lastActive.addClass("active");
}
function pwdChange(index){
    $('#iframepage').attr("src", "accountPwd");
    $('#page-title').html("管理员密码修改");
}

function toRoomMgr(id){
    $('#iframepage').attr("src", "roomMgr?id="+id);
    $('#page-title').html("房间管理");
}

function toPage(page,title){
    $('#iframepage').attr("src", page);
    $('#page-title').html(title);
}