$(document).ready(function(){
    authorize.loginCheck();
    $(".spinner").hide();
});
$("#submit").click(function(e) {
    e.preventDefault();
    var email = $("#emailInput").val();
    if (email) {
        var pattern = /^\b[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}\b$/i;
        if ((email.length) && (!pattern.test(email))) {
            $("#emailInput").addClass("alert-danger");
            $("#emailInput").attr("placeholder", "Enter Valid Email");
            $("#emailInput").val("");
            var flag = null;
        } else {
            $("#emailInput").removeClass("alert-danger");
            $("#emailInput").attr("placeholder", " ");
            var flag = 1;
        }
        if (flag) {
            authorize.ajax({
                'email': email,
                'type': "forgot"
            }, 'forgot', function(data) {
                data = JSON.parse(data);
                if (data['valid']) {
                    // $("#emailInput").removeClass("alert-danger");
                    // $("#emailInput").attr("placeholder", " ");
                    window.location = "status.html?rst_pwd=sent";
                } else {
                    $("#emailInput").addClass("alert-danger");
                    $("#emailInput").attr("placeholder", "Invalid email");
                    $("#emailInput").val("");
                }
            });
        }

    } else{
        $("#emailInput").addClass("is-invalid");
        return false;
    }
});