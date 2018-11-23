<?php

class GeoIP
{
  private $db;

  private function getFlatIP($ip)
  {
    $ipx = explode('.', $ip);
    return $ipx[0] * 16777216 + $ipx[1] * 65536 + $ipx[2] * 256 + $ipx[3];
  }

  private function findGeoRecord($ip)
  {
    $sql = 'SELECT * FROM geoip WHERE start <= :ip AND end >= :ip';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['ip' => $ip]);
    return $sth->fetch(PDO::FETCH_ASSOC);
  }

  private function findCityRecord($id)
  {
    $sql = 'SELECT * FROM cities WHERE id = :id';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute(['id' => $id]);
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
    $georecord = $this->findGeoRecord($this->getFlatIP($ip));
    if ($georecord) {
      if ($georecord['city'] !== NULL) {
        return $this->findCityRecord($georecord['city']);
      } else {
        return $georecord['country'];
      }
    } else {
      return 'Планета Земля';
    }
  }
}
