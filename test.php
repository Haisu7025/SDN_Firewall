<?php

// 启动一个CURL会话
$handle = curl_init();
$url = 'http://101.5.212.197:8080/wm/staticentrypusher/json';
$data = array();
$data['name'] = 'f1';
// curl_setopt($handle, CURLOPT_POST, true);
curl_setopt($handle, CURLOPT_CUSTOMREQUEST, 'DELETE');
curl_setopt($handle, CURLOPT_POSTFIELDS, $data); //设置请求体，提交数据包

curl_setopt($handle, CURLOPT_URL, $url); // 要访问的地址
curl_setopt($handle, CURLOPT_HEADER, 1); // 是否显示返回的Header区域内容
curl_setopt($handle, CURLOPT_HTTPHEADER, $headers); //设置请求头
curl_setopt($handle, CURLOPT_RETURNTRANSFER, true); // 获取的信息以文件流的形式返回
curl_setopt($handle, CURLOPT_SSL_VERIFYHOST, false); // 从证书中检查SSL加密算法是否存在
curl_setopt($handle, CURLOPT_SSL_VERIFYPEER, false); // 对认证证书来源的检查

echo $handle;

$response = curl_exec($handle); // 执行操作
$code = curl_getinfo($handle, CURLINFO_HTTP_CODE); // 获取返回的状态码
curl_close($handle); // 关闭CURL会话
if ('200' == $code) {
    echo "ok";
    echo $response;
}

echo "<br>" . $data['name'];
