<?php

function array_copy($arr) {
  $newArray = array();
  foreach($arr as $key => $value) {
    if(is_array($value)) $newArray[$key] = array_copy($value);
    else if(is_object($value)) $newArray[$key] = clone $value;
    else $newArray[$key] = $value;
  }
  return $newArray;
}

class Partner
{
  private static $baseurl = '';
  private $id;
  private $type;
  private $title;
  private $data;
  private $rating;
  private $count;

  public static function initClass($config)
  {
    self::$baseurl = $config['baseurl'];
  }

  private static function uploadImage($data)
  {
    if (preg_match('/^data:image\/png;base64,/', $data)) {
      $rawBase64 = str_replace('data:image/png;base64,', '', $data);
      $rightBase64 = str_replace(' ', '+', $rawBase64);
      $rawData = base64_decode($rightBase64);
      $file = 'uploads/' . uniqid() . '.png';
      $fullPath = self::$baseurl . $file;
      return file_put_contents($file, $rawData) ? $fullPath : false;
    } else {
      return false;
    }
  }

  public static function makeFromJSON($data)
  {
    $json = json_decode($data, true);
    $main = array_diff_key($json['main'], ['title' => null]);
    $simplified = array_diff_key($json, ['id' => null, 'type' => null]);
    $simplified['main'] = $main;
    return new Partner($json['id'], $json['type'], $json['main']['title'], $simplified);
  }

  public function __construct($id, $type, $title, $data, $rating = 0, $count = 0)
  {
    $this->id = $id;
    $this->type = $type;
    $this->title = $title;
    $this->data = $data;
    $this->rating = $rating;
    $this->count = $count;
  }

  public function toArray()
  {
    $data = array_copy($this->data);
    $sortBy = isset($data['sortBy']) ? $data['sortBy'] : [];
    $data['main'] = array_merge(['title' => $this->title], $data['main']);
    $data['sortBy'] = array_merge($sortBy, [
      'rating' => $this->rating,
      'testimonials_count' => $this->count
    ]);
    return array_merge([
      'id' => $this->id,
      'type' => $this->type
    ], $data);
  }

  public function toJSON()
  {
    return json_encode($this->toArray(), JSON_UNESCAPED_UNICODE);
  }

  public function prepare()
  {
    $logo = $this->data['main']['logo'];
    if (preg_match('/^data:/', $logo)) {
      if ($path = self::uploadImage($logo)) {
        $data = array_copy($this->data);
        $data['main']['logo'] = $path;
        return new Partner($this->id, $this->type, $this->title, $data);
      } else {
        return false;
      }
    }
    return $this;
  }

  public function getId()
  {
    return $this->id;
  }

  public function getType()
  {
    return $this->type;
  }

  public function getTitle()
  {
    return $this->title;
  }

  public function getData()
  {
    return json_encode($this->data, JSON_UNESCAPED_UNICODE);
  }
}
