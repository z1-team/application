<?php

require dirname(__FILE__) . '/env.php';
require dirname(__FILE__) . '/geoip.php';

function makeIPInfo($geoinfo) {
  if (is_string($geoinfo)) {
    return [
      'place' => $geoinfo
    ];
  } else if (is_array($geoinfo)) {
    return array_diff_key($geoinfo, ['id' => NULL]);
  } else {
    return [
      'place' => 'Луна'
    ];
  }
}

$ip = $_SERVER['REMOTE_ADDR'];
$geo = new GeoIP($env);
$ip_info = makeIPInfo($geo->findCity($ip));
$ip_info['ip'] = $ip;

include_once dirname(__FILE__) . '/templates/landing.php';
