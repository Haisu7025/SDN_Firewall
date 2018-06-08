jQuery(document).ready(function() {

    /*
        Fullscreen background
    */
    $.backstretch("assets/img/backgrounds/1.jpg");

    $('#top-navbar-1').on('shown.bs.collapse', function() {
        $.backstretch("resize");
    });
    $('#top-navbar-1').on('hidden.bs.collapse', function() {
        $.backstretch("resize");
    });

    /*
        Form validation
    */
    $('.registration-form input[type="text"], .registration-form textarea').on('focus', function() {
        $(this).removeClass('input-error');
    });

    $('.registration-form').on('submit', function(e) {

        $(this).find('input[type="text"], textarea').each(function() {
            if ($(this).val() == "") {
                e.preventDefault();
                $(this).addClass('input-error');
            } else {
                $(this).removeClass('input-error');
            }
        });

    });

    $('#src_mac').hide();
    $('#dst_mac').hide();
    $('#src_ip').hide();
    $('#dst_ip').hide();
    $('#src_port').hide();
    $('#dst_port').hide();
    $('#protocol').hide();
    $('#priority').hide();
    $('#idle_timeout').hide();
    $('#hard_timeout').hide();


});

$(function() {
    $('#b1').click(function() {
        rule_type_sel = $('#rule_type_sel').val();
        switch (rule_type_sel) {
            case 'Src MAC':
                $('#src_mac').show();
                break;
            case 'Dst MAC':
                $('#dst_mac').show();
                break;
            case 'Src IP':
                $('#src_ip').show();
                break;
            case 'Dst IP':
                $('#dst_ip').show();
                break;
            case 'Src Port':
                $('#src_port').show();
                break;
            case 'Dst Port':
                $('#dst_port').show();
                break;
            case 'Protocol':
                $('#protocol').show();
                break;
            default:
                alert("Please choose a valid rule field!");
        }
        $('#rule_type_sel').val("");
    });

    $("#b2").click(function() {
        $('#src_mac').hide();
        $('#dst_mac').hide();
        $('#src_ip').hide();
        $('#dst_ip').hide();
        $('#src_port').hide();
        $('#dst_port').hide();
        $('#protocol').hide();

        $('#src_mac').val("");
        $('#dst_mac').val("");
        $('#src_ip').val("");
        $('#dst_ip').val("");
        $('#src_port').val("");
        $('#dst_port').val("");
        $('#protocol').val("");
    });

    $("#cfw").click(function() {
        var cia = $("#cia").val();
        var sa = $("#sa").val();
        var rn = $("#rn").val();
        var d = $("#d").val();
        var src_mac = $("#src_mac").val();
        var dst_mac = $("#dst_mac").val();
        var src_ip = $("#src_ip").val();
        var dst_ip = $("#dst_ip").val();
        var src_port = $("#src_port").val();
        var dst_port = $("#dst_port").val();
        var protocol = $("#protocol").val();
        var p = $("#p").val();
        var ito = $("#ito").val();
        var hto = $("#hto").val();

        alert(sa);
        $.post('curl.php', {
                "cia": cia,
                "sa ": sa,
                "rn": rn,
                "d": d,
                "src_mac": src_mac,
                "dst_mac": dst_mac,
                "src_ip": src_ip,
                "dst_ip": dst_ip,
                "src_port": src_port,
                "dst_port": dst_port,
                "protocol": protocol,
                'p': p,
                'ito': ito,
                'hto': hto
            },
            function(data) {
                alert(data);
            });

    });

    $("#b3").click(function() {
        rule_type_sel = $('#para_type_sel').val();
        switch (rule_type_sel) {
            case 'Priority':
                $('#priority').show();
                break;
            case 'Idle Timeout':
                $('#idle_timeout').show();
                break;
            case 'Hard Timeout':
                $('#hard_timeout').show();
                break;
            default:
                alert("Please choose a valid parameter field!");
        }
        $('#para_type_sel').val("");
    });

    $("#b4").click(function() {
        $('#priority').hide();
        $('#idle_timeout').hide();
        $('#hard_timeout').hide();
    });
});