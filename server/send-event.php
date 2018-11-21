<?php

require('env.php');
require('db.php');

function requestIsFull() {
  return (
    isset($_REQUEST['click_id'])
    && isset($_REQUEST['client_id'])
    && isset($_REQUEST['timestamp'])
    && isset($_REQUEST['type'])
    && isset($_REQUEST['utm_source'])
    && isset($_REQUEST['utm_campaign'])
    && isset($_REQUEST['payload'])
  );
}

header('Access-Control-Allow-Origin: *');

if (requestIsFull()) {
  $db = new MyDB($env);
  $db->saveEvent([
    ':source' => $_REQUEST['utm_source'],
    ':campaign' => $_REQUEST['utm_campaign'],
    ':client_id' => $_REQUEST['client_id'],
    ':type' => $_REQUEST['type'],
    ':time' => $_REQUEST['timestamp'],
    ':payload' => $_REQUEST['payload']
  ]);
} else {
  echo "Bad request\n";
}
