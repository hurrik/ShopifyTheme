// XMLtoJSON starts
if(typeof Object.assign!='function'){Object.defineProperty(Object,"assign",{value:function assign(target,varArgs){'use strict';if(target==null){throw new TypeError('Cannot convert undefined or null to object');}
var to=Object(target);for(var index=1;index<arguments.length;index++){var nextSource=arguments[index];if(nextSource!=null){for(var nextKey in nextSource){if(Object.prototype.hasOwnProperty.call(nextSource,nextKey)){to[nextKey]=nextSource[nextKey];}}}}
return to;},writable:true,configurable:true});}
var xmlToJson=(function(){var self=this;self.addToParent=function(parent,nodeName,obj){if(!parent[nodeName]){parent[nodeName]=obj;}
else{if(!Array.isArray(parent[nodeName])){var tmp=parent[nodeName];parent[nodeName]=[];parent[nodeName].push(tmp);}
parent[nodeName].push(obj);}};self.convertXMLStringToDoc=function(str){var xmlDoc=null;if(str&&typeof str==='string'){var parser=new DOMParser();xmlDoc=parser.parseFromString(str,'application/xml');}
return xmlDoc;}
self.isXML=function(data){var documentElement=(data?data.ownerDocument||data:0).documentElement;return documentElement?documentElement.nodeName.toLowerCase()!=='html':false;};self.parseAttributes=function(node){var attributes=node.attributes,obj={};if(node.hasAttributes()){for(var i=0;i<attributes.length;i++){obj[attributes[i].name]=self.parseValue(attributes[i].value);}}
return obj;};self.parseChildren=function(parent,childNodes){if(childNodes.length>0){for(var i=0;i<childNodes.length;i++){if(childNodes[i].nodeType==1){self.parseNode(parent,childNodes[i]);}}}};self.parseNode=function(parent,node){var nodeName=node.nodeName,obj=Object.assign({},self.parseAttributes(node)),tmp=null;if(node.childNodes.length==1&&node.childNodes[0].nodeType==3){if(node.hasAttributes()){obj['text']=self.parseValue(node.childNodes[0].nodeValue);}
else{obj=self.parseValue(node.childNodes[0].nodeValue);}}
else{self.parseChildren(obj,node.childNodes);}
self.addToParent(parent,nodeName,obj)
return parent;};this.parseValue=function(val){var num=Number(val);if(val.toLowerCase()==='true'||val.toLowerCase()==='false'){return(val.toLowerCase()=='true');}
return(isNaN(num))?val.trim():(val.length==0)?null:num;};return{parse:function(xml){if(xml&&typeof xml==='string'){xml=self.convertXMLStringToDoc(xml);}
return(xml&&self.isXML(xml))?self.parseNode({},xml.firstChild):null;}}})();
// XMLtoJSON end

