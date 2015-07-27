// ==UserScript==
// @name         Moegirl edit utl
// @namespace    https://kkdev.org/
// @version      0.1
// @description  
// @author       Shelikhoo
// @match        http://zh.moegirl.org/*
// @grant        none
// ==/UserScript==


$.urlParam = function(name){
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results===null){
       return null;
    }
    else{
       return results[1] || 0;
    }
};


function KKDEV_moegirlutl_randomString(length) { //not suitable for cryptography usege!!!!!
    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
}

function KKDEV_moegirlutl_ListenUpdate() { 
    
    $("#wpTextbox1").bind("input propertychange",function(){
        console.log("KKDEV_moegirlutl_recover ctxmod");
        localStorage.setItem("KKDEV_moegirlutl_recover_item_"+$.urlParam("title"),document.editform.wpTextbox1.value);
        
        
    });
    
    $("#KKDEV_moegirlutl_recover_InsTarget_inner").html("修改正在被跟踪。如果您不小心关闭了编辑页面，这个功能将帮助您找回之前的工作。");
    
}


var $KKDEV_moegirlutl_recover_InsPayload = '<div class="tabs"><span class="tab" id="KKDEV_moegirlutl_recover_InsTarget_inner">Recover utility initializing....</div></div>';
var $KKDEV_moegirlutl_recover_Recoverable = '有可以恢复的编辑，请选择操作 <a href="#" id="KKDEV_moegirlutl_recover_InsTarget_inner_recover">恢复</div><a href="#" id="KKDEV_moegirlutl_recover_InsTarget_inner_discard">放弃之前的编辑</div>';

function KKDEV_moegirlutl_recover_InsMpyNod() {
    if($($KKDEV_moegirlutl_recover_InsPayload).insertAfter( "div .tabs" )===undefined){
     setTimeout(KKDEV_moegirlutl_recover_InsMpyNod,100);//try again later
    }else{
    //good insert!
    console.log("KKDEV_moegirlutl_recover_InsMpyNod step 1 Done!");
        
        //check if browser have necessary funcation
        if(localStorage===undefined){
        $("KKDEV_moegirlutl_recover_InsTarget_inner").html("The initialization of recover utility was unsuccessful: localStorage is undefined");
            return;
        }
        
        if(sessionStorage===undefined){
        $("KKDEV_moegirlutl_recover_InsTarget_inner").html("The initialization of recover utility was unsuccessful: sessionStorage is undefined");
            return;
        }
        
        //generate sid if !exist
        if(sessionStorage.getItem("KKDEV_moegirlutl_recover_SID")===null){
        sessionStorage.setItem("KKDEV_moegirlutl_recover_SID",KKDEV_moegirlutl_randomString(16));
        }
        
        //attempt to recover edit
        
        if(localStorage.getItem("KKDEV_moegirlutl_recover_item_"+$.urlParam("title"))!=null){
            console.log("KKDEV_moegirlutl_recover recover");
            //display recover
            $("#KKDEV_moegirlutl_recover_InsTarget_inner").html($KKDEV_moegirlutl_recover_Recoverable);
            
            //Add event listener
            
            $( "#KKDEV_moegirlutl_recover_InsTarget_inner_recover" ).bind( "click", function() {
                document.editform.wpTextbox1.value=localStorage.getItem("KKDEV_moegirlutl_recover_item_"+$.urlParam("title"));
                KKDEV_moegirlutl_ListenUpdate();
            });
            
            $( "#KKDEV_moegirlutl_recover_InsTarget_inner_discard" ).bind( "click", function() {
             localStorage.setItem("KKDEV_moegirlutl_recover_item_"+$.urlParam("title"),null);
                KKDEV_moegirlutl_ListenUpdate();
            });
            
                
            
        }else{
            
            console.log("KKDEV_moegirlutl_recover No ctx, listen");
            
            KKDEV_moegirlutl_ListenUpdate();
            
        }
        
        
        
        
        
    }
}

$( document ).ready(function() {

    if($.urlParam("action")=="edit"){
    setTimeout(KKDEV_moegirlutl_recover_InsMpyNod,100);
    }

});