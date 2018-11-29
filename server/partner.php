<?php

require dirname(__FILE__) . '/env.php';

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
  private $id;
  private $type;
  private $title;
  private $data;

  private static function uploadImage($data)
  {
    if (preg_match('/^data:image\/png;base64,/', $data)) {
      $rawBase64 = str_replace('data:image/png;base64,', '', $data);
      $rightBase64 = str_replace(' ', '+', $rawBase64);
      $rawData = base64_decode($rightBase64);
      $file = 'uploads/' . uniqid() . '.png';
      return file_put_contents($file, $rawData) ? $file : false;
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

  public function __construct($id, $type, $title, $data)
  {
    $this->id = $id;
    $this->type = $type;
    $this->title = $title;
    $this->data = $data;
  }

  public function toArray()
  {
    $data = array_copy($this->data);
    $data['main'] = array_merge(['title' => $this->title], $data['main']);
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

class PartnerController
{
  private static $token = '974eb069c50eb518ae2fdf5bb7cf0626130e0a45';
  private $db;

  public function __construct($config)
  {
    try {
      $this->db = new PDO($config['dsn'], $config['user'], $config['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
  }

  public function fetchAll()
  {
    $sql = 'SELECT * FROM partners LIMIT 1000';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute();
    $result = [];
    while ($row = $sth->fetch(PDO::FETCH_ASSOC)) {
      $partner  = new Partner(
        $row['id'],
        $row['type'],
        $row['title'],
        $row['data']
      );
      $result[] = $partner->toArray();
    }
    return json_encode($result, JSON_UNESCAPED_UNICODE);
  }

  public function update($request)
  {
    $partner = Partner::makeFromJSON($request['payload'])->prepare();
    if ($partner) {
      $sql = 'UPDATE partners SET title = :title, data = :data WHERE id = :id';
      $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
      return $sth->execute([
        'title' => $partner->getTitle(),
        'data' => $partner->getData(),
        'id' => $partner->getId()
      ]) ? json_encode(['success' => 'ok'])
         : json_encode(['error' => 'Update failed!']);
    } else {
      return json_encode(['error' => 'Bad request!']);
    }
  }

  public function create($request)
  {
    $partner = Partner::makeFromJSON($request['payload'])->prepare();
    if ($partner) {
      $sql = 'INSERT INTO partners (type, title, data) VALUE (:type, :title, :data)';
      $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
      return $sth->execute([
        'type' => $partner->getType(),
        'title' => $partner->getTitle(),
        'data' => $partner->getData()
      ]) ? json_encode(['id' => $this->db->lastInsertId('id')])
         : json_encode(['error' => 'Creating failed!']);
    } else {
      return json_encode(['error' => 'Bad request!']);
    }
  }

  public function processGuard($request)
  {
    switch ($request['action']) {
      case 'update':
      case 'create':
        return isset($request['token']) && $request['token'] === self::$token;
      default:
        return true;
    }
  }

  public function processRequest($request)
  {
    switch ($request['action']) {
      case 'fetch':
        echo $this->fetchAll(); break;
      case 'update':
        echo $this->update($request); break;
      case 'create':
        echo $this->create($request); break;
      default:
        echo json_encode(['error' => 'Bad request!']);
    }
  }
}

$controller = new PartnerController($env);

header("Content-type: application/json; charset=utf-8");
$controller->processRequest($_REQUEST);
