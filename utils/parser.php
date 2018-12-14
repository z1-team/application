<?php

$fd = fopen('partners.json', 'r');
$data = fread($fd, filesize('partners.json'));
fclose($fd);

function array_copy($arr) {
  $newArray = array();
  foreach($arr as $key => $value) {
    if(is_array($value)) $newArray[$key] = array_copy($value);
    else if(is_object($value)) $newArray[$key] = clone $value;
    else $newArray[$key] = $value;
  }
  return $newArray;
}

function prepareCategories($categories) {
  $result = [];
  foreach ($categories as $name => $value) {
    $result[] = $value;
  }
  return $result;
}

$processPartner = function ($partner) {
  $result = array_copy($partner);
  $data = json_decode($partner['data'], true);
  if (strcmp($partner['type'], 'mfo') === 0) {
    $data['filter_values'] = [
      'summ' => [1, 9999999],
      'term' => [1, 999]
    ];
    $data['filters']['category_mfo'] = prepareCategories($data['categories']);
  } else if (strcmp($partner['type'], 'cards') === 0) {
    $data['filter_values'] = [
      'limit' => [1, 999999],
      'rate' => [1, 999]
    ];
    $data['filters']['category_cards'] = prepareCategories($data['categories']);
  }
  $result['data'] = json_encode(
    array_diff_key($data, ['categories' => true]),
    JSON_UNESCAPED_UNICODE
  );
  return $result;
};

$src = json_decode($data, true);
$result = array_map($processPartner, $src);

echo json_encode($result, JSON_UNESCAPED_UNICODE);
