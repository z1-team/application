<?php

require('env.php');
require('db.php');

function requestIsFull() {
  return (
    isset($_REQUEST['source'])
    && isset($_REQUEST['campaign'])
    && isset($_REQUEST['client_id'])
    && isset($_REQUEST['type'])
    && isset($_REQUEST['time'])
    && isset($_REQUEST['payload'])
  );
}

header('Access-Control-Allow-Origin: *');

if (requestIsFull()) {
  $db = new MyDB($env);
  $db->saveEvent([
    ':source' => $_REQUEST['source'],
    ':campaign' => $_REQUEST['campaign'],
    ':client_id' => $_REQUEST['client_id'],
    ':type' => $_REQUEST['type'],
    ':time' => $_REQUEST['time'],
    ':payload' => $_REQUEST['payload'],
  ]);
} else {
  echo "Bad request\n";
}
