<?php

class MyDB
{
  private $db;

  public function __construct($env)
  {
    try {
      $this->db = new PDO($env['dsn'], $env['user'], $env['password']);
    } catch (PDOException $e) {
      echo 'Подключение не удалось: ' . $e->getMessage();
    }
  }

  public function saveEvent($event)
  {
    $sql = 'INSERT INTO events (type, client_id, source, campaign, time, payload) VALUE (:type, :client_id, :source, :campaign, :time, :payload)';
    $sth = $this->db->prepare($sql, [PDO::ATTR_CURSOR => PDO::CURSOR_FWDONLY]);
    $sth->execute($event);
  }
}
