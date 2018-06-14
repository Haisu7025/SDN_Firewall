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

    $("#dfw").hide();

    if ($.cookie('cip') != null) {
        $("#cia").val($.cookie('cip'));
        $("#cia").attr('disabled', "disabled");
        $("#ipc").text("Change IP");
    }
});

var load_array = null;
var ssw = null;
var flow = null;
var cip;

$(function() {
    $("#ipc").click(function() {
        var cia = $("#cia").val();
        cip = cia;
        if (cia == "") {
            alert("Please enter valid controller IP address!")
            return;
        }
        $.cookie('cip', cia);
        if ($("#ipc").text() == "Confirm") {
            $("#cia").attr('disabled', "disabled");
            $("#ipc").text("Change IP");
        } else {
            $("#cia").removeAttr('disabled');
            $("#cia").val("");
            $("#ipc").text("Confirm");
        }
    });

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

        if (cia == "") {
            alert("Please enter valid controller IP address!")
            return;
        }

        var sa = $("#swad").val();
        var rn = $("#rn").val();
        var d = $("#d").val();
        var src_mac = $("#src_mac").val();
        var dst_mac = $("#dst_mac").val();
        var src_ip = $("#src_ip").val();
        var dst_ip = $("#dst_ip").val();
        var src_port = $("#src_port").val();
        var dst_port = $("#dst_port").val();
        var protocol = $("#protocol").val();
        var p = $("#priority").val();
        var ito = $("#idle_timeout").val();
        var hto = $("#hard_timeout").val();

        if (src_mac.indexOf('-') > 0) {
            var pos = src_mac.indexOf('-');
            src_mac = src_mac.substr(pos + 1, 100);
        }

        if (dst_mac.indexOf('-') > 0) {
            var pos = dst_mac.indexOf('-');
            dst_mac = dst_mac.substr(pos + 1, 100);
        }

        if (src_ip.indexOf('-') > 0) {
            var pos = src_ip.indexOf('-');
            src_ip = src_ip.substr(pos + 1, 100);
        }

        if (dst_ip.indexOf('-') > 0) {
            var pos = dst_ip.indexOf('-');
            dst_ip = dst_ip.substr(pos + 1, 100);
        }

        if (src_port.indexOf('-') > 0) {
            var pos = src_port.indexOf('-');
            src_port = src_port.substr(pos + 1, 100);
        }

        if (dst_port.indexOf('-') > 0) {
            var pos = dst_port.indexOf('-');
            dst_port = dst_port.substr(pos + 1, 100);
        }

        if (protocol.indexOf('-') > 0) {
            var pos = protocol.indexOf('-');
            protocol = protocol.substr(pos + 1, 100);
        }

        if (p.indexOf('-') > 0) {
            var pos = p.indexOf('-');
            p = p.substr(pos + 1, 100);
        }

        if (ito.indexOf('-') > 0) {
            var pos = ito.indexOf('-');
            ito = ito.substr(pos + 1, 100);
        }

        if (hto.indexOf('-') > 0) {
            var pos = hto.indexOf('-');
            hto = hto.substr(pos + 1, 100);
        }

        $.post('curl.php', {
                "action": "ADD",
                "cia": cia,
                "sa": sa,
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
        window.location.reload();
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

    $("#dfw").click(function() {
        var cia = $("#cia").val();

        if (cia == "") {
            alert("Please enter valid controller IP address!")
            return;
        }

        var sa = $("#swad").val();
        var rn = $("#rn").val();

        $.post('curl.php', {
                "action": "DEL",
                "cia": cia,
                "sa": sa,
                "rn": rn
            },
            function(data) {
                alert(data);
            })
    });

    $("#lfw").click(function() {
        // if ($("#lfw").text() == "Loaded!") {
        //     return;
        // }
        var cia = $("#cia").val();
        $("#lfw").text("Loaded!")
        if (cia == "") {
            alert("Please enter valid controller IP address!")
            return;
        }
        var sa = $("#swad").val();
        var rn = $("#rn").val();

        $.post('curl.php', {
                "action": "LOAD",
                "cia": cia,
                "sa": sa,
                "rn": rn
            },
            function(data) {
                var pos = data.indexOf('{');
                var json_response = data.substr(pos, 10000);
                alert(json_response);
                var json_obj = JSON.parse(json_response);
                var json_array = Object.entries(json_obj);
                load_array = json_array;
                if (json_array.length > 0) {
                    // if ($("#lfw").text() == "Loaded!") {
                    //     return;
                    // }
                    for (var i = 0; i < json_array.length; i++) {
                        var j = json_array[i];
                        var swad = j[0];
                        $("#swad_list").append('<option id="switch' + i + '" value="' + swad + '">');
                        $("#rn").click(function() {
                            var target = $("#swad").val();
                            for (var i = 0; i < json_array.length; i++) {
                                if (load_array[i][0] == target) {
                                    ssw = load_array[i];
                                    break;
                                }
                            }
                            if (ssw != null) {
                                $("#fn_list").empty();
                                for (var p = 0; p < ssw[1].length; p++) {
                                    var fltb = Object.entries(ssw[1][p]);
                                    var fltb_name = fltb[0][0];
                                    $("#fn_list").append('<option value="' + fltb_name + '">');
                                    var fltb_ct = fltb[0][1];
                                }


                                $("#rn").blur(function() {
                                    var target = $("#rn").val();
                                    for (var i = 0; i < ssw[1].length; i++) {
                                        var fltb = Object.entries(ssw[1][i]);
                                        var fltb_name = fltb[0][0];
                                        if (fltb_name == target) {
                                            flow = fltb;
                                            break;
                                        }
                                    }

                                    //parse flow
                                    if (flow == null) {
                                        return;
                                    }
                                    if (flow.length == 0) {
                                        return;
                                    }
                                    flow_info = flow[0][1];
                                    match = flow_info['match'];
                                    if (flow_info['instructions']['instruction_apply_actions'] == null) {
                                        $("#d").val("Deny");
                                    } else {
                                        action = flow_info['instructions']['instruction_apply_actions']['actions'];
                                        $("#d").val(action);
                                    }

                                    if (match['eth_src'] != null) {
                                        $("#src_mac").show();
                                        $("#src_mac").val('Src MAC-' + match['eth_src']);
                                    }

                                    if (match['eth_src'] != null) {
                                        $("#src_mac").show();
                                        $("#src_mac").val('Src MAC-' + match['eth_src']);
                                    }

                                    if (match['eth_dst'] != null) {
                                        $("#dst_mac").show();
                                        $("#dst_mac").val('Dst MAC-' + match['eth_dst']);
                                    }

                                    if (match['ipv4_src'] != null) {
                                        $("#src_ip").show();
                                        $("#src_ip").val('Src IP-' + match['ipv4_src']);
                                    }

                                    if (match['ipv4_dst'] != null) {
                                        $("#dst_ip").show();
                                        $("#dst_ip").val('Dst IP-' + match['ipv4_dst']);
                                    }


                                    if (match['in_port'] != null) {
                                        $("#dst_port").show();
                                        $("#dst_port").val('Dst Port-' + match['in_port']);
                                    }

                                    if (match['ip_proto'] != null) {
                                        $("#protocol").show();
                                        $("#protocol").val('Protocol-' + match['ip_proto']);
                                    }

                                    if (flow_info['priority'] != null) {
                                        $("#priority").show();
                                        $("#priority").val('Priority-' + flow_info['priority']);
                                    }

                                    if (flow_info['idleTimeoutSec'] != null) {
                                        $("#idle_timeout").show();
                                        $("#idle_timeout").val('Idle Timeout-' + flow_info['idleTimeoutSec']);
                                    }

                                    if (flow_info['hardTimeoutSec'] != null) {
                                        $("#hard_timeout").show();
                                        $("#hard_timeout").val('Hard Timeout-' + flow_info['hardTimeoutSec']);
                                    }

                                    $("#cfw").text("Modify Firewall！");
                                    $("#dfw").show();
                                });




                            }
                        });
                    }

                }
                $("#swad").attr('list', 'swad_list');
                $("#rn").attr('list', 'fn_list');

            });

    });
});