<?php

class GeoIP
{
  private $db;

  private function getFlatIP($ip)
  {
    $ipx = explode('.', $ip);
    return $ipx[0] * 16777216 + $ipx[1] * 65536 + $ipx[2] * 256 + $ipx[3];
  }

  private function findCityRecord($ip)
  {
    $sql = 'SELECT * FROM locations WHERE id = (SELECT location FROM ipblocks WHERE start <= :ip AND end >= :ip)';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['ip' => $ip]);
    return $sth->fetch(PDO::FETCH_ASSOC);
  }

  public function __construct($config)
  {
    try {
      $this->db = new PDO($config['dsn'], $config['user'], $config['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
  }

  public function findCity($ip)
  {
    $location = $this->findCityRecord($this->getFlatIP($ip));
    if (is_string($location)) {
      return [
        'place' => $location
      ];
    } else if (is_array($location)) {
      return array_diff_key($location, ['id' => NULL]);
    } else {
      return [
        'place' => 'Луна'
      ];
    }
  }
}
