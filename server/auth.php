<?php

function getField($field) {
  return isset($_REQUEST[$field]) ? $_REQUEST[$field] : null;
}

$hash = [
  'admin' => '$2y$10$SAheujYDkMBHBFNCvuI0X.4EHOyQV9SWG304i4Uhn7QxVZsNR/P8O'
];

$login = getField('login');
$password = getField('password');

header("Content-type: application/json; charset=utf-8");
header('Access-Control-Allow-Origin: *');

if ($login !== null && $password !== null) {
  if (isset($hash[$login]) && password_verify($password, $hash[$login])) {
    echo json_encode([
      'token' => '974eb069c50eb518ae2fdf5bb7cf0626130e0a45'
    ]);
  } else {
    echo json_encode([
      'error' => 'Invalid login or password!'
    ]);
  }
} else {
  echo json_encode([
    'error' => 'Bad request!'
  ]);
}
