<?php
$controller_ip = $_POST['cia'];

// 启动一个CURL会话
$handle = curl_init();

if ($_POST['action'] == 'ADD') {

    $url = 'http://' . $controller_ip . ':8080/wm/staticentrypusher/json';
    $data = array();

    $valid_sa = 0x00;
    $valid_name = 0x00;

    if (strlen($_POST['sa']) > 0) {
        $data['switch'] = $_POST['sa'];
        $valid_sa = 0x01;
    }

    if (strlen($_POST['rn']) > 0) {
        $data['name'] = $_POST['rn'];
        $valid_name = 0x01;
    }

    $data['cookie'] = 0;

    $valid_rule = 0x00;
    $valid_para = 0x00;

    $data['eth_type'] = 0x0800;

    if (strlen($_POST['src_mac']) > 0) {
        $data['eth_src'] = $_POST['src_mac'];
        $valid_rule += 1;
    }
    if (strlen($_POST['dst_mac']) > 0) {
        $data['eth_dst'] = $_POST['dst_mac'];
        $valid_rule += 10;
    }
    if (strlen($_POST['src_ip']) > 0) {
        $data['ipv4_src'] = $_POST['src_ip'];
        $valid_rule += 100;
    }
    if (strlen($_POST['dst_ip']) > 0) {
        $data['ipv4_dst'] = $_POST['dst_ip'];
        $valid_rule += 1000;
    }
    if (strlen($_POST['dst_port']) > 0) {
        $data['in_port'] = $_POST['dst_port'];
        $valid_rule += 10000;
    }
    if (strlen($_POST['protocol']) > 0) {
        $data['ip_proto'] = $_POST['protocol'];
        $valid_rule += 100000;
    }

    if (strlen($_POST['p']) > 0) {
        $data['priority'] = $_POST['p'];
        $valid_para += 1;
    }
    if (strlen($_POST['ito']) > 0) {
        $data['idle_timeout'] = $_POST['ito'];
        $valid_para += 10;
    }
    if (strlen($_POST['hto']) > 0) {
        $data['hard_timeout'] = $_POST['hto'];
        $valid_para += 100;
    }

    //headers and data (this is API dependent, some uses XML)：
    //即在接口调用时才用headers 和$data

    $data = json_encode($data);
    echo $data;

    echo 'POST:' . $data;
    curl_setopt($handle, CURLOPT_POST, true);
    curl_setopt($handle, CURLOPT_POSTFIELDS, $data); //设置请求体，提交数据包
}

if ($_POST['action'] == 'LOAD') {
    echo 'LOAD!!';
    $url = 'http://' . $controller_ip . ':8080/wm/staticentrypusher/list/all/json';

}

if ($_POST['action'] == 'DELETE') {
    echo "DELETE!!";
    $url = 'http://' . $controller_ip . ':8080/wm/staticentrypusher/json';

    $data['name'] = $_POST['rn'];
    curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($handle, CURLOPT_POSTFIELDS, $data); //设置请求体，提交数据包
}

if ($_POST['action'] == 'LISTALL') {

}

$headers = array(
    'Accept: application/json',
    'Content-Type: application/json',
);

curl_setopt($handle, CURLOPT_URL, $url); // 要访问的地址
curl_setopt($handle, CURLOPT_HEADER, 1); // 是否显示返回的Header区域内容
curl_setopt($handle, CURLOPT_HTTPHEADER, $headers); //设置请求头
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true); // 获取的信息以文件流的形式返回
curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false); // 从证书中检查SSL加密算法是否存在
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); // 对认证证书来源的检查
// switch($method) {
// case 'GET':
// break;
// case 'POST':

// case 'PUT':
// curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'PUT');
// curl_setopt($handle, CURLOPT_POSTFIELDS, $data); //设置请求体，提交数据包
// break;
// case 'DELETE':
// curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
// break;
// }

$response = curl_exec($handle); // 执行操作
$code = curl_getinfo($handle, CURLINFO_HTTP_CODE); // 获取返回的状态码
curl_close($handle); // 关闭CURL会话
if ('200' == $code) {
    echo "ok";
    echo $response;
}
