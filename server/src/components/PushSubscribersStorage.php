<?php

class PushSubscribersStorage
{
  private $db;

  public function __construct($db)
  {
    $this->db = $db;
  }

  public function add($subscription)
  {
    $sql = 'INSERT INTO push_subscribers VALUE (NULL, ?)';
    $sth = $this->db->prepare($sql);
    return $sth->execute([$subscription]);
  }
}