var domain_url = "https://email.pssl.com/api/";
function setCookie(cname, cvalue, exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  var expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
$(document).ready(function(){

  $('#pssl_widget_form').submit(function(e){
    e.preventDefault();
    data = {};
    data.subscriberData = {};
    data.subscriberData.subscriber_email = $("#pssl_widget_form #ftr-deal-alerts-email").val();
    data.subscriberData.subscriber_status = "";
    data.subscriberData.postcode  = $('#pssl_widget_form #ftr-deal-alerts-zipcode').val();
    data.subscriberData.othersegs = [];
    $('.bh-segment input:checked').each(function(){
      data.subscriberData.othersegs.push($(this).val());
    })
    setCookie('pssl_email', data.subscriberData.subscriber_email, 1);
    $.post(
      domain_url+"manageSubscribers", 
      data, 
      function(retData, status){
        data = $.parseJSON(retData);
        if(data.status == 0){
          if(data.response[0].responseCode == 200 || data.response[0].responseCode == 201){
            $('#pssl_widget_form #form_error').text("");
            location.href="/pages/email-preference";
          } else {
            $('#pssl_widget_form #form_error').text(data.response[0].responseData.message);
          	console.log ('No Response');
          }
        }
      });
  });
  
  $(document).on('submit','#bh-sidebar-form',function(e){
    e.preventDefault();
    data = {};
    data.subscriberData = {};
    data.subscriberData.subscriber_email = $(this).find('#bh-sidebar-email').val();
    data.subscriberData.subscriber_status = "";
    data.subscriberData.postcode  = $(this).find('#bh-sidebar-zip').val();
    data.subscriberData.othersegs = [];
    $('.bh-segment input:checked').each(function(){
      data.subscriberData.othersegs.push($(this).val());
    })
    setCookie('pssl_email', data.subscriberData.subscriber_email, 1);
    $.post(
      domain_url+"manageSubscribers", 
      data, 
      function(retData, status){
        data = $.parseJSON(retData);
        if(data.status == 0){
          if(data.response[0].responseCode == 200 || data.response[0].responseCode == 201){
            location.href="https://www.pssl.com/pages/email-preference";
          }
        }
      });
  });
  
	
  $('#pssl_popup_form').submit(function(e){
    e.preventDefault();
    data = {};
    data.subscriberData = {};
    data.subscriberData.subscriber_email = $('#pop-deal-alerts-email').val();
    data.subscriberData.subscriber_status = "";
    data.subscriberData.welcome_letter = $('#welcome_letter').val();
     data.subscriberData.othersegs = [];
    $('.bh-segment input:checked').each(function(){
      data.subscriberData.othersegs.push($(this).val());
    });
    setCookie('pssl_email', data.subscriberData.subscriber_email, 1);
    $.post(
      domain_url+"manageSubscribers", 
      data, 
      function(retData, status){
        data = $.parseJSON(retData);
        if(data.status == 0){
          if(data.response[0].responseCode == 200){
            location.href="/pages/email-preference";
          }
        }
      });
  });
  

  $("#pre_form").submit(function(e){
    e.preventDefault();
    data = {};
    data.subscriberData = {};
    data.subscriberData.subscriber_email = $('#pre_email').val();
    data.subscriberData.subscriber_status = "";
    if($('#old_pre_data').is(':visible')){
      data.subscriberData.firstname   = $('#pre_fname').val();
      data.subscriberData.lastname  = $('#pre_lname').val();
      data.subscriberData.postcode = $('#pre_postcode').val();

      data.subscriberData.othersegs = [];
      data.subscriberData.grpremove = []; 
      $('input.segment_option').each(function(){
        if($(this).is(':checked')){
          data.subscriberData.othersegs.push($(this).val());
        }
        else{
          data.subscriberData.grpremove.push($(this).val());
        }
      });
      data.frnd_email = $('#pre_frnd_email').val();	 
      data.frnd_name = $('#pre_frnd_name').val();
    }
    setCookie('pssl_email', data.subscriberData.subscriber_email, 1);
    $('#pre_form').hide();
    $("#message").addClass('loading').html('Reviewing...');
    $.post(
      domain_url+"manageSubscribers", 
      data, 
      function(retData, status){
        data = $.parseJSON(retData);
        if(data.status == 0){
          if(data.response[0].responseCode == 200 || data.response[0].responseCode == 201){
            //             location.href="/pages/email-preference";

            document.getElementById("pre_form").reset();
            $("#message").removeClass('loading').addClass('success').html('Thank you, your changes have been saved.');
//             loadEmailData();
                          setTimeout(function(){
                            location.href="/pages/email-preference";
                          }, 2000);

          }
        }
      });
  })

  $('#reset_profile').click(function(){
    setCookie('pssl_email', "", -1);
    $('#old_pre_data').hide();
    $('#pre_email').val("");
    $('#unsubscribe').hide();
    $('#subscribe').show();
    $('#submitBtn').html('Submit');
  })	

  if($('div#email-preference').length > 0){
    loadEmailData();
  }

  $('#unsubscribe').click(function(){
    var email = $("#pre_email").val();
    $.get(domain_url+"removeSubscriber?email="+email, function(data, status){
      $('#loading').hide();
      $('#pre_form').show();
      $('#reset_profile').click();
    });
  });
});

var isObject = function(obj) {
  return obj === Object(obj);
};


var randomnumber = function(){ 
  var d = new Date();
  var n = d.getMilliseconds();
  return n; 
}


function loadEmailData(){
  var pssl_email = getCookie('pssl_email');
  if(pssl_email != ""){
    $.get(domain_url+"getCustomerStaticSegments?email="+pssl_email+"&ts="+randomnumber(), function(data, status){
      $('#pre_form').show();
      $('#old_pre_data').show();
      $('#loading').hide();
      $('#unsubscribe').show();
      $('#subscribe').hide();
      $('#submitBtn').html('Save Changes');
      var data = $.parseJSON(data);
      var json = xmlToJson.parse( data.response[0].responseData );    
      window.profileData = json.manifest.contact_data;
      $("#pre_email").val(profileData.email);
      if(!$.isEmptyObject(profileData.lastname)){
        $("#pre_lname").val(profileData.lastname);
      }
      if(!$.isEmptyObject(profileData.firstname)){
        $("#pre_fname").val(profileData.firstname);
      }
      if(isObject(profileData.postal_code)){
        if(!$.isEmptyObject(profileData.postal_code)){
          $('#pre_postcode').val(profileData.postal_code );
        }
      }
      else{
        $('#pre_postcode').val(profileData.postal_code );
      }
      $.each(profileData.groups_subscribed.group_id, function(i, seg){
        $('.segment_option[value="'+seg+'"]').attr('checked', 'checked');
      });
    });  
  }
  else{
    $('#loading').hide();
    $('#pre_form').show();
    $('#reset_profile').click();
  }
}