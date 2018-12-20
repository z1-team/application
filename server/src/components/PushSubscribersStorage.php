<?php

class PushSubscribersStorage
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function add($client, $subscription)
  {
    $sql = 'INSERT INTO push_subscribers VALUE (?, ?) ON DUPLICATE KEY UPDATE subscription = ?';
    $sth = $this->db->prepare($sql);
    return $sth->execute([$client, $subscription, $subscription]);
  }
}
